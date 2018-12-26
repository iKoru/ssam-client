const BoardMixins = {
  methods: {
    formatSurvey (survey, participated) {
      let otherAnswers = survey.surveyAnswers
      survey.surveyContents.questions.forEach((q, qIndex) => {
        console.log(q.choices)
        let objectArray = []
        q.choices.forEach((choice, choiceIndex) => {
          if (otherAnswers.length > 0) {
            objectArray.push({ 'text': choice, 'selected': false, 'votes': otherAnswers[qIndex][choiceIndex] })
          } else {
            objectArray.push({ 'text': choice, 'selected': false, 'votes': 0 })
          }
          // votes need to be updated
        })
        q.choices = objectArray
      })
      survey['participated'] = participated
      return survey
      // return survey.surveyContents.questions.choices.map(choiceString => ({choiceString}))
    }
  }
}

export default BoardMixins
