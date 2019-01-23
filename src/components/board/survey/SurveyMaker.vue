<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>설문조사</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="toolbar-btn-last" @click="$emit('closeSurvey')" icon><v-icon>close</v-icon></v-btn>
    </v-toolbar>
    <v-card-text>
      <v-layout column>
        <div class="border-light" id="surveyMaker">
          <v-flex :key="index" v-for="(question, index) in currentSurvey.questions">
            <v-card flat>
              <v-card-title class="pb-1">
                {{index + 1}}.
                <v-text-field v-model="question.title" single-line hide-details dense class="dense mt-0 pt-0 ml-2" placeholder="질문 내용" append-outer-icon="close" @click:append-outer="deleteQuestion(index)"></v-text-field>
              </v-card-title>
              <v-card-text class="py-0">
                <v-layout column>
                  <v-flex :key="answerIndex" v-for="(choice, answerIndex) in question.choices" class="mt-2">
                    <v-text-field class="pt-1 dense" box single-line :placeholder="'선택지'+(answerIndex+1)" v-model="question.choices[answerIndex]" hide-details append-icon="remove_circle_outline" @click:append="deleteAnswer(index, answerIndex)"></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-layout row align-center justify-space-around>
                      <v-flex text-xs-center>
                        <v-btn flat @click="addAnswer(index)">
                          <v-icon small class="mr-1">add_circle_outline</v-icon>선택지 추가
                        </v-btn>
                      </v-flex>
                      <v-flex text-xs-center>
                        <v-checkbox hide-details v-model="question.allowMultipleChoice" label="복수응답 허용" class="mt-0 pt-0"></v-checkbox>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
            <v-divider class="mx-4" v-if="index !== currentSurvey.questions.length - 1"/>
          </v-flex>
        </div>
        <v-flex>
          <v-btn block @click="pushQuestion">
            <v-icon>playlist_add</v-icon><v-label size="24">질문추가</v-label>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions class="align-start">
      <v-spacer/>
      <v-btn color="error" depressed @click="$emit('deleteSurvey')">설문 삭제</v-btn>
      <v-btn color="primary" depressed @click="extractSurvey">저장</v-btn>
    </v-card-actions>     
  </v-card>
</template>

<script>
export default {
  props: ['survey', 'surveyDialog'],
  data () {
    return {
      currentSurvey:{}
    }
  },
  methods: {
    addAnswer: function (questionIndex) {
      this.currentSurvey.questions[questionIndex].choices.push('')
    },
    deleteAnswer: function (questionIndex, answerIndex) {
      if (this.currentSurvey.questions[questionIndex].choices.length < 3) {
        if(this.currentSurvey.questions[questionIndex].choices[answerIndex] && this.currentSurvey.questions[questionIndex].choices[answerIndex].length > 0){
          this.currentSurvey.questions[questionIndex].choices[answerIndex] = '';
          this.$forceUpdate();
        }else{
          this.$store.dispatch('showSnackbar', {text:'선택지는 2개 이상이어야 합니다.', color:'info'})
        }
      }else{
        this.currentSurvey.questions[questionIndex].choices.splice(answerIndex, 1)
      }
    },
    pushQuestion () {
      this.currentSurvey.questions.push({title: '', allowMultipleChoice: false, choices: ['', '']})
    },
    deleteQuestion (index) {
      if(this.currentSurvey.questions.length === 1) {
        if((this.currentSurvey.questions[index].title && this.currentSurvey.questions[index].title.length > 0) || (this.currentSurvey.questions[index].choices.some(choice => choice && choice.length > 0))){
          this.currentSurvey.questions.splice(index, 1)
          this.currentSurvey.questions.push({title: '', allowMultipleChoice: false, choices: ['', '']})
        }else{
          this.$store.dispatch('showSnackbar', {text:'최소 하나 이상의 질문을 입력해주세요', color:'warning'})
        }
      } else {
        this.currentSurvey.questions.splice(index, 1)
      }
    },
    extractSurvey () {
      let i=0;
      while(i<this.currentSurvey.questions.length){
        if(this.currentSurvey.questions[i].title && this.currentSurvey.questions[i].title.length > 0){
          if(this.currentSurvey.questions[i].choices.filter(choice => choice && choice.length > 0).length > 1){//safe
            this.currentSurvey.questions[i].choices = this.currentSurvey.questions[i].choices.filter(choice => choice && choice.length > 0);
          }else{
            this.$store.dispatch('showSnackbar', {text:(i+1)+'번째 질문의 응답을 2개 이상으로 입력해주세요.', color:'info'})
            return;
          }
        }else{
          if(this.currentSurvey.questions[i].choices.some(choice => choice && choice.length > 0)){
            this.$store.dispatch('showSnackbar', {text:(i+1)+'번째 질문의 제목을 입력해주세요.', color:'info'});
            return;
          }else{
            this.currentSurvey.questions.splice(i, 1);
            continue;
          }
        }
        i++;
      }
      if(i === 0){
        this.$store.dispatch('showSnackbar', {text:'질문을 1개 이상 입력해주세요.', color:'warning'})
        return;
      }
      this.$emit('extractSurvey', this.currentSurvey)
    }
  },
  watch:{
    survey:{
      handler(to){
        this.currentSurvey = to;
      },
      deep:true,
      immediate:true
    }
  }
}
</script>
<style>
#surveyMaker .v-text-field--box.v-text-field--single-line input{
  margin-top:4px;
}
#surveyMaker .v-text-field--box > .v-input__control > .v-input__slot{
  min-height:36px;
}
#surveyMaker .v-text-field.v-text-field--enclosed .v-input__append-inner{
  margin-top:8px;
}
</style>
