<template>
  <v-layout column v-if="document">
    <v-flex xs12>
      <v-card-title primary-title>
        <div class="w-100">
          <h3 class="headline mb-0">{{document.title}}</h3>
          <v-layout row>
            <v-flex xs6></v-flex>
            <v-flex xs2>{{document.nickName}}</v-flex>
            <v-flex xs2>조회수 {{document.viewCount}}</v-flex>
            <v-flex xs3 text-xs-right>{{$moment(document.writeDateTime, "YYYYMMDDHHmmss").format("Y.MM.DD HH:mm:ss")}}</v-flex>
          </v-layout>
        </div>
      </v-card-title>
    </v-flex>
    <v-divider/>
    <v-flex xs12>
      <v-layout row>
        <v-spacer/>
        <v-flex sm12 md4 text-sm-right v-if="document.attach">
            <v-chip @click="showAttach=!showAttach" color="grey lighten-1">첨부파일 {{document.attach.length}}개</v-chip>
            <v-tooltip v-model="showAttach" bottom>
              <span slot="activator"></span>
              <v-list style="background-color:#616161">
                <v-list-tile color="white" :key="index" v-for="(item, index) in document.attach">
                  {{item.attachName}}
                  <a target="_blank" :href="webUrl + item.attachPath" :download="item.attachName">
                    <v-btn type="submit" icon color="white" circle small><v-icon small>mdi-arrow-down</v-icon></v-btn>
                  </a>
                </v-list-tile>
              </v-list>
            </v-tooltip> 
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-card-text>
        <div v-html="documentHTML"></div>
        {{document}}
      </v-card-text>
    </v-flex>
    <v-flex xs12 v-if="document.hasSurvey">
      <v-layout row>
        <v-flex xs10>
          <v-card-text>
            <Survey :survey="survey"/>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-layout row>
        <v-flex sm12 md4></v-flex>
        <v-flex sm12 md4 text-xs-center>
          <v-chip color="indigo" text-color="white" @click.native="voteDocument">
            <div class="vote-chip">
            <v-avatar>
              <v-icon color="white" small>thumb_up</v-icon>
            </v-avatar>
            {{document.voteUpCount}}
            </div>
          </v-chip>
        </v-flex>
        <v-flex sm12 md4 text-xs-right pr-2 my-auto>
          <router-link v-if="document.isWriter" :to="`/${$route.params.boardId}/edit/${document.documentId}`">
            <v-label>수정 / </v-label>
          </router-link>
          <!-- <v-label v-if="document.isWriter" @click="editDocument">수정 /</v-label> -->
          <v-label v-if="document.isWriter" @click="deleteDocument"> 삭제 /</v-label>
          <v-label> 신고</v-label>
        </v-flex>
      </v-layout>
      <!-- { "documentId": 589, "boardId": "free", "isDeleted": false, "commentCount": 0, "reportCount": 0, "voteUpCount": 0, "viewCount": 2, "writeDateTime": "20190107161923", "bestDateTime": null, "title": "ㅅㄷㄴㅅ", "restriction": null, "allowAnonymous": true, "hasSurvey": false, "hasAttach": true, "categoryName": null, "reserved1": null, "reserved2": null, "reserved3": null, "reserved4": null, "nickName": "운영진blue", "documents": "<p>ㅅㄷㄴㅅ</p>", "attach": [ { "documentId": 589, "attachId": "5552c00b-6925-c911-e844-440ee0fdcd3e", "attachType": ".jpg", "attachName": "1557374ea811ed9.jpg", "attachPath": "attach/589/5552c00b-6925-c911-e844-440ee0fdcd3e.jpg" } ], "isWriter": true } -->
    </v-flex>
    <v-divider/>
    <v-flex xs12>
      <ViewComment/>
      <WriteComment/>
    </v-flex>
    <v-card-text>
      <br>
      작성자본인{{document.isWriter}}
      <br>
    </v-card-text>
  </v-layout>
</template>

<script>
// import LinkPrevue from '@/components/LinkPrevue'
import Survey from "@/components/board/survey/Survey";
import WriteComment from "@/components/board/WriteComment";
import ViewComment from "@/components/board/ViewComment";
import BoardMixins from "@/components/mixins/BoardMixins";
import _Quill from "quill";
const Quill = window.Quill || _Quill;
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
    WriteComment,
    ViewComment
  },
  mixins: [BoardMixins],
  mounted() {
    this.document = localStorage.item;
  },
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
          this.documentHTML = this.deltaToHTML(JSON.parse(this.document.contents));
          if (this.document.hasSurvey) {
            this.survey = this.formatSurvey(this.document.survey, this.document.participatedSurvey);
          }
        })
        .catch(error => {
          console.log(error);
          this.$router.replace('/error?error=' + (error && error.response? error.response.status || '404':'404'))
        });
    },
    deleteDocument () {
      if(confirm('이 글을 삭제합니다.')) {
        this.$axios
          .delete(`/document/${this.$route.params.documentId}`)
          .then(response => {
            this.$router.push(`/${this.$route.params.boardId}`)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    voteDocument() {
      this.$axios.post('/vote/document/', {
        documentId: this.$route.params.documentId
      }).then(res => {
        console.log(res)
        document.voteUpCount = res.data.voteUpCount
      }).catch(err => {
        console.log(err.response)
      })
    },
    deltaToHTML(delta) {
      var tempCont = document.createElement("div");
      let quill = new Quill(tempCont);
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
    }
  }
};
</script>
<style>
.v-label {
  cursor: pointer
}
.vote-chip {
  cursor: pointer
}
</style>