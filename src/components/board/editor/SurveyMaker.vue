<template>
<v-card>
  <v-toolbar dark color="indigo">
    <v-toolbar-title>설문조사</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn slot="activator" color="default" @click="dialog=true; initQuestion()">질문추가</v-btn>
      <v-btn color="success" dark @click="extractSurvey">설문완성</v-btn>
      <v-btn class="toolbar-btn-last" dark flat @click.native="$emit('closeSurvey')">닫기</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-layout row>
      <v-flex>
        <v-dialog v-model="dialog" persistent max-width="450">
          <question-maker :editingQuestion="editingQuestion" :modifyingIndex="modifyingIndex" @addQuestion="addQuestion" @modifyQuestionSuccess="modifyQuestionSuccess" @closeQuestionMaker="closeQuestionMaker"/>
        </v-dialog>
        <v-flex xs12>
          <v-layout v-if="questions.length < 1">
            설문을 만들어보세요
          </v-layout>
          <v-list v-else>
            <template v-for="(item, index) in questions">
              <v-layout row wrap :key="'devider'+index" style="position:relative" >
                <v-layout class="fab-container">
                  <v-btn class="btn-xs" fab @click="modifyQuestion(index)">수정</v-btn>
                  <v-btn class="btn-xs" fab @click="deleteQuestion(index)">삭제</v-btn>
                </v-layout>
                <v-flex xs12 mx-3>
                  <vue-poll :questionNumber="item.questionNumber" :key="'poll'+index" :allowMultiple="item.allowMultiple" :question="item.question" :answers="item.answers" :multiple="false" :selectable=false :finalResults=false />
                </v-flex>
              </v-layout>
              <v-layout row :key="index">
              <v-divider v-if="index + 1 < questions.length" :key="`divider-${index}`"></v-divider>
              </v-layout>
            </template>
          </v-list>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
// import VuePoll from 'vue-poll'
import VuePoll from '../VuePoll'
import QuestionMaker from './QuestionMaker'
export default {
  components: {
    QuestionMaker,
    VuePoll
  },
  props: ['currentSurvey', 'surveyDialog'],
  data () {
    return {
      dialog: false,
      questions: this.currentSurvey.questions,
      editingQuestion: undefined,
      modifyingIndex: null
    }
  },
  methods: {
    addQuestion (question) {
      question.questionNumber = this.questions.length + 1
      this.questions.push(question)
      this.dialog = false
      this.initEditingQuestion()
    },
    closeQuestionMaker () {
      this.dialog = false
      this.initEditingQuestion()
    },
    initQuestion () {
      this.editingQuestion = {
        questionNumber: '',
        question: '',
        answers: [
          { text: '', selected: false },
          { text: '', selected: false },
          { text: '', selected: false }
        ],
        allowMultiple: false
      }
    },
    modifyQuestion (index) {
      let newEditingQuestion = {}
      Object.assign(newEditingQuestion, this.questions[index])
      this.editingQuestion = newEditingQuestion
      this.modifyingIndex = index
      this.dialog = true
    },
    deleteQuestion (index) {
      this.questions.splice(index, 1)
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
      console.log(JSON.stringify(this.questions))
      this.$emit('extractSurvey', JSON.stringify({ survey: this.questions }))
    }
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
  margin-right:-16px!important
}
.btn-xs {
  width:25px;
  height:25px;
  font-size:12px;
}
</style>
