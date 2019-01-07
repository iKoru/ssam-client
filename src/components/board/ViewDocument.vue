<template>
  <v-layout column v-if="content">
    <v-flex xs12>
       <v-card-title primary-title>
          <div class="w-100">
            <h3 class="headline mb-0">{{content.title}}</h3>
            <v-layout row>
              <v-flex xs6></v-flex>
              <v-flex xs2>
                {{content.nickName}}
              </v-flex>
              <v-flex xs2>
                조회수 {{content.viewCount}}
              </v-flex>
              <v-flex xs3 text-xs-right>
                {{$moment(Date(content.writeDateTime)).format('YYYY.MM.DD hh:mm:ss')}}
              </v-flex>
            </v-layout>
          </div>
        </v-card-title>
    </v-flex>
    <v-divider/>
    <v-flex xs12 v-if="content.attach" text-xs-right>
      <!-- { "documentId": 589, "boardId": "free", "isDeleted": false, "commentCount": 0, "reportCount": 0, "voteUpCount": 0, "viewCount": 2, "writeDateTime": "20190107161923", "bestDateTime": null, "title": "ㅅㄷㄴㅅ", "restriction": null, "allowAnonymous": true, "hasSurvey": false, "hasAttach": true, "categoryName": null, "reserved1": null, "reserved2": null, "reserved3": null, "reserved4": null, "nickName": "운영진blue", "contents": "<p>ㅅㄷㄴㅅ</p>", "attach": [ { "documentId": 589, "attachId": "5552c00b-6925-c911-e844-440ee0fdcd3e", "attachType": ".jpg", "attachName": "1557374ea811ed9.jpg", "attachPath": "attach/589/5552c00b-6925-c911-e844-440ee0fdcd3e.jpg" } ], "isWriter": true } -->
      <v-chip @click="showAttach=!showAttach" color="grey lighten-1">첨부파일 {{content.attach.length}}개 확인</v-chip>
            <v-tooltip v-model="showAttach" bottom>
              <span slot="activator"></span>
              <v-list style="background-color:#616161">
                <v-list-tile color="white" :key="index" v-for="(item, index) in content.attach">
                  {{item.attachName}}
                  <a target="_blank" :href="webUrl + item.attachPath" :download="item.attachName">
                    <v-btn type="submit" icon color="white" circle small><v-icon small>mdi-arrow-down</v-icon></v-btn>
                  </a>
                </v-list-tile>
              </v-list>
            </v-tooltip> 
    </v-flex>
    <v-flex xs12>
      <v-card-text>
          <div v-html="content.contents">
          </div>
            {{content}}
      </v-card-text>
    </v-flex>
    <v-flex xs12 v-if="content.hasSurvey">
      <v-layout row>
        <v-flex xs10>    
          <v-card-text>
            <Survey :survey="survey"/>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-divider/>
    <v-flex xs12>

       <WriteComment/>
        <ViewComment/>
    </v-flex>
    <v-card-text>
        <br>작성자본인{{content.isWriter}}
        <br >
      </v-card-text>
  </v-layout>
</template>

<script>
// import LinkPrevue from '@/components/LinkPrevue'
import Survey from '@/components/board/survey/Survey'
import WriteComment from '@/components/board/WriteComment'
import ViewComment from '@/components/board/ViewComment'
import BoardMixins from '@/components/mixins/BoardMixins'
export default {
  props: [],
  data() {
    return {
      content: null,
      survey: null,
      showAttach: false,
      webUrl:'https://node2-koru.c9users.io:8081/'
    };
  },
  components: {
    Survey,
    WriteComment,
    ViewComment
  },
  mixins: [ BoardMixins ],
  mounted() {
    this.content = localStorage.item;
  },
  created() {
    this.getDocument();
  },
  methods: {
    getDocument: function() {
      this.$axios
        .get(`/${this.$route.params.boardId}/${this.$route.params.documentId}`)
        .then(response => {
          console.log(response);
          this.content = response.data;
          if(this.content.hasSurvey) {
            this.survey = this.formatSurvey(this.content.survey, this.content.participatedSurvey)
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    savedContent(to, from) {
      let href = to.match(/\bhttps?:\/\/\S+/gi);
      if (href) {
        this.link = href[0].substr(0, href[0].indexOf("<"));
        console.log(this.link);
      }
    },
    
  }
};
</script>
