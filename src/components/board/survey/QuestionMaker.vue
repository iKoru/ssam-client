<template>
  <v-card>
    <v-icon style="
    position: absolute;
    right: -5px;
    z-index: 1000;
    top: -10px;
" color="red" @click="$emit('deleteQuestion', questionIndex)">mdi-close-circle</v-icon>
    <v-card-media v-if="question" >
        <!-- <v-toolbar color="indigo" dark>
          <v-toolbar-title>질문추가</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn color="default" dark @click="addAnswer()">응답추가</v-btn>
            <v-btn v-if="modifyingIndex==null" color="success" dark @click.native="addQuestion()">질문완성</v-btn>
            <v-btn v-else color="success" dark @click.native="modifyQuestionSuccess()">수정완료</v-btn>
            <v-btn class="toolbar-btn-last" dark flat @click.native="$emit('closeQuestionMaker')">닫기</v-btn>
          </v-toolbar-items>
        </v-toolbar> -->
         <!-- <v-card-title class="headline">Use Google's location service?</v-card-title>
          <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
   -->
        <v-list>
            <v-subheader>
              <v-text-field v-model="question.title" placeholder="질문 제목을 입력하세요.">
              </v-text-field>
            </v-subheader>
          <v-list-tile class="px-2 py-0 my-0 custom-reduce-height" :key='index' v-for="(item, index) in question.choices">
            <v-text-field
              class="py-0"
                    single-line
                    :label="'선택지'+(index+1)"
                    v-model="question.choices[index]"
          ></v-text-field>
            <v-icon color="indigo" @click="deleteAnswer(index)">mdi-minus-circle-outline
            </v-icon>
            <!-- <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title> -->
          </v-list-tile>
          <v-list-tile class="px-2 py-0 my-0" style="height:30px!important; margin-top:-20px!important">
            <v-layout row>
              <v-flex xs6 @click="addAnswer()">
                <v-icon color="indigo">mdi-plus-circle-outline</v-icon>
                선택지추가
              </v-flex>
              <v-flex xs6>
                <v-checkbox hide-details v-model="question.allowMultiple" label="복수응답가능" class="mt-0 pt-0">
                </v-checkbox>
              </v-flex>
            </v-layout>
          </v-list-tile>
        </v-list>
    </v-card-media>
  </v-card>
</template>

<script>
export default {
  props: ['editingQuestion', 'questionIndex'],
  data () {
    return {
      question: undefined
    }
  },
  components: {
  },
  mounted () {
    // if (!this.editingQuestion) {
    //   this.question = {
    //     question: '',
    //     answers: [
    //       { text: '', selected: false },
    //       { text: '', selected: false },
    //       { text: '', selected: false }
    //     ],
    //     allowMultiple: false
    //   }
    // }
    this.question = this.editingQuestion
  },
  methods: {
    addAnswer: function () {
      this.question.choices.push('')
    },
    deleteAnswer: function (index) {
      if (this.question.choices.length < 2) {
        alert('응답을 입력하세요')
        return
      }
      this.question.choices.splice(index, 1)
    },
    // addQuestion: function () {
    //   if (!this.validateQuestion()) {
    //     console.log('invalid')
    //     return false
    //   }
    //   console.log('isthereselected', this.question)
    //   this.$emit('addQuestion', this.question)
    // },
    // closeQuestionMaker: function () {
    //   this.$emit('closeQuestionMaker')
    // },
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
      this.question.answers = this.question.answers.filter(function (item) {
        return item.text.length > 0
      })
      if (this.question.answers.length < 2) return false
      return true
    }
  },
  watch: {
    editingQuestion (to, from) {
      console.log(to, from)
      this.question = to
    }
  }
}
</script>

<style scoped>
.v-select-z-index {
  z-index:5000;
  width: 50px;
}
.custom-reduce-height {
  margin-top: -5px!important
}
</style>
