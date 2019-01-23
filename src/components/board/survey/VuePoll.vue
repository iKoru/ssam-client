<template>
  <div class="vue-poll">
    <div class="font-weight-bold subheading mb-2">{{question}}<small v-if="allowMultiple" class="grey--text lighten-1">(복수응답)</small></div>
    <div class="ans-cnt">
      <div v-for="(a,index) in calcAnswers" :key="index" class="ans">
        <template v-if="finalResults">
          <div :class="{'ans-voted final':true, 'selected': a.selected, 'font-weight-bold':mostVotes == a.votes}">
            <span v-if="a.percent" class="percent">{{a.percent}}</span>
            <span class="txt">{{a.text}}</span>
          </div>
          <span :class="{ bg: true }" :style="{ width: a.percent }"></span>
        </template>
        <template v-else>
          <div v-if="visibleResults" :class="{ 'ans-voted': true, selected: a.selected }" >
            <span v-if="a.percent" class="percent">{{a.percent}}</span>
            <span class="txt">{{a.text}}</span>
          </div>
          <div v-else :class="{ 'ans-no-vote': true, active: a.selected }" @click.prevent="handleVote(a)">
            <span class="txt">{{a.text}}</span>
          </div>
          <span class="bg" :style="{ width: visibleResults ? a.percent : '0%' }"></span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

export default{
  name: 'VuePoll',
  props: {
    questionCompleted: {
      type: Boolean,
      default: false
    },
    questionNumber: {
      type: Number,
      required: true
    },
    allowMultiple: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    answers: {
      type: Array,
      required: true
    },
    showResults: {
      type: Boolean,
      default: false
    },
    finalResults: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    submitButtonText: {
      type: String,
      default: 'Submit'
    },
    customId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      visibleResults: JSON.parse(this.showResults)
    }
  },
  computed: {
    totalVotes () {
      let totalVotes = 0
      this.answers.filter(a => {
        if (!isNaN(a.votes) && a.votes > 0) { totalVotes += parseInt(a.votes) }
      })
      return totalVotes
    },
    mostVotes () {
      let max = 0
      this.answers.filter(a => {
        if (!isNaN(a.votes) && a.votes > 0 && a.votes >= max) { max = a.votes }
      })

      return max
    },
    calcAnswers () {
      if (this.totalVotes === 0) {
        return this.answers.map(a => {
          a.percent = '0%'
          return a
        })
      }
      
      // Calculate percent
      return this.answers.filter(a => {
        if (!isNaN(a.votes) && a.votes > 0) { a.percent = (Math.round((parseInt(a.votes) / this.totalVotes) * 100)) + '%' } else { a.percent = '0%' }

        return a
      })
    },
    totalSelections () {
      return this.calcAnswers.filter(a => a.selected).length
    }
  },
  watch: {
    questionCompleted: function (to, from) {
      if (!this.finishSurvey()) {
        this.$emit('surveyNotCompleted', this.questionNumber)
      }
    }
  },
  methods: {
    initSelectedAnswer () {
      this.answers.forEach(function (answer) {
        answer.selected = false
      })
    },
    finishSurvey () {
      if (this.totalSelections === 0) {
        return false
      }
      this.handleMultiple()
      this.finalResults = true
    },
    handleMultiple () {
      let arSelected = []
      this.calcAnswers.filter(a => {
        if (a.selected) {
          a.votes++
          arSelected.push({ value: a.value, votes: a.votes })
        }
      })
      console.log(this.calcAnswers)

      this.visibleResults = true

      let obj = { questionNumber: this.questionNumber, arSelected: arSelected, totalVotes: this.totalVotes }

      // let obj = { questionNumber:this.questionNumber, value: a.value, votes: a.votes, totalVotes: this.totalVotes }

      if (this.customId) { obj.customId = this.customId }

      this.$emit('addvote', obj)
    },
    handleVote (a) { // Callback
      if (!this.selectable) {
        return
      }
      if (this.multiple) {
        if (a.selected === undefined) { console.log("Please add 'selected: false' on the answer object") }
        if (!this.allowMultiple && this.totalSelections === 1) {
          if (!a.selected) {
            this.initSelectedAnswer()
          }
        }
        a.selected = !a.selected
        // if selected any answer, alert Answered
        if (this.totalSelections > 0) {
          this.$emit('answerSelected', [this.questionNumber, true])
        } else {
          this.$emit('answerSelected', [this.questionNumber, false])
        }
      }
      
      // a.votes++
      // a.selected = true

      // this.visibleResults = true

      // let obj = { questionNumber:this.questionNumber, value: a.value, votes: a.votes, totalVotes: this.totalVotes }

      // if (this.customId) { obj.customId = this.customId }
      // this.$emit('addvote', obj)
    }
  }
}

</script>

<style>
.vue-poll .ans-cnt{
  margin: 5px 0;
}
.vue-poll .ans-cnt .ans{
  position: relative;
  border-radius: 5px;
  overflow:hidden;
  margin-top: 10px;
}
.vue-poll .ans-cnt .ans:first-child{
  margin-top: 0;
}

.vue-poll .ans-cnt .ans-no-vote, .vue-poll .ans-cnt .final{
  background-color: #E1E8ED;
  border-radius: 5px;
  cursor:pointer;
  padding: 5px 0;
  /*transition: background .5s ease-in-out;*/
}


.vue-poll .ans-cnt .ans-no-vote .txt{
  margin-left:10px;
}

.vue-poll .ans-cnt .ans-no-vote.active{
  background: #d5d5d5;
}
.vue-poll .ans-cnt .ans-no-vote.active .txt::before{
  content:'✔';
  width: 20px;
  margin-right:4px;
}

.vue-poll .ans-cnt .ans-voted{
  padding: 5px 0;
}

.vue-poll .ans-cnt .ans-voted .percent,
.vue-poll .ans-cnt .ans-voted .txt{
  position: relative;
  z-index: 1;
}
.vue-poll .ans-cnt .ans-voted .percent{
  min-width: 44px;
  display: inline-block;
  margin-left:8px;
}

.vue-poll .ans-cnt .ans-voted.selected .check:after{
  content:'✔';
}

.vue-poll .ans-cnt .ans .bg{
  position: absolute;
  width: 0%;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
  background-color: #77C7F7;
  transition: width .3s cubic-bezier(0.5,1.2,.5,1.2);
}

</style>
