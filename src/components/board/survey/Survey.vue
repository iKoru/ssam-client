<template>
  <v-layout row>
    <v-flex v-if="survey">
          <!-- <v-btn @click="doSurvey">시행</v-btn> -->

      <v-btn-toggle v-model="toggleOne" mandatory>
        <v-btn flat>
          <v-icon>format_align_left</v-icon>
        </v-btn>
        <v-btn flat>
          <v-icon>format_align_center</v-icon>
        </v-btn>
      </v-btn-toggle>
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
      <v-btn v-if="surveyCompleted" @click="completeSurvey">제출하기</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
// import VuePoll from 'vue-poll'
import VuePoll from "@/components/board/survey/VuePoll";
export default {
  props: ["survey"],
  components: {
    VuePoll
  },
  data() {
    return {
      // survey: undefined,
      toggleOne: 0,
      completedQuestionNumber: [],
      surveyCompleted: false,
      finalResults: false
    };
  },
  methods: {
    // doSurvey() {
    //   this.survey = JSON.parse(this.surveyJSON).survey;
    //   console.log(this.survey);
    // },
    completeSurvey() {
      this.handleSurveyResult();
    },
    handleSurveyResult() {
      // to server
      console.log(this.completedQuestionNumber)
      this.$axios
        .post(`/survey`, {
          documentId: this.$route.params.documentId,
          answer: [3,6,8,0,0]
        })
        .then(response => {
          console.log(response);
          this.content = response.data;
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
    }
  }
};
</script>
<style>
</style>
