<template>
  <v-card>
    <v-card-media v-if="question">
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>질문추가</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn color="default" dark @click="addAnswer()">응답추가</v-btn>
            <v-btn v-if="modifyingIndex==null" color="success" dark @click.native="addQuestion()">질문완성</v-btn>
            <v-btn v-else color="success" dark @click.native="modifyQuestionSuccess()">수정완료</v-btn>
            <v-btn class="toolbar-btn-last" dark flat @click.native="$emit('closeQuestionMaker')">닫기</v-btn>
          </v-toolbar-items>
        </v-toolbar>
         <!-- <v-card-title class="headline">Use Google's location service?</v-card-title>
          <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
   -->
        <v-list>
            <v-subheader>
              <v-text-field v-model="question.question" placeholder="질문 제목을 입력하세요.">
              </v-text-field>
            </v-subheader>
          <v-list-tile height="20px" :key='index' v-for="(item, index) in question.answers">
            {{index+1}})&nbsp;
            <v-text-field
                    color="indigo"
                    height="18px"
                    :label="'응답'+(index+1)"
                    v-model="item.text"
          ></v-text-field>
            <v-btn fab dark small color="indigo" @click="deleteAnswer(index)">&#10005;
            </v-btn>
            <!-- <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title> -->
          </v-list-tile>
            <v-layout row class="ml-3 mr-3" style="height: 36px">
              <v-checkbox class="mr-1 my-auto mb-0" v-model="selectMultipleOptionCounts" label="복수응답가능" value="multiple">
              </v-checkbox>
              <v-select
                height="20px"
                class="v-select-z-index"
                v-if="selectMultipleOptionCounts"
                :items="multipleOptionCounts"
                v-model="question.optionCount"
                type="number"
                label="응답갯수"
              ></v-select>
            </v-layout>
            <v-spacer/>
        </v-list>
  </v-card-media>
  <v-card-actions>
    <v-spacer></v-spacer>

  </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['editingQuestion', 'modifyingIndex'],
  data () {
    return {
      question: undefined,
      selectMultipleOptionCounts: false,
      multipleOptionCounts: [2]
    }
  },
  components: {
  },
  mounted () {
    if (!this.editingQuestion) {
      this.question = {
        question: '',
        answers: [
          { text: '', selected: false },
          { text: '', selected: false },
          { text: '', selected: false }
        ],
        optionCount: 1
      }
    }
  },
  methods: {
    addAnswer: function () {
      this.question.answers.push({ text: '', selected: false })
    },
    deleteAnswer: function (index) {
      if (this.question.answers.length <= 2) {
        alert('두 개 이상의 응답을 입력해야합니다.')
        return
      }
      this.question.answers.splice(index, 1)
    },
    addQuestion: function () {
      if (!this.validateQuestion()) {
        console.log('invalid')
        return false
      }
      console.log('isthereselected', this.question)
      this.$emit('addQuestion', this.question)
    },
    closeQuestionMaker: function () {
      this.$emit('closeQuestionMaker')
    },
    modifyQuestionSuccess: function () {
      if (!this.validateQuestion()) {
        console.log('invalid')
        return false
      }
      this.$emit('modifyQuestionSuccess', this.question)
    },
    validateQuestion: function () {
      if (this.question.question.length < 1) {
        alert('질문을 입력하세요')
        return false
      }
      if (this.question.answers.length < 2) {
        alert('두 개 이상의 응답을 입력하세요.')
        return false
      }

      if (this.selectMultipleOptionCounts) {
        if (this.question.optionCount < 2) {
          alert('복수 응답 갯수를 입력하세요.')
          return
        }
      }

      let answerValid = true
      this.question.answers.some(answer => {
        if (answer.text.length < 1) {
          answerValid = false
        }
      })
      if (!answerValid) {
        alert('응답을 입력해주세요')
      }
      return answerValid
    }
  },
  watch: {
    editingQuestion (to, from) {
      console.log(to, from)
      this.question = to
    },
    question: {
      handler (val) {
        console.log(val)
        let cnt = this.question.answers.length
        let cntArray = []
        for (let i = 1; i < cnt - 1; i++) {
          cntArray.push(i + 1)
        }
        this.multipleOptionCounts = cntArray
      },
      deep: true
    }
  }
}
</script>

<style>
.v-select-z-index {
  z-index:5000;
  width: 50px;
}
</style>
