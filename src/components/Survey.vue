<template>
<v-layout row>
    <v-btn @click="doSurvey">시행</v-btn>
    <v-flex v-if="survey">
        <template v-for="(item, index) in survey">
          <v-layout row wrap :key="index" style="position:relative" >
            <v-flex xs12 mx-3>
              <vue-poll @answerSelected="answerSelected" :questionNumber="item.questionNumber" :question="item.question" :allowMultiple="item.allowMultiple" :answers="item.answers" :multiple="true" :selectable='true' :finalResults="finalResults"/>
            </v-flex>
          </v-layout>
          <v-layout row :key="'devider'+index">
          <v-divider v-if="index + 1 < survey.length" :key="`divider-${index}`"></v-divider>
          </v-layout>
        </template>
        <v-btn v-if="surveyCompleted" @click="completeSurvey">
            제출하기
        </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
// import VuePoll from 'vue-poll'
import VuePoll from '@/components/VuePoll'
export default {
  props: ['surveyJSON'],
  components: {
    VuePoll
  },
  data () {
    return {
      survey: undefined,
      completedQuestionNumber: [],
      surveyCompleted: false,
      finalResults: false
    }
  },
  methods: {
    doSurvey () {
      this.survey = (JSON.parse(this.surveyJSON)).survey
      console.log(this.survey)
    },
    completeSurvey () {
      this.handleSurveyResult()
    },
    handleSurveyResult () {
      // to server
      if (confirm('yes')) {
        this.finalResults = true
      } else {
        this.finalResults = false
      }
    },
    addvote (votedObject) {
      console.log(votedObject)
    },
    answerSelected (res) {
      if (res[1]) {
        if (!this.completedQuestionNumber.includes(res[0])) {
          this.completedQuestionNumber.push(res[0])
        }
      } else {
        if (this.completedQuestionNumber.includes(res[0])) {
          this.completedQuestionNumber = this.completedQuestionNumber.filter(function (no) { return no !== res[0] })
        }
      }
      console.log(this.completedQuestionNumber)
    }
  },
  mounted () {
    // this.survey = JSON.parse(this.surveyJSON)
  },
  watch: {
    completedQuestionNumber: function (to) {
      if (to.length == this.survey.length) {
        this.surveyCompleted = true
      } else {
        this.surveyCompleted = false
      }
    }
  }
}
</script>
<style>
</style>
