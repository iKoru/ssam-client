<template>
  <v-card>
    <v-card-title class="headline" primary-title>
      <span>상세정보</span>
      <v-spacer/>
      <v-icon @click="closeDialog">close</v-icon>
    </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs4 md2>
          <v-subheader>구분</v-subheader>
        </v-flex>
        <v-flex xs8 md4>
          <div class="v-subheader">{{boardTypeItems[board.boardType]}}</div>
        </v-flex>
        <v-flex xs4 md2>
          <v-subheader>이름</v-subheader>
        </v-flex>
        <v-flex xs8 md4>
          <div class="v-subheader">
            {{board.boardName}}(
            <router-link class="primary--text" :to="'/'+board.boardId" @click.native="closeDialog">/{{board.boardId}}</router-link>)
          </div>
        </v-flex>
        <template v-if="board.boardType === 'T'">
          <v-flex xs4 md2>
            <v-subheader>토픽지기</v-subheader>
          </v-flex>
          <v-flex xs8 md4>
            <div class="v-subheader">{{board.owner}}</div>
          </v-flex>
          <v-flex md6 v-if="$vuetify.breakpoint.mdAndUp"></v-flex>
        </template>
        <v-flex xs4 md2>
          <v-subheader>설명</v-subheader>
        </v-flex>
        <v-flex xs8 md10>
          <div class="v-subheader">{{board.boardDescription || '(등록된 설명이 없습니다.)'}}</div>
        </v-flex>
        <v-flex xs4 md2>
          <v-subheader>공개여부</v-subheader>
        </v-flex>
        <v-flex xs8 md4>
          <div class="v-subheader">{{board.allGroupAuth === 'NONE'?'비공개':'공개'}}</div>
        </v-flex>
        <v-flex xs4 md2>
          <v-subheader>익명 게시물</v-subheader>
        </v-flex>
        <v-flex xs8 md4>
          <div class="v-subheader">{{board.allowAnonymous?'허용':'비허용'}}</div>
        </v-flex>
        <template v-if="board.allGroupAuth !== 'READWRITE'">
          <v-flex xs4 md2>
            <v-subheader class="pr-0">
              <span>
                <span v-if="board.boardType === 'T'">구독/</span>글쓰기 조건
              </span>
            </v-subheader>
          </v-flex>
          <v-flex xs8 md10>
            <div class="v-subheader">{{board.allGroupAuth === 'READWRITE'? '모든 인증된 회원들이 구독할 수 있습니다.': board.boardAuth.map(x=>x.groupName).join(', ')}}</div>
          </v-flex>
        </template>
      </v-layout>
      <p v-if="board.boardType === 'T'" class="justify-center align-center text-xs-center mt-3 font-weight-bold">
        <template v-if="userBoards.some(x=>x.boardId === board.boardId)">내가 구독중인 토픽입니다.</template>
        <template v-else-if="board.allGroupAuth === 'READWRITE' || board.boardAuth.some(x=>userGroups.some(y=>y === x.groupId))">이 토픽을 구독할 수 있습니다.</template>
        <template v-else-if="board.allGroupAuth === 'READONLY'">이 토픽을 구독할 수 없지만 글을 읽을 수 있습니다.</template>
        <template v-else>내가 구독할 수 없는 조건의 토픽입니다.</template>
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="leave" flat v-if="board.boardType === 'T' && userBoards.some(x=>x.boardId === board.boardId)">구독취소</v-btn>
      <v-spacer/>
      <template v-if="board.boardType === 'T' && !userBoards.some(x=>x.boardId === board.boardId) && (board.allGroupAuth === 'READWRITE' || board.boardAuth.some(x=>userGroups.some(y=>y === x.groupId)))">
        <v-btn flat @click="dialog=false">취소</v-btn>
        <v-btn color="primary" @click="join" :loading="loading">구독</v-btn>
      </template>
      <template v-else>
        <v-btn color="primary" @click="closeDialog">닫기</v-btn>
      </template>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'boardInformation',
  props: ['board'],
  data () {
    return {
      boardTypeItems: {
        T: '토픽',
        L: '라운지',
        D: '아카이브',
        X: '기타',
        E: '전직교사',
        N: '예비교사'
      },
      loading: false
    };
  },
  computed: {
    boards () {
      const original = this.$store.getters.boards;
      return original.filter(x => x.parentBoardId || !original.some(y => y.parentBoardId === x.boardId));
    },
    userBoards () {
      return this.$store.getters.userBoards;
    },
    userGroups () {
      return this.$store.getters.profile.groups;
    }
  },
  methods: {
    join () {
      this.loading = true;
      this.$axios
        .post('/user/board', { boardId: this.board.boardId }, { headers: { silent: true } })
        .then(response => {
          this.$store.dispatch('addUserBoard', Object.assign({}, this.board));
          this.loading = false;
          this.closeDialog();
          this.$store.dispatch('showSnackbar', { text: '토픽을 구독하였습니다.', color: 'success' });
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
          this.$store.dispatch('showSnackbar', { text: `토픽을 구독하지 못했습니다.${error && error.response && error.response.data ? '[' + error.response.data.message + ']' : ''}`, color: 'error' });
        });
    },
    leave () {
      this.$axios
        .delete('/user/board/' + this.board.boardId)
        .then(response => {
          this.$store.dispatch('removeUserBoard', this.board.boardId);
          this.closeDialog();
          this.$store.dispatch('showSnackbar', { text: '토픽을 구독 해제하였습니다.', color: 'success' });
        })
        .catch(error => {
          console.log(error.response);
          this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message || '토픽을 구독 해제하지 못했습니다.' : '토픽을 구독 해제하지 못했습니다.', color: 'error' });
        });
    },
    closeDialog () {
      this.$emit('closeDialog', null);
    }
  }
};
</script>
