<template>
  <v-layout column v-if="document">
    <v-flex>
      <v-card-title primary-title>
        <div class="w-100">
          <router-link :to="'/'+document.boardId+'/'+document.documentId" class="title mb-0 multi-row">{{document.title}}</router-link>
          <v-layout row>
            <v-spacer/>
            <v-flex text-xs-right>
              <span :class="{'font-weight-bold':document.nickName !== ''}">{{document.nickName === ''? '(익명)' : document.nickName}}</span>
              | 댓글 {{document.commentCount}} | 조회 {{document.viewCount}} | {{$moment(document.writeDateTime, "YYYYMMDDHHmmss").format("Y.MM.DD HH:mm:ss")}}
            </v-flex>
          </v-layout>
        </div>
      </v-card-title>
    </v-flex>
    <v-divider/>
    <v-flex xs12>
      <v-card-text>
        <div v-html="documentHTML" id="documentContents"></div>
      </v-card-text>
    </v-flex>
    <v-layout row justify-center v-show="document.hasSurvey">
      <v-flex xs12 sm10 md8>
        <Survey :survey="survey"/>
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
      <v-layout row text-xs-right>
        <v-flex pr-2>
          <v-btn-toggle id="bottomBottons">
            <template v-if="document.attach && document.attach.length > 0">
              <v-btn @click="showAttach=!showAttach" title="첨부파일 보기" :class="{'primary--text':showAttach}">첨부파일({{document.attach.filter(x=>!x.insert).length}})</v-btn>
            </template>
            <v-btn class="short" v-show="document.isWriter" :to="`/${$route.params.boardId}/edit/${document.documentId}`">
              <span>수정</span>
            </v-btn>
            <v-btn class="short" v-show="document.isWriter" @click="deleteDocument">삭제</v-btn>
            <v-menu open-on-hover bottom offset-y lazy>
              <v-btn slot="activator" class="short">스크랩</v-btn>
              <v-list dense>
                <v-list-tile v-for="item in scrapGroups" :key="item.scrapGroupId" @click="scrapDocument(item)">
                  <v-list-tile-title>{{ item.scrapGroupName }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-menu open-on-hover bottom offset-y lazy>
              <v-btn slot="activator" class="short" v-show="!document.isWriter">신고</v-btn>
              <v-list two-line>
                <v-list-tile v-for="(item, index) in reportTypes" :key="item.reportTypeId" @click="reportDocument(item)" :class="{'mt-2':index>0}">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.reportTypeName }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{item.reportTypeDescription}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-btn-toggle>
        </v-flex>
      </v-layout>
      <v-slide-y-transition>
        <v-layout row v-show="showAttach" mt-2 wrap>
          <v-flex px-2 xs6 md4 xl2 :key="index" v-for="(item, index) in document.attach.filter(x=>!x.insert)">
            <router-link :to="webUrl + '/' + item.attach_path" target="_blank" :download="item.attach_name" class="ellipsis underline">{{item.attach_name}}</router-link>
          </v-flex>
        </v-layout>
      </v-slide-y-transition>
    </v-flex>
    <v-flex mb-4>
      <ViewComments :isAnonymous="document.isWriter && document.nickName === ''" :allowAnonymous="document.allowAnonymous" :isCommentWritable="isCommentWritable" :reportTypes="reportTypes"/>
    </v-flex>
  </v-layout>
</template>

<script>
// import LinkPrevue from '@/components/LinkPrevue'
import Survey from "@/components/board/survey/Survey";
import CommentWriter from "@/components/board/CommentWriter";
import ViewComments from "@/components/board/ViewComments";
import BoardMixins from "@/components/mixins/BoardMixins";
import Quill from "quill";

