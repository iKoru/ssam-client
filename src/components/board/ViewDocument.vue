<template>
  <v-layout column v-if="document">
    <v-flex>
      <v-card-title primary-title>
        <div class="w-100">
          <router-link :to="'/'+document.boardId+'/'+document.documentId" class="title mb-0 multi-row">{{document.title}}</router-link>
          <v-layout row>
            <v-spacer/>
            <v-flex text-xs-right>
              <b>{{document.nickName === ''? '(익명)' : document.nickName}}</b> | 조회 {{document.viewCount}} | {{$moment(document.writeDateTime, "YYYYMMDDHHmmss").format("Y.MM.DD HH:mm:ss")}}
            </v-flex>
          </v-layout>
        </div>
      </v-card-title>
    </v-flex>
    <v-divider/>
    <v-flex xs12>
      <v-card-text>
        <div v-html="documentHTML"></div>
        {{document}}
      </v-card-text>
    </v-flex>
    <v-layout row justify-center v-show="document.hasSurvey">
      <v-flex xs12 sm10 md8>
        <Survey :survey="survey"/>
      </v-flex>
    </v-layout>
    <v-flex text-xs-center my-2>
      <v-btn short @click="voteDocument" class="font-weight-bold">
        <v-icon color="primary" small>thumb_up</v-icon>&nbsp;
        <span class="primary--text">{{document.voteUpCount}}</span>
      </v-btn>
    </v-flex>
    <v-divider/>
    <v-flex class="my-2">
      <v-layout row text-xs-right>
        <v-flex pr-2>
          <v-btn-toggle id="bottomBottons">
            <template v-show="document.attach && document.attach.length > 0">
              <v-btn @click="showAttach=!showAttach" class="font-weight-bold" title="첨부파일 보기">첨부파일({{document.attach.length}})</v-btn>
              <v-tooltip v-model="showAttach" bottom>
                <span slot="activator"></span>
                <v-list style="background-color:#616161">
                  <v-list-tile color="white" :key="index" v-for="(item, index) in document.attach">
                    {{item.attachName}}
                    <a target="_blank" :href="webUrl + item.attachPath" :download="item.attachName">
                      <v-btn type="submit" icon color="white" circle small>
                        <v-icon small>mdi-arrow-down</v-icon>
                      </v-btn>
                    </a>
                  </v-list-tile>
                </v-list>
              </v-tooltip>
            </template>
            <v-btn class="short font-weight-bold" v-show="document.isWriter" :to="`/${$route.params.boardId}/edit/${document.documentId}`">
              <span>수정</span>
            </v-btn>
            <v-btn class="short font-weight-bold" v-show="document.isWriter" @click="deleteDocument">삭제</v-btn>
            <v-btn class="short font-weight-bold" @click="scrapDocument">스크랩</v-btn>
            <v-btn class="short font-weight-bold" v-show="!document.isWriter" @click="reportDocument">신고</v-btn>
          </v-btn-toggle>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <ViewComments :isWriter="document.isWriter"/>
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
  props: [],
  data() {
    return {
      document: null,
      documentHTML: null,
      survey: null,
      showAttach: false
    };
  },
  components: {
    Survey,
    CommentWriter,
    ViewComments
  },
  mixins: [BoardMixins],
  created() {
    this.getDocument();
  },
  computed: {
    webUrl() {
      return process.env.VUE_APP_WEB_URL;
    }
  },
  methods: {
    getDocument: function() {
      this.$axios
        .get(`/${this.$route.params.boardId}/${this.$route.params.documentId}`)
        .then(response => {
          console.log(response);
          this.document = response.data;
          this.documentHTML = this.deltaToHTML(JSON.parse(this.document.contents), this.document.attach);
          if (this.document.hasSurvey) {
            this.survey = this.formatSurvey(this.document.survey, this.document.participatedSurvey);
          }
        })
        .catch(error => {
          console.log(error);
          this.$router.replace("/error?error=" + (error && error.response ? error.response.status || "404" : "404"));
        });
    },
    deleteDocument() {
      if (confirm("이 글을 삭제하시겠습니까?")) {
        this.$axios
          .put('/document', {documentId:this.$route.params.documentId, isDeleted:true})
          .then(response => {
            this.$store.dispatch('showSnackbar', {text:'글을 삭제하였습니다.', color:'success'})
            this.$router.push(`/${this.$route.params.boardId}`);
          })
          .catch(error => {
            this.$store.dispatch("showSnackbar", {text: `${error.response ? error.response.data.message : "글을 삭제하지 못했습니다."}`, color: "error"});
          });
      }
    },
    voteDocument() {
      this.$axios
        .post("/vote/document/", {
          documentId: this.$route.params.documentId
        })
        .then(res => {
          console.log(res);
          document.voteUpCount = res.data.voteUpCount;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    deltaToHTML(delta) {
      var tempCont = document.createElement("div");
      let quill = new Quill(tempCont);
      console.log(delta, "aa");
      delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty("image")) {
          // random generated uuid should given here
          item.insert.image = this.getImagePath(item.insert.image);
        }
      });
      quill.setContents(delta);
      return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
    },
    getImagePath(imagePath) {
      let attach = this.document.attach;
      this.document.attach = this.document.attach.filter(item => item.attachName !== imagePath);
      return this.webUrl + attach.find(item => item.attachName === imagePath).attachPath;
    },
    saveddocument(to, from) {
      let href = to.match(/\bhttps?:\/\/\S+/gi);
      if (href) {
        this.link = href[0].substr(0, href[0].indexOf("<"));
        console.log(this.link);
      }
    },
    reportDocument(){
      console.log('report!')
    },
    scrapDocument(){
      console.log('scrap!')
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
#bottomBottons .v-btn{
  opacity:1;
}
</style>