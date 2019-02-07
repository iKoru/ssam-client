<template>
  <v-container fluid v-if="board">
    <v-card flat class="mb-2">
      <v-card-title primary-title class="py-2">
        <v-layout column>
          <v-flex>
            <v-layout row align-center>
              <v-flex>
                <v-layout row align-center>
                  <span class="title cursor-pointer" @click="$route.params.documentId || $route.path.endsWith('write')?$router.push('/'+board.boardId):openDialog()">{{board.boardName}}</span>
                  <v-tooltip bottom v-if="reservedContents" close-delay="500" class="cursor-default">
                    <v-icon slot="activator" class="ml-1 vertical-align-middle" color="primary">event_note</v-icon>
                    <span v-html="reservedContents"></span>
                  </v-tooltip>
                  <span class="ml-2" v-if="childBoardItems.length > 1">
                    <v-select id="childBoardSelector" class="hideLine dense childBoardSelector mt-0 pt-0" flat dense v-model="childBoardId" :items="childBoardItems" item-text="boardName" item-value="boardId" single-line hide-details @input="childBoardChanged"></v-select>
                  </span>
                  <v-btn small depressed class="short my-0" color="accent" v-else-if="board.boardType === 'T' && board.boardId !== 'topicBest' && !$store.getters.userBoards.some(x=>x.boardId === board.boardId)" @click="openDialog">구독</v-btn>
                </v-layout>
              </v-flex>
              <v-spacer/>
              <v-btn depressed color="primary" icon class="ma-0" @click="moveToWriteDocument" v-show="!$route.path.endsWith('write') && !$route.path.endsWith('edit') && (($route.params.boardId !== 'loungeBest' && $route.params.boardId !== 'topicBest') || (documentBoardId && $route.params.documentId))" :small="$vuetify.breakpoint.xsOnly">
                <v-icon small>edit</v-icon>
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex v-show="board.boardDescription">
            <span class="caption">
              {{board.boardDescription}}
              <v-icon small @click="openDialog" class="vertical-align-middle">info</v-icon>
            </span>
          </v-flex>
        </v-layout>
      </v-card-title>
    </v-card>
    <v-card flat :class="{'my-3':$route.path.endsWith('write') || $route.path.endsWith('edit')}">
      <router-view :board="board" :documentBoardId.sync="documentBoardId"/>
    </v-card>
    <v-card flat v-show="!$route.path.endsWith('write') && !$route.path.endsWith('edit')">
      <document-list :board="board" :hasChildren="!board.parentBoardId && childBoardItems.length > 1" @write="moveToWriteDocument" :documentBoardId.sync="documentBoardId"/>
    </v-card>
    <v-dialog v-model="dialog" max-width="800" lazy>
      <board-information :board="selected" @closeDialog="closeDialog"></board-information>
    </v-dialog>
  </v-container>
</template>

