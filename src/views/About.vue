<template>
  <!-- bidirectional data binding（双向数据绑定） -->
  <div>
    <editor/>
    <!-- <attachment/> -->
    <!-- <div>

      <div v-if="surveyJSON">
        설문조사가 추가되었습니다.
        <v-btn @click="openSurvey">확인하기</v-btn>
      </div>
      <div>viewer
        {{surveyJSON}}
        <survey :surveyJSON="surveyJSON"/>
      </div>
    </div> -->
  </div>
</template>

<script>
import Editor from '@/components/board/editor/Editor'
import QuestionMaker from '@/components/board/editor/QuestionMaker'
import SurveyMaker from '@/components/board/editor/SurveyMaker'
import Survey from '@/components/board/Survey'
import Attachment from '@/components/board/editor/Attachment.vue'
export default {
  components: {
    Editor,
    QuestionMaker,
    SurveyMaker,
    Survey,
    Attachment
  },
  data () {
    return {
      surveyJSON: undefined,
      surveyDialog: false,
      currentSurvey: { questions: [] }
    }
  },
  methods: {
    extractSurvey (surveyJSON) {
      console.log(surveyJSON)
      this.surveyJSON = surveyJSON
      this.surveyDialog = false
    },
    openSurvey () {
      this.currentSurvey = JSON.parse(this.surveyJSON)
      this.surveyDialog = true
    },
    closeSurvey () {
      this.surveyDialog = false
    }
  }
}
</script>
