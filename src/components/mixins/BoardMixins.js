import moment from 'moment'
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
    },

    uuid() {
      let partialUUID = () => {
          return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
      };
      return partialUUID() + partialUUID() + '-' + partialUUID() + '-' + partialUUID() + '-' + partialUUID() + '-' + partialUUID() + partialUUID() + partialUUID()
    },
    dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
      else
          byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      console.log(dataURI)

      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], {type:mimeString});
    },
    timeParser(timestamp) {
      let time = moment(timestamp, "YYYYMMDDHHmmss").format("YYYY.MM.DD HH:mm:ss")
        console.log(moment(time).fromNow())
        moment.locale('ko')
        return moment(time).fromNow()
    }
  }
}

export default BoardMixins
