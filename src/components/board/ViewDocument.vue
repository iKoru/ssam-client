<template>
  <v-layout column v-if="document">
    <v-flex>
      <v-card-title primary-title>
        <div class="w-100">
          <router-link :to="'/'+document.boardId+'/'+document.documentId" class="title mb-0 multi-row">{{document.title}}</router-link>
          <v-layout row mt-1>
            <v-spacer/>
            <v-flex text-xs-right>
              <user-link :nickName="document.nickName" :boardType="board.boardType"/>
              | 댓글 {{document.commentCount}} | 조회 {{document.viewCount}} | {{$moment(document.writeDateTime, "YYYYMMDDHHmmss").format("Y.MM.DD HH:mm:ss")}}
            </v-flex>
          </v-layout>
        </div>
      </v-card-title>
    </v-flex>
    <v-divider/>
    <v-flex xs12>
      <v-card-text class="px-0">
        <div v-html="documentHTML" id="documentContents" class="ql-editor py-0 px-3"></div>
      </v-card-text>
    </v-flex>
    <v-layout row justify-center v-if="document.hasSurvey && document.survey">
      <v-flex xs12 sm10 md8 mx-3>
        <survey :currentSurvey="document.survey"/>
      </v-flex>
    </v-layout>
    <v-flex text-xs-center my-2>
      <v-btn @click="voteDocument" class="font-weight-bold short">
        <v-icon color="primary" small>thumb_up</v-icon>&nbsp;
        <span>{{document.voteUpCount}}</span>
      </v-btn>
    </v-flex>
    <v-divider/>
    <v-flex class="my-2">
      <v-layout row>
        <v-flex v-if="board.isOwner">
          <v-btn v-if="board.notices.indexOf(documentId)>=0" @click="setNotice(false)" class="ma-0 px-2 short">공지해제</v-btn>
          <v-btn v-else @click="setNotice(true)" class="ma-0 px-2 short">공지지정</v-btn>
        </v-flex>
        <v-spacer/>
        <v-flex pr-2 text-xs-right>
          <v-btn-toggle id="bottomBottons">
            <template v-if="document.attach && document.attach.some(x=>!x.insert)">
              <v-btn @click="showAttach=!showAttach" title="첨부파일 보기" :class="{'primary--text':showAttach}">첨부파일({{document.attach.filter(x=>!x.insert).length}})</v-btn>
            </template>
            <v-btn class="short" v-show="document.isWriter" :to="`/${$route.params.boardId}/${document.documentId}/edit`">
              <span>수정</span>
            </v-btn>
            <v-btn class="short" v-show="document.isWriter" @click="deleteDocument">삭제</v-btn>
            <component :is="$vuetify.breakpoint.xsOnly?'v-bottom-sheet':'v-menu'" v-model="scrapMenu" open-on-hover bottom lazy offset-y>
              <v-btn slot="activator" class="short">스크랩</v-btn>
              <v-list dense>
                <div class="v-list__tile font-weight-bold" @click.stop>스크랩 그룹 선택</div>
                <v-list-tile v-for="item in scrapGroups" :key="item.scrapGroupId" @click="scrapDocument(item)">
                  <v-list-tile-title>{{ item.scrapGroupName }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </component>
            <component :is="$vuetify.breakpoint.xsOnly?'v-bottom-sheet':'v-menu'" v-model="reportMenu" open-on-hover bottom lazy offset-y>
              <v-btn slot="activator" class="short" v-show="!document.isWriter">신고</v-btn>
              <v-list two-line>
                <div class="font-weight-bold mx-3 my-2" @click.stop>신고사유 선택</div>
                <v-list-tile v-for="item in reportTypes" :key="item.reportTypeId" @click="reportDocument(item)">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.reportTypeName }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{item.reportTypeDescription}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </component>
          </v-btn-toggle>
        </v-flex>
      </v-layout>
      <v-slide-y-transition>
        <v-layout column>
          <v-layout row v-show="showAttach" mt-2 wrap>
            <v-flex px-2 xs6 md4 xl2 :key="index" v-for="(item, index) in document.attach.filter(x=>!x.insert)">
              <router-link :to="webUrl + '/' + item.attach_path" target="_blank" :download="item.attach_name" class="ellipsis underline">{{item.attach_name}}</router-link>
            </v-flex>
          </v-layout>
          <v-divider v-show="showAttach" class="mb-2"/>
        </v-layout>
      </v-slide-y-transition>
    </v-flex>
    <v-flex mb-4>
      <ViewComments :isAnonymous="document.isWriter && document.nickName === ''" :allowAnonymous="document.allowAnonymous" :isCommentWritable="isCommentWritable" :reportTypes="reportTypes" :boardId="document.boardId" :best="document.bestComments" :pages="pages"/>
    </v-flex>
  </v-layout>
