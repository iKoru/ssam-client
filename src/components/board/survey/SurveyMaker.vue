<template>
<v-card>
  <v-toolbar dark color="indigo">
    <v-toolbar-title>설문조사 생성</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn color="alert" dark @click="deleteSurvey">설문삭제</v-btn>
      <v-btn color="success" dark @click="extractSurvey">설문완성</v-btn>
      <v-btn class="toolbar-btn-last" dark flat @click.native="$emit('closeSurvey')">닫기</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-layout row style="background-color:lightgrey">
      <v-flex>
        <v-flex xs12>
          <v-flex style="background-color:lightgrey" :key="index" class="py-2 px-2" v-for="(item, index) in questions">
              <question-maker :editingQuestion="item" :questionIndex="index" @addQuestion="addQuestion" @modifyQuestionSuccess="modifyQuestionSuccess" @deleteQuestion="deleteQuestion"/>
              <!-- <v-layout row wrap :key="'devider'+index" style="position:relative" >
                <v-layout class="fab-container">
                  <v-btn class="btn-xs" fab @click="modifyQuestion(index)">수정</v-btn>
                </v-layout>
                <v-flex xs12 mx-3>
                  <vue-poll :questionNumber="item.questionNumber" :key="'poll'+index" :allowMultiple="item.allowMultiple" :question="item.question" :answers="item.answers" :multiple="false" :selectable=false :finalResults=false />
                </v-flex>
              </v-layout>
              <v-layout row :key="index"> -->
          </v-flex>
          <v-flex @click="pushQuestion()">
            <v-card class="text-xs-center">
                <v-layout align-center justify-center py-2 my-auto>
                  <v-icon color="indigo">mdi-plus-circle</v-icon><v-label size="24">질문추가</v-label>
                </v-layout>
            </v-card>
          </v-flex>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
// import VuePoll from 'vue-poll'
import VuePoll from '@/components/board/survey/VuePoll'
import QuestionMaker from '@/components/board/survey/QuestionMaker'
export default {
  components: {
    QuestionMaker,
    VuePoll
  },
  props: ['currentSurvey', 'surveyDialog'],
  data () {
    return {
      dialog: false,
      editingQuestion: undefined,
      modifyingIndex: null
    }
  },
  computed: {
    questions: function () { return this.currentSurvey.questions }
  },
  methods: {
    addQuestion (question) {
      this.questions.push(question)
    },
    closeQuestionMaker () {
      this.dialog = false
      this.initEditingQuestion()
    },
    pushQuestion () {
      this.questions.push(
        {
          title: '',
          allowMultipleChoice: false,
          choices: ['', '']
        }
      )
    },
    deleteSurvey() {
      this.$emit('deleteSurvey')
    },
    deleteQuestion (index) {
      if(this.questions.length < 2) {
        alert('최소 하나의 질문을 입력해주세요')
      } else {
        this.questions.splice(index, 1)
      }
    },
    modifyQuestionSuccess (question) {
      this.dialog = false
      this.questions[this.modifyingIndex] = question
      this.modifyingIndex = null
    },
    initEditingQuestion () {
      this.editingQuestion = {
        question: '',
        answers: [
          { text: '' },
          { text: '' }
        ],
        option: []
      }
    },
    extractSurvey () {
      let catchSurveyError = this.questions.some(question => {
        if(question.title.length < 1) {
          alert('질문을 입력하세요')
          return true;
        }
        question = this.validateQuestion(question)
        if(question.choices.length < 1) {
          alert('응답을 입력하세요')
          question.choices.push('')
          return true;
        }
      })
      if (!catchSurveyError)
        this.$emit('extractSurvey', { questions: this.questions })

    },
  validateQuestion (question) {
        question.choices = question.choices.filter(choice => choice.length > 0)
        return question
    },
  },
  mounted () {
    this.initEditingQuestion()
  }
}
</script>
<style>
.fab-container {
  position: absolute;
  top: 0;
  right: 0;
}
.toolbar-btn-last {
  margin-right:-15px!important
}
.btn-xs {
  width:25px;
  height:25px;
  font-size:12px;
}
</style>
