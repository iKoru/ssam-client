<template>
  <v-layout row style="background-color:#f8f8f8;" py-4 px-2>
    <v-flex v-if="survey">
          <!-- <v-btn @click="doSurvey">시행</v-btn> -->
      <v-layout justify-center>
        <v-btn-toggle v-if="!survey.participated" v-model="toggleOne">
          <v-btn dark color="red" @click="showSurveyResult = false">
            설문
          </v-btn>
          <v-btn dark color="orange" @click.stop="completeSurvey">제출</v-btn>
          <v-btn dark color="success" @click="showSurveyResult = true">
            결과
          </v-btn>
        </v-btn-toggle>
      </v-layout>
      <template v-for="(item, index) in survey.surveyContents.questions">
        <v-layout row wrap :key="index" style="position:relative">
          <v-flex xs12 mx-3>
            <vue-poll
             :questionNumber="index+1"
             :question="item.title"
             :allowMultiple="item.allowMultipleChoice"
             :answers="item.choices"
             :multiple="true"
             :selectable="true"
             :finalResults="finalResults"
             @answerSelected="answerSelected" />
          </v-flex>
        </v-layout>
        <v-layout row :key="'devider'+index">
          <v-divider v-if="index + 1 < survey.length" :key="`divider-${index}`"></v-divider>
        </v-layout>
      </template>
      
    </v-flex>
  </v-layout>
</template>

<script>
// import VuePoll from 'vue-poll'
import VuePoll from "@/components/board/survey/VuePoll";
import BoardMixins from '@/components/mixins/BoardMixins'
export default {
  props: ["survey"],
  components: {
    VuePoll
  },
  mixins: [ BoardMixins ],
  data() {
    return {
      // survey: undefined,
      toggleOne: 0,
      completedQuestionNumber: [],
      surveyCompleted: false,
      surveyFixed: false,
      showSurveyResult: false
    };
  },
  computed: {
    finalResults () {
      if (this.survey.participated) {
        return true
      } else {
        return this.showSurveyResult
      }
    }
  },
  methods: {
    // doSurvey() {
    //   this.survey = JSON.parse(this.surveyJSON).survey;
    //   console.log(this.survey);
    // },
    getAnswerArray (questions) {
      let answers = [];
      questions.forEach(q => {
        if(!q.allowMultipleChoice) {
          answers.push(q.choices.findIndex(c => c.selected))
        } else {
          let answerArray = []
          q.choices.forEach((c, cIndex) => {
            if(c.selected) answerArray.push(cIndex)
          })
          answers.push(answerArray)
        }
      })
      return answers;
    },
    completeSurvey() {
      if((this.surveyCompleted && !this.surveyFixed && !this.finalResults)){
        if(confirm('설문을 제출합니다.')) {
          this.handleSurveyResult();
        }
      }
      else {
        setTimeout(()=> {
          this.toggleOne=0
        },100)
        
        alert('모든 설문을 마쳐주세요')
      }
    },
    handleSurveyResult() {
      // to server
      console.log(this.completedQuestionNumber)
      let answer = this.getAnswerArray(this.survey.surveyContents.questions)
      console.log(answer)
      console.log(answer)
      this.$axios
        .post(`/survey`, {
          documentId: this.$route.params.documentId,
          answer: answer
        })
        .then(response => {
          console.log(response);
          if(response.status === 200) {
            this.$axios
              .get(`/${this.$route.params.boardId}/${this.$route.params.documentId}`)
              .then(response => {
                this.survey = this.formatSurvey(response.data.survey, response.data.participatedSurvey)
                console.log(this.survey)
                this.showSurveyResult = true
              })
              .catch(error => {
                console.log(error);
             });
          }
        })
        .catch(error => {
          console.log(error.response);
        });
      // if (confirm("yes")) {
      //   this.finalResults = true;
      // } else {
      //   this.finalResults = false;
      // }
    },
    addvote(votedObject) { 
      console.log(votedObject);
    },
    answerSelected(res) {
      console.log(res)
      if (res[1]) {
        if (!this.completedQuestionNumber.includes(res[0])) {
          this.completedQuestionNumber.push(res[0]);
        }
      } else {
        if (this.completedQuestionNumber.includes(res[0])) {
          this.completedQuestionNumber = this.completedQuestionNumber.filter(function(no) {
            return no !== res[0];
          });
        }
      }
      console.log(this.completedQuestionNumber);
    }
  },
  mounted() {
    // this.survey = JSON.parse(this.surveyJSON)
  },
  watch: {
    completedQuestionNumber: function(to) {
      console.log(to.length)
      if (to.length === this.survey.surveyContents.questions.length) {
        this.surveyCompleted = true;
      } else {
        this.surveyCompleted = false;
      }
      console.log(this.surveyCompleted)
    },
    surveyCompleted: function(to) {
      if(this.surveyCompleted) {
        this.toggleOne = 1
      } else this.toggleOne = 0
    }
  }
};
</script>
<style>
</style>