<script>
import MainLayout from '@/layouts/MainLayout';
import router from '@/router';
import BoardMixins from '@/components/mixins/BoardMixins';
const groupName = { M: '전공', G: '학년', N: '일반', R: '지역', Z: '인증' };
export default {
  name: 'Board',
  data: () => ({
    board: undefined,
    writeButton: true,
    childBoardId: null,
    dialog: false,
    selected: null,
    userAuthItems: {
      N: '예비교사',
      A: '인증',
      E: '전직교사',
      D: '인증제한'
    },
    groupItems: [],
    allGroupAuthItems: { READWRITE: '전체구독허용', READONLY: '읽기공개', NONE: '비공개' },
    documentBoardId: null
  }),
  props: ['boardId'],
  mixins: [BoardMixins],
  components: {
    DocumentList: () => import('@/components/board/DocumentList'),
    BoardInformation: () => import('@/components/BoardInformation')
  },
  computed: {
    childBoardItems () {
      if (this.board.parentBoardId) {
        let siblings = this.$store.getters.boards.filter(x => x.parentBoardId === this.board.parentBoardId && x.boardId !== this.boardId);
        siblings.splice(0, 0, this.$store.getters.boards.find(x => x.boardId === this.board.parentBoardId));
        siblings.splice(0, 0, { boardId: null, boardName: this.childBoardLabel });
        return siblings;
      } else {
        let children = this.$store.getters.boards.filter(x => x.parentBoardId === this.boardId);
        children.splice(0, 0, { boardId: null, boardName: this.childBoardLabel });
        return children;
      }
    },
    childBoardLabel () {
      return (this.board.parentBoardId ? '관련 ' : '하위 ') + this.boardTypeItems[this.board.boardType];
    },
    reservedContents () {
      if (this.board && this.board.reservedContents) {
        let reservedContents = this.board.reservedContents;
        let string = this.$moment(this.board.reservedDate, 'YYYYMMDD').format('Y.M.D 이후 아래와 같이 변경될 예정입니다.<br>');
        for (let key in reservedContents) {
          switch (key) {
            case 'boardName':
              string += `${this.boardTypeItems[this.board.boardType]} 이름 : ${reservedContents[key]}<br>`;
              break;
            case 'boardDescription':
              string += `${this.boardTypeItems[this.board.boardType]} 설명 : ${reservedContents[key]}<br>`;
              break;
            case 'allowAnonymous':
              string += `익명글 : ${reservedContents[key] ? '허용' : '비허용'}<br>`;
              break;
            case 'useCategory':
              string += `카테고리 : ${reservedContents[key] ? '사용' : '미사용'}<br>`;
              break;
            case 'allGroupAuth':
              string += `${this.boardTypeItems[this.board.boardType]} 공개/비공개 : ${this.allGroupAuthItems[reservedContents[key]]}<br>`;
              break;
            case 'ownerNickName':
              string += `${this.boardTypeItems[this.board.boardType]}지기 : ${reservedContents[key]}<br>`;
              break;
            case 'auth':
              string += `구독(글쓰기) 권한 : ${reservedContents[key]
                .filter(x => this.groupItems.some(y => y.value === x.groupId))
                .map(x => this.groupItems.find(y => y.value === x.groupId).text + (x.command === 'INSERT' ? ' 추가' : x.command === 'DELETE' ? ' 삭제' : ''))
                .join(', ')}<br>`;
              break;
            case 'status':
              string += reservedContents[key] === 'DELETED' ? `<b>${this.boardTypeItems[this.board.boardType]} 삭제 예정</b><br>` : '';
              break;
          }
        }
        return string;
      } else {
        return null;
      }
    }
  },
  methods: {
    moveToWriteDocument () {
      let board = this.board;
      let childBoardItems = this.childBoardItems;
      if ((board.boardId === 'loungeBest' || board.boardId === 'topicBest') && this.documentBoardId) {
        board = this.$store.getters.boards.find(x => x.boardId === this.documentBoardId);
        if (!board) {
          board = this.board;
        }
        if (board.parentBoardId) {
          childBoardItems = this.$store.getters.boards.filter(x => x.parentBoardId === this.board.parentBoardId && x.boardId !== this.boardId);
          childBoardItems.splice(0, 0, this.$store.getters.boards.find(x => x.boardId === this.board.parentBoardId));
          childBoardItems.splice(0, 0, { boardId: null, boardName: this.childBoardLabel });
        } else {
          childBoardItems = this.$store.getters.boards.filter(x => x.parentBoardId === this.boardId);
          childBoardItems.splice(0, 0, { boardId: null, boardName: this.childBoardLabel });
        }
      }
      if (!board.parentBoardId && childBoardItems.length > 1) {
        const profile = this.$store.getters.profile;
        const userBoard = this.$store.getters.userBoards.find(x => x.boardId === board.boardId);
        let available = this.$store.getters.boards.filter(x => x.parentBoardId === board.boardId && x.statusAuth.write.includes(profile.auth) && (board.boardType === 'T' ? userBoard && (!userBoard.writeRestrictDate || this.$moment(userBoard.writeRestrictDate, 'YYYYMMDD').isBefore(this.$moment())) : x.allowedGroups.some(y => y === profile.region || y === profile.major || y === profile.grade || profile.groups.includes(y)) && (!userBoard || !userBoard.writeRestrictDate || this.$moment(userBoard.writeRestrictDate, 'YYYYMMDD').isBefore(this.$moment()))));
        if (available.length > 0) {
          this.$router.push(`/${available[0].boardId}/write`);
          this.$store.dispatch('showSnackbar', { text: `글을 쓸 수 있는 ${available[0].boardName}에 작성됩니다.`, color: 'info' });
        } else if (this.board.boardType === 'T') {
          this.$store.dispatch('showSnackbar', { text: '글을 쓸 토픽을 선택하여 구독해주세요', color: 'info' });
        } else {
          available = this.$store.getters.boards.filter(x => x.parentBoardId === board.boardId && x.statusAuth.write.includes(profile.auth));
          if (available.length === 0) {
            this.$store.dispatch('showSnackbar', { text: '인증 후에 글을 쓸 수 있습니다.', color: 'info' });
          } else {
            available = available.filter(x => x.allowedGroups.some(y => y === profile.region || y === profile.major || y === profile.grade || profile.groups.includes(y)));
            if (available.length === 0) {
              this.$store.dispatch('showSnackbar', { text: `현재 소속된 ${this.boardTypeItems[board.boardType]}가 없습니다. ${this.$vuetify.breakpoint.xsOnly ? '학년, 전공을 지정해주세요.' : '내 계정정보에서 학년, 전공을 지정해주세요.'}`, color: 'info' });
            } else {
              this.$store.dispatch('showSnackbar', { text: `현재 ${available[0].boardName}에 글쓰기가 제한되어있습니다.`, color: 'info' });
            }
          }
        }
      } else {
        const profile = this.$store.getters.profile;
        if (board.statusAuth.write.includes(profile.auth)) {
          if (board.boardType === 'T') {
            if (this.$store.getters.userBoards.some(x => x.boardId === board.boardId)) {
              const userBoard = this.$store.getters.userBoards.find(x => x.boardId === board.boardId);
              if (!userBoard.writeRestrictDate || this.$moment(userBoard.writeRestrictDate, 'YYYYMMDD').isBefore(this.$moment())) {
                this.$router.push(`/${board.boardId}/write`);
              } else {
                this.$store.dispatch('showSnackbar', { text: `글쓰기가 ${this.$moment(userBoard.writeRestrictDate, 'YYYYMMDD').format('Y/M/D')}까지 제한되었습니다.` });
              }
            } else {
              // need subscription
              if (board.allGroupAuth === 'READWRITE' || board.allowedGroups.some(x => x === profile.region || x === profile.major || x === profile.grade || profile.groups.includes(x))) {
                // i can subscribe this board!
                this.$axios
                  .post('/user/board', { boardId: board.boardId })
                  .then(response => {
                    this.$store.dispatch('addUserBoard', Object.assign({}, board));
                    this.$store.dispatch('showSnackbar', { text: `${board.boardName} 토픽을 구독하였습니다.`, color: 'info' });
                    this.$router.push(`/${board.boardId}/write`);
                  })
                  .catch(error => {
                    console.log(error);
                    this.$store.dispatch('showSnackbar', { text: `글을 쓰기 위한 구독을 하지 못했습니다.${error && error.response && error.response.data ? '[' + error.response.data.message + ']' : ''}`, color: 'error' });
                  });
              } else {
                this.$store.dispatch('showSnackbar', { text: '내가 구독할 수 없는 토픽입니다.', color: 'info' });
              }
            }
          } else {
            if (board.allGroupAuth === 'READWRITE' || board.allowedGroups.some(x => x === profile.region || x === profile.major || x === profile.grade || profile.groups.includes(x))) {
              if (this.$store.getters.userBoards.some(x => x.boardId === board.boardId)) {
                const userBoard = this.$store.getters.userBoards.find(x => x.boardId === board.boardId);
                if (!userBoard.writeRestrictDate || this.$moment(userBoard.writeRestrictDate, 'YYYYMMDD').isBefore(this.$moment())) {
                  this.$router.push(`/${board.boardId}/write`);
                } else {
                  this.$store.dispatch('showSnackbar', { text: `글쓰기가 ${this.$moment(userBoard.writeRestrictDate, 'YYYYMMDD').format('Y/M/D')}까지 제한되었습니다.` });
                }
              } else {
                this.$router.push(`/${board.boardId}/write`);
              }
            } else {
              this.$store.dispatch('showSnackbar', { text: `현재 소속된 ${this.boardTypeItems[board.boardType]}가 아닙니다.`, color: 'info' });
            }
          }
        } else {
          this.$store.dispatch('showSnackbar', { text: `${board.statusAuth.write.map(x => this.userAuthItems[x]).join(', ')}회원만 글을 쓸 수 있습니다.`, color: 'info' });
        }
      }
    },
    async getBoard (boardId) {
      let response;
      try {
        response = await this.$axios.get(`/board?boardId=${boardId}`);
      } catch (error) {
        console.log(error);
        this.$store.dispatch('showSnackbar', { text: `${error && error.response && error.response.data ? error.response.data.message || '게시판 정보를 가져오지 못했습니다.' : '게시판 정보를 가져오지 못했습니다.'}`, color: 'error' });
        return false;
      }
      this.setBoard(response.data);
      return true;
    },
    writeDocument () {
      this.$router.push(`/${this.boardId}/write`);
    },
    setBoard (board) {
      this.board = board;
      document.title = board.boardName ? board.boardName + ' - Pedagy' : 'Pedagy';
      this.$store.dispatch('switchBoardType', this.board.boardType === 'T' ? 'T' : 'L');
    },
    childBoardChanged () {
      if (this.childBoardId) {
        this.$router.push('/' + this.childBoardId);
      }
    },
    subscribe () {
      this.$axios
        .post('/user/board', { boardId: this.board.boardId })
        .then(response => {
          this.$store.dispatch('addUserBoard', Object.assign({}, this.board));
          this.$store.dispatch('showSnackbar', { text: `${this.board.boardName} 토픽을 구독하였습니다! 구독 기념 글을 작성해보세요.`, color: 'success' });
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch('showSnackbar', { text: `${error && error.response && error.response.data ? error.response.data.message || `${this.board.boardName} 구독을 하지 못했습니다.` : `${this.board.boardName} 구독을 하지 못했습니다.`}`, color: 'error' });
        });
    },
    openDialog () {
      if (this.selected && this.selected.boardId === this.board.boardId) {
        this.dialog = true;
      } else {
        this.$axios
          .get('/board', { params: { boardId: this.board.boardId } })
          .then(response => {
            this.selected = response.data;
            this.dialog = true;
          })
          .catch(error => {
            console.log(error);
            this.$store.dispatch('showSnackbar', { text: `정보를 가져오지 못했습니다.${error && error.response && error.response.data ? '[' + error.response.data.message + ']' : ''}`, color: 'error' });
          });
      }
    },
    closeDialog () {
      this.dialog = false;
    }
  },
  created () {
    this.$emit('update:layout', MainLayout);
    this.$store.dispatch('setColumnType', 'HIDE_SM');
    if (this.$store.getters.groups) {
      this.groupItems = this.$store.getters.groups;
    } else {
      this.$axios
        .get('/group', { headers: { silent: true } })
        .then(response => {
          response.data.forEach(x => {
            if (x.groupType === 'N' || x.groupType === 'D' || x.groupType === 'E') {
              x.groupType = 'Z';
            }
          });
          this.groupItems = response.data.sort((a, b) => (a.groupType < b.groupType ? -1 : a.groupType === b.groupType ? 0 : 1));
          let previous = null;
          let i = 0;
          while (i < this.groupItems.length) {
            if (previous !== this.groupItems[i].groupType) {
              if (previous) {
                previous = this.groupItems[i].groupType;
                this.groupItems.splice(i, 0, { divider: true });
                i++;
              } else {
                previous = this.groupItems[i].groupType;
              }
              this.groupItems.splice(i, 0, { header: groupName[previous] });
              i++;
            }
            i++;
          }
          this.groupItems = this.groupItems.map(x => (x.groupName ? { text: x.groupName, value: x.groupId } : x));
          this.$store.dispatch('setGroups', this.groupItems);
        })
        .catch(error => {
          this.$store.dispatch('showSnackbar', { text: `그룹 목록을 가져오지 못했습니다.${error && error.response && error.response.data ? '[' + error.response.data.message + ']' : ''}` });
        });
    }
  },
  async beforeRouteUpdate (to, from, next) {
    if (this.$store.getters.boards.some(x => x.boardId === to.params.boardId)) {
      this.setBoard(this.$store.getters.boards.find(x => x.boardId === to.params.boardId));
      this.$store.dispatch('setColumnType', 'HIDE_SM');
      this.$nextTick(() => (this.childBoardId = null));
      next();
    } else if (await this.getBoard(to.params.boardId)) {
      this.$store.dispatch('setColumnType', 'HIDE_SM');
      this.$nextTick(() => (this.childBoardId = null));
      next();
    } else {
      next('/error?error=404');
    }
  },
  async beforeRouteEnter (to, from, next) {
    if (router.app.$store.getters.boards.some(x => x.boardId === to.params.boardId)) {
      next(vm => {
        vm.setBoard(router.app.$store.getters.boards.find(x => x.boardId === to.params.boardId));
      });
    } else {
      let board;
      try {
        board = await router.app.$axios.get('/board', { params: { boardId: to.params.boardId } });
      } catch (error) {
        next('/error?error=' + (error.response ? error.response.status || '404' : '404'));
        return;
      }
      next(vm => {
        vm.setBoard(board.data);
      });
    }
  }
};
</script>
<style>
#childBoardSelector {
  width: 6px;
}
.childBoardSelector {
  font-size: 14px;
}
.childBoardSelector .v-input__append-inner {
  margin-left: -16px;
  cursor: pointer;
}
.childBoardSelector .v-input__slot {
  padding-bottom: 0;
}
.childBoardSelector .v-select__selection {
  cursor: pointer;
}
</style>
