<template>
<v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-title>질문추가</v-toolbar-title>
        </v-toolbar>
        <v-list two-line>
            <v-subheader>질문
            </v-subheader>
          <v-list-tile :key='index' v-for="(item, index) in question.answers">
            {{index+1}})&nbsp;
            <v-text-field
                    placeholder="응답을 입력해주세요"
                    v-model="item.text"
                    solo
          ></v-text-field>
            <v-btn fab dark small color="indigo" @click="deleteAnswer(index)">
                X
            </v-btn>
            <!-- <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title> -->
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-btn color="success" @click="addAnswer()">응답추가</v-btn>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
                <v-checkbox v-model="question.option" label="복수응답가능" value="multiple"></v-checkbox>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      question: {
        title: 'question',
        answers: [
          { text: 'answer1' },
          { text: 'answer2' },
          { text: 'answer3' },
          { text: 'answer4' }
        ],
        option: []
      }
    }
  },
  components: {
  },
  methods: {
    addAnswer: function () {
      this.question.answers.push({ text: '' })
    },
    deleteAnswer: function (index) {
      this.question.answers.splice(index, 1)
    }
  },
  mounted () {
  }
}
</script>
