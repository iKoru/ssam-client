<template>
  <v-layout column class="border-light py-2" v-if="survey">
    <v-flex>
      <v-layout row align-center mx-2>
        <span v-if="onlyView" class="subheading">글 작성 후에 수정/삭제가 불가능합니다.</span>
        <span v-else class="subheading">설문조사</span>
        <v-spacer/>
        <span v-show="finalResults" style="white-space:nowrap;">
          {{survey.participants}}명 참여
        </span>
      </v-layout>
    </v-flex>
    <v-flex v-for="(item, index) in survey.surveyContents.questions" :key="index" class="px-3 pt-2">
      <div id="poll">
        <div class="font-weight-bold body-2 mb-2">{{(index+1) + '. ' + item.title}}<small v-if="item.allowMultipleChoice" class="grey--text lighten-1">(복수응답)</small></div>
        <div class="ans-cnt">
          <div v-for="(choice,answerIndex) in item.choices" :key="answerIndex" class="ans">
            <template v-if="finalResults">
              <div :class="{'ans-voted final multi-row':true, 'selected': choice.selected, 'font-weight-bold':item.mostVotes == choice.votes}">
                <span v-if="choice.percent" class="percent">{{choice.percent}}</span>
                <span class="txt">{{choice.text}}</span>
              </div>
              <span class="bg" :style="{ width: choice.percent }"></span>
            </template>
            <template v-else>
              <div :class="{ 'ans-no-vote multi-row': true, active: choice.selected }" @click="handleVote(index, choice)">
                <span class="txt">{{choice.text}}</span>
              </div>
              <span class="bg"></span>
            </template>
          </div>
        </div>
      </div>
      <v-divider v-if="index + 1 !== survey.surveyContents.questions.length" :key="'divider'+index" class="mt-3"></v-divider>
    </v-flex>
    <v-flex v-if="!survey.participated && !onlyView">
      <v-layout justify-center my-2>
        <v-btn small @click="showSurveyResult = !showSurveyResult">
          {{showSurveyResult? '돌아가기':'결과보기'}}
        </v-btn>
        <v-btn small color="primary" @click="completeSurvey" :disabled="finalResults">응답하기</v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['currentSurvey', 'onlyView'],
  data () {
    return {
      showSurveyResult: false,
      survey: null
    };
  },
  created () {
    this.survey = this.formatSurvey(this.currentSurvey);
  },
  computed: {
    finalResults () {
      return this.survey.participated || this.showSurveyResult
    }
  },
  methods: {
    formatSurvey (survey) {
      let otherAnswers = survey.surveyAnswers
      survey.surveyContents.questions.forEach((q, qIndex) => {
        let objectArray = []
        let max = 0;
        let totalVotes = 0;
        q.choices.forEach((choice, choiceIndex) => {
          if (otherAnswers.length > qIndex) {
            objectArray.push({ 'text': choice, 'selected': false, 'votes': otherAnswers[qIndex][choiceIndex] })
            if (otherAnswers[qIndex][choiceIndex] > max) {
              max = otherAnswers[qIndex][choiceIndex];
            }
            totalVotes += otherAnswers[qIndex][choiceIndex];
          } else {
            objectArray.push({ 'text': choice, 'selected': false, 'votes': 0 })
          }
        })
        q.mostVotes = max
        q.totalVotes = totalVotes
        if (totalVotes === 0) {
          objectArray.forEach(choice => {
            choice.percent = '0%'
          })
        } else {
          // Calculate percent
          objectArray.forEach(choice => {
            choice.percent = !isNaN(choice.votes) && choice.votes > 0 ? (Math.round((parseInt(choice.votes) / totalVotes) * 100)) + '%' : '0%'
          })
        }
        q.choices = objectArray
      })
      return survey
    },
    getAnswerArray (questions) {
      let answers = [];
      questions.forEach(q => {
        if (!q.allowMultipleChoice) {
          answers.push(q.choices.findIndex(c => c.selected))
        } else {
          let answerArray = []
          q.choices.forEach((c, cIndex) => {
            if (c.selected) answerArray.push(cIndex)
          })
          answers.push(answerArray)
        }
      })
      return answers;
    },
    completeSurvey () {
      if (this.survey.surveyContents.questions.every(question => question.choices.some(choice => choice.selected))) {
        if (this.survey.participated) {
          this.$store.dispatch('showSnackbar', { text: '이미 참여한 설문입니다.', color: 'info' });
          return;
        }
        let answer = this.getAnswerArray(this.survey.surveyContents.questions)
        this.$axios
          .post(`/survey`, {
            documentId: this.$route.params.documentId,
            answer: answer
          })
          .then(response => {
            console.log(response);
            if (!response.data.survey) {
              this.$axios
                .get(`/${this.$route.params.boardId}/${this.$route.params.documentId}`)
                .then(response => {
                  this.survey = this.formatSurvey(response.data.survey)
                  console.log(this.survey)
                  this.showSurveyResult = true
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              this.survey = this.formatSurvey(response.data.survey)
              this.showSurveyResult = true
            }
          })
          .catch(error => {
            if (error.response && error.response.status === 409) {
              this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message || '설문 응답을 등록하지 못했습니다.' : '설문 응답을 등록하지 못했습니다.', color: 'info' });
            } else {
              this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message || '설문 응답을 등록하지 못했습니다.' : '설문 응답을 등록하지 못했습니다.', color: 'error' });
            }
          });
      } else {
        this.$store.dispatch('showSnackbar', { text: (this.survey.surveyContents.questions.findIndex(question => !question.choices.some(choice => choice.selected)) + 1) + '번 질문의 응답을 선택해주세요.', color: 'warning' });
      }
    },
    handleVote (questionIndex, a) {
      if (!this.survey.surveyContents.questions[questionIndex].allowMultipleChoice) {
        if (!a.selected) {
          this.survey.surveyContents.questions[questionIndex].choices.forEach(choice => (choice.selected = false))
        }
      }
      a.selected = !a.selected
    }
  }
};
</script>
<style>
#poll .ans-cnt{
  margin: 5px 0;
}
#poll .ans-cnt .ans{
  position: relative;
  border-radius: 8px;
  overflow:hidden;
  margin-top: 8px;
}
#poll .ans-cnt .ans:first-child{
  margin-top: 0;
}

#poll .ans-cnt .ans-no-vote, #poll .ans-cnt .ans-voted{
  background-color: #E1E8ED;
  border-radius: 8px;
  padding: 5px 10px;
}
#poll .ans-cnt .ans-voted .txt,
#poll .ans-cnt .ans-voted .percent{
  z-index: 1;
  position: relative;
}
#poll .ans-cnt .ans-no-vote.active{
  background: #d5d5d5;
}
#poll .ans-cnt .ans-no-vote.active .txt::before{
  content:'✔';
  width: 20px;
  margin-right:4px;
}
#poll .ans-cnt .ans-voted .percent{
  min-width: 44px;
  display: inline-block;
}
#poll .ans-cnt .ans .bg{
  position: absolute;
  width: 0%;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
  background-color: #77C7F7;
  transition: width .3s ease-in-out;
}
</style>