export default {
  props: ["board", "boardId", "documentId"],
  data() {
    return {
      document: null,
      documentHTML: null,
      survey: null,
      showAttach: false,
      scrapGroups: null,
      reportTypes: null,
      currentBoard: null
    };
  },
  components: {
    Survey,
    CommentWriter,
    ViewComments
  },
  mixins: [BoardMixins],
  created() {
    this.getScrapGroups();
    this.getReportTypes();
  },
  computed: {
    isCommentWritable() {
      let board = this.board.boardId === this.document.boardId ? this.board : this.$store.getters.boards.find(x => x.boardId === this.document.boardId);
      if (!board) {
        return "UNAVAILABLE";
      }

      const profile = this.$store.getters.profile;
      const userBoards = this.$store.getters.userBoards;
      if (board.statusAuth.comment.includes(profile.auth)) {
        if (board.boardType === "T") {
          if (userBoards.some(x => x.boardId === board.boardId)) {
            const userBoard = userBoards.find(x => x.boardId === board.boardId);
            if (!userBoard.writeRestrictDate || this.$moment(userBoard.writeRestrictDate, "YYYYMMDD").isBefore(this.$moment())) {
              return "AVAILABLE";
            } else {
              return "RESTRICTED";
            }
          } else {
            //need subscription
            if (board.allGroupAuth === "READWRITE" || board.allowedGroups.some(x => x === profile.region || x === profile.major || x === profile.grade || profile.groups.includes(x))) {
              //i can subscribe this board!
              return "NEEDSUBSCRIPTION";
            } else {
              return "UNAVAILABLE";
            }
          }
        } else {
          if (board.allowedGroups.some(x => x === profile.region || x === profile.major || x === profile.grade || profile.groups.includes(x))) {
            if (userBoards.some(x => x.boardId === board.boardId)) {
              const userBoard = userBoards.find(x => x.boardId === board.boardId);
              if (!userBoard.writeRestrictDate || this.$moment(userBoard.writeRestrictDate, "YYYYMMDD").isBefore(this.$moment())) {
                return "AVAILABLE";
              } else {
                return "RESTRICTED";
              }
            } else {
              return "AVAILABLE";
            }
          } else {
            return "UNAVAILABLE";
          }
        }
      } else {
        return "UNAVAILABLE";
      }
    }
  },
  methods: {
    getDocument: function() {
      this.$axios
        .get(`/${this.boardId}/${this.documentId}`)
        .then(response => {
          if (Array.isArray(response.data.attach)) {
            response.data.attach = response.data.attach.filter(x => x !== null);
          }
          this.document = response.data;
          this.documentHTML = this.document.isDeleted?this.document.contents:this.deltaToHTML(JSON.parse(this.document.contents));
          if (this.document.hasSurvey) {
            this.survey = this.formatSurvey(this.document.survey, this.document.participatedSurvey);
          }
          this.showAttach = false;
        })
        .catch(error => {
          console.log(error);
          this.$router.replace("/error?error=" + (error && error.response ? error.response.status || "404" : "404"));
        });
    },
    deleteDocument() {
      if (confirm("이 글을 삭제하시겠습니까?")) {
        this.$axios
          .put("/document", {documentId: this.documentId, isDeleted: true})
          .then(response => {
            this.$store.dispatch("showSnackbar", {text: "글을 삭제하였습니다.", color: "success"});
            this.$router.push(`/${this.boardId}`);
          })
          .catch(error => {
            this.$store.dispatch("showSnackbar", {text: `${error.response ? error.response.data.message : "글을 삭제하지 못했습니다."}`, color: "error"});
          });
      }
    },
    voteDocument() {
      this.$axios
        .post("/vote/document", {documentId: this.$route.params.documentId}, {headers: {silent: true}})
        .then(res => {
          document.voteUpCount = res.data.voteUpCount;
        })
        .catch(error => {
          console.log(error.response);
          this.$store.dispatch("showSnackbar", {text: `${error.response ? error.response.data.message : "추천하지 못했습니다."}`, color: "error"});
        });
    },
    deltaToHTML(delta) {
      let tempCont = document.createElement("div");
      let quill = new Quill(tempCont);
      let image;
      delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty("image")) {
          image = this.document.attach.find(x => x.attach_name === item.insert.image);
          if (image) {
            image.insert = true;
            item.attributes = {
              download: item.insert.image,
              alt: item.insert.image
            };
            item.insert.image = this.webUrl + "/" + image.attach_path;
            item.attributes.link = item.insert.image;
          }
        }
      });
      quill.setContents(delta);
      return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
    },
    saveddocument(to, from) {
      let href = to.match(/\bhttps?:\/\/\S+/gi);
      if (href) {
        this.link = href[0].substr(0, href[0].indexOf("<"));
        console.log(this.link);
      }
    },
    reportDocument(item) {
      this.$axios
        .post("/report/document", {documentId: this.document.documentId, reportTypeId: item.reportTypeId})
        .then(response => {
          this.$store.dispatch("showSnackbar", {text: "이 글을 신고하였습니다.", color: "success"});
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "글을 신고하지 못했습니다." : "글을 신고하지 못했습니다.", color: "info"});
          } else {
            console.log(error);
            this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "글을 신고하지 못했습니다." : "글을 신고하지 못했습니다.", color: "error"});
          }
        });
    },
    scrapDocument(item) {
      this.$axios
        .post("/scrap", {scrapGroupId: item.scrapGroupId, documentId: this.document.documentId})
        .then(response => {
          this.$store.dispatch("showSnackbar", {text: "이 글을 스크랩하였습니다.", color: "success"});
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "스크랩에 추가하지 못했습니다." : "스크랩에 추가하지 못했습니다.", color: "info"});
          } else {
            console.log(error);
            this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "스크랩에 추가하지 못했습니다." : "스크랩에 추가하지 못했습니다.", color: "error"});
          }
        });
    },
    getScrapGroups() {
      if (!this.scrapGroups) {
        if (this.$store.getters.scrapGroups) {
          this.scrapGroups = this.$store.getters.scrapGroups;
        } else {
          this.$axios
            .get("/scrap/group", {headers: {silent: true}})
            .then(response => {
              this.$store.dispatch("setScrapGroups", response.data);
              this.scrapGroups = response.data;
            })
            .catch(error => {
              console.log(error);
              this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "스크랩 그룹 목록을 가져오지 못했습니다." : "스크랩 그룹 목록을 가져오지 못했습니다.", color: "error"});
            });
        }
      }
    },
    getReportTypes() {
      if (!this.reportTypes) {
        if (this.$store.getters.reportTypes) {
          this.reportTypes = this.$store.getters.reportTypes;
        } else {
          this.$axios
            .get("/report/type", {headers: {silent: true}})
            .then(response => {
              this.$store.dispatch("setReportTypes", response.data);
              this.reportTypes = response.data;
            })
            .catch(error => {
              console.log(error);
              this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "신고 타입을 가져오지 못했습니다." : "신고 타입을 가져오지 못했습니다.", color: "error"});
            });
        }
      }
    }
  },
  watch: {
    "$route.params": {
      handler() {
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
#documentContents p img {
  max-width: 100%;
}
@media (max-width: 600px) {
  #documentContents p img {
    max-width: calc(100% + 32px);
    margin-left: -16px;
    margin-right: -16px;
  }
}
</style>