</template>

<script>
// import LinkPrevue from '@/components/LinkPrevue'
import Survey from '@/components/board/survey/Survey';
import CommentWriter from '@/components/board/CommentWriter';
import UserLink from '@/components/UserLink';
import ViewComments from '@/components/board/ViewComments';
import BoardMixins from '@/components/mixins/BoardMixins';
import Quill from 'quill';

export default {
  props: ['board', 'boardId', 'documentId'],
  data () {
    return {
      document: null,
      documentHTML: null,
      showAttach: false,
      scrapGroups: null,
      reportTypes: null,
      scrapMenu: false,
      reportMenu: false
    };
  },
  components: {
    Survey,
    CommentWriter,
    ViewComments,
    UserLink
  },
  mixins: [BoardMixins],
  created () {
    this.getScrapGroups();
    this.getReportTypes();
  },
  computed: {
    isCommentWritable () {
      let board = this.board.boardId === this.document.boardId ? this.board : this.$store.getters.boards.find(x => x.boardId === this.document.boardId);
      if (!board) {
        return 'UNAVAILABLE';
      } else if (this.document.isDeleted) {
        return 'DELETED';
      }

      const profile = this.$store.getters.profile;
      const userBoards = this.$store.getters.userBoards;
      if (board.statusAuth.comment.includes(profile.auth)) {
        if (board.boardType === 'T') {
          if (userBoards.some(x => x.boardId === board.boardId)) {
            const userBoard = userBoards.find(x => x.boardId === board.boardId);
            if (!userBoard.writeRestrictDate || this.$moment(userBoard.writeRestrictDate, 'YYYYMMDD').isBefore(this.$moment())) {
              return 'AVAILABLE';
            } else {
              return 'RESTRICTED';
            }
          } else {
            // need subscription
            if (board.allGroupAuth === 'READWRITE' || board.allowedGroups.some(x => x === profile.region || x === profile.major || x === profile.grade || profile.groups.includes(x))) {
              // i can subscribe this board!
              return 'NEEDSUBSCRIPTION';
            } else {
              return 'UNAVAILABLE';
            }
          }
        } else {
          if (board.allowedGroups.some(x => x === profile.region || x === profile.major || x === profile.grade || profile.groups.includes(x))) {
            if (userBoards.some(x => x.boardId === board.boardId)) {
              const userBoard = userBoards.find(x => x.boardId === board.boardId);
              if (!userBoard.writeRestrictDate || this.$moment(userBoard.writeRestrictDate, 'YYYYMMDD').isBefore(this.$moment())) {
                return 'AVAILABLE';
              } else {
                return 'RESTRICTED';
              }
            } else {
              return 'AVAILABLE';
            }
          } else {
            return 'UNAVAILABLE';
          }
        }
      } else {
        return 'UNAVAILABLE';
      }
    },
    pages () {
      return this.document.commentCount === 0 ? 1 : Math.ceil(this.document.commentCount / (process.env.NODE_ENV === 'development' ? 10 : 100));
    }
  },
  methods: {
    getDocument: function () {
      this.$axios
        .get(`/${this.boardId}/${this.documentId}`)
        .then(response => {
          if (response.data.isDeleted) {
            this.$router.replace('/' + this.boardId);
            this.$store.dispatch('showSnackbar', { text: '삭제된 글입니다.', color: 'warning' });
            return;
          }
          if (Array.isArray(response.data.attach)) {
            response.data.attach = response.data.attach.filter(x => x !== null);
          }
          this.document = response.data;
          this.documentHTML = this.document.isDeleted ? this.document.contents : this.deltaToHTML(JSON.parse(this.document.contents));
          this.showAttach = false;
          this.$emit('update:documentBoardId', this.document.boardId);
        })
        .catch(error => {
          console.log(error);
          this.$router.replace('/error?error=' + (error && error.response ? error.response.status || '404' : '404'));
        });
    },
    deleteDocument () {
      if (confirm('이 글을 삭제하시겠습니까?')) {
        this.$axios
          .put('/document', { documentId: this.documentId, isDeleted: true })
          .then(response => {
            this.$store.dispatch('showSnackbar', { text: '글을 삭제하였습니다.', color: 'success' });
            this.$router.push(`/${this.boardId}`);
          })
          .catch(error => {
            this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '글을 삭제하지 못했습니다.'}`, color: 'error' });
          });
      }
    },
    voteDocument () {
      this.$axios
        .post('/vote/document', { documentId: this.$route.params.documentId }, { headers: { silent: true } })
        .then(res => {
          this.document.voteUpCount = res.data.voteUpCount;
        })
        .catch(error => {
          console.log(error.response);
          this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '추천하지 못했습니다.'}`, color: 'error' });
        });
    },
    deltaToHTML (delta) {
      let tempCont = document.createElement('div');
      let quill = new Quill(tempCont);
      let image;
      delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty('image')) {
          image = this.document.attach.find(x => x.attach_name === item.insert.image);
          if (image) {
            image.insert = true;
            item.attributes = {
              download: item.insert.image,
              alt: item.insert.image
            };
            item.insert.image = this.webUrl + image.attach_path;
            /* item.insert.image = {
              src: this.webUrl + "/" + image.attach_path,
              download: item.insert.image,
              alt: item.insert.image
            } */
            item.attributes.link = item.insert.image;
          }
        }
      });
      quill.setContents(delta);
      // Clean spaces between tags
      let newText = tempCont.getElementsByClassName('ql-editor')[0].innerHTML.replace(/(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g, '$1$3');

      // Clean empty paragraphs before the content
      // <p><br/><p> && <p></p>
      let slicer;
      while (newText.slice(0, 7) === '<p></p>' || newText.slice(0, 11) === '<p><br></p>') {
        if (newText.slice(0, 7) === '<p></p>') slicer = 7;
        else slicer = 11;
        newText = newText.substring(slicer, newText.length);
      }

      // Clean empty paragraphs after the content
      while (newText.slice(-7) === '<p></p>' || newText.slice(-11) === '<p><br></p>') {
        if (newText.slice(-7) === '<p></p>') slicer = 7;
        else slicer = 11;
        newText = newText.substring(0, newText.length - slicer);
      }
      // Return the clean Text
      return newText;
    },
    saveddocument (to, from) {
      let href = to.match(/\bhttps?:\/\/\S+/gi);
      if (href) {
        this.link = href[0].substr(0, href[0].indexOf('<'));
        console.log(this.link);
      }
    },
    reportDocument (item) {
      this.$axios
        .post('/report/document', { documentId: this.document.documentId, reportTypeId: item.reportTypeId })
        .then(response => {
          this.reportMenu = false;
          this.$store.dispatch('showSnackbar', { text: '이 글을 신고하였습니다.', color: 'success' });
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            this.reportMenu = false;
            this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message || '글을 신고하지 못했습니다.' : '글을 신고하지 못했습니다.', color: 'info' });
          } else {
            console.log(error);
            this.reportMenu = false;
            this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message || '글을 신고하지 못했습니다.' : '글을 신고하지 못했습니다.', color: 'error' });
          }
        });
    },
    scrapDocument (item) {
      this.$axios
        .post('/scrap', { scrapGroupId: item.scrapGroupId, documentId: this.document.documentId })
        .then(response => {
          this.scrapMenu = false;
          this.$store.dispatch('showSnackbar', { text: '이 글을 스크랩하였습니다.', color: 'success' });
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            this.scrapMenu = false;
            this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message || '스크랩에 추가하지 못했습니다.' : '스크랩에 추가하지 못했습니다.', color: 'info' });
          } else {
            console.log(error);
            this.scrapMenu = false;
            this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message || '스크랩에 추가하지 못했습니다.' : '스크랩에 추가하지 못했습니다.', color: 'error' });
          }
        });
    },
    getScrapGroups () {
      if (!this.scrapGroups) {
        if (this.$store.getters.scrapGroups) {
          this.scrapGroups = this.$store.getters.scrapGroups;
        } else {
          this.$axios
            .get('/scrap/group', { headers: { silent: true } })
            .then(response => {
              this.$store.dispatch('setScrapGroups', response.data);
              this.scrapGroups = response.data;
            })
            .catch(error => {
              console.log(error);
              this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message || '스크랩 그룹 목록을 가져오지 못했습니다.' : '스크랩 그룹 목록을 가져오지 못했습니다.', color: 'error' });
            });
        }
      }
    },
    getReportTypes () {
      if (!this.reportTypes) {
        if (this.$store.getters.reportTypes) {
          this.reportTypes = this.$store.getters.reportTypes;
        } else {
          this.$axios
            .get('/report/type', { headers: { silent: true } })
            .then(response => {
              this.$store.dispatch('setReportTypes', response.data);
              this.reportTypes = response.data;
            })
            .catch(error => {
              console.log(error);
              this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message || '신고 타입을 가져오지 못했습니다.' : '신고 타입을 가져오지 못했습니다.', color: 'error' });
            });
        }
      }
    },
    setNotice (isAdd) {
      this.$axios
        .put('/board/notice', { boardId: this.document.boardId, documentId: this.document.documentId, isAdd: isAdd })
        .then(response => {
          this.$store.dispatch('showSnackbar', { text: isAdd ? '이 글을 공지로 지정했습니다.' : '이 글을 공지에서 해제했습니다.', color: 'success' });
          if (isAdd) {
            this.$store.getters.boards.find(x => x.boardId === this.document.boardId).notices.push({ documentId: this.documentId, isNotice: true, boardId: this.document.boardId, title: this.document.title });
          } else {
            const notices = this.$store.getters.boards.find(x => x.boardId === this.document.boardId).notices;
            notices.splice(notices.findIndex(x => x.documentId === this.documentId), 1);
          }
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message || '글을 공지로 지정하지 못했습니다.' : '글을 공지로 지정하지 못했습니다.', color: 'error' });
        });
    }
  },
  watch: {
    '$route.params': {
      handler () {
        this.getDocument();
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style>
#bottomBottons .v-btn {
  opacity: 1;
  font-weight: bold;
}
#documentContents p img,
#documentContents img {
  max-width: 100%;
}
#documentContents .video-container {
  position: relative;
  height: 0;
  width: 100%;
  padding-bottom: 56%;
}
#documentContents .video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
@media (max-width: 600px) {
  #documentContents p img,
  #documentContents img {
    max-width: calc(100% + 32px);
    margin-left: -16px;
    margin-right: -16px;
  }
  #documentContents .video-container {
    position: relative;
    height: 0;
    width: calc(100% + 32px);
    margin-left: -16px;
    margin-right: -16px;
    padding-bottom: 56%;
  }
}
</style>
