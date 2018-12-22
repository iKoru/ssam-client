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
    <v-flex xs12>
      <v-card-text>
          <div v-html="content.contents">
          </div>
      </v-card-text>
    </v-flex>
    <v-flex xs12>
      <v-layout row>
        <v-flex xs10>    
          <v-card-text v-if="content.hasSurvey">
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
import { formatSurvey } from '@/components/mixins/formatSurvey'
export default {
  props: [],
  data() {
    return {
      content: null,
      survey: null
    };
  },
  components: {
    Survey,
    WriteComment,
    ViewComment
  },
  mixins: [formatSurvey],
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
