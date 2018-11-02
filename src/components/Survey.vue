<template>
<v-layout row>
    <v-btn @click="doSurvey">시행</v-btn>
    <v-flex v-if="survey">
        <v-card :key="index" v-for="(item, index) in survey">
            <vue-poll @addVote="addvote" :questionNumber="item.questionNumber" :question="item.question" :optionCount="item.optionCount" :answers="item.answers" :multiple="true" :selectable='true' :finalResults='surveyCompleted' />
        </v-card>
        <v-btn @click="completeSurvey">
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
      surveyCompleted: false
    }
  },
  methods: {
    doSurvey () {
      this.survey = (JSON.parse(this.surveyJSON)).survey
      console.log(this.survey)
    },
    completeSurvey () {
      this.handleSurveyResult()
      this.surveyCompleted = true
    },
    handleSurveyResult () {
    },
    addvote (votedObject) {
      console.log(votedObject)
    }
  },
  mounted () {
    // this.survey = JSON.parse(this.surveyJSON)
  },
  watch: {
  }
}
</script>
<style>
</style>
