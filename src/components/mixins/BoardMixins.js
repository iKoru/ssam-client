import moment from 'moment'
const BoardMixins = {
  data () {
    return {
      boardTypeItems: {
        T: '토픽',
        L: '라운지',
        D: '아카이브',
        X: '게시판',
        E: '전직교사',
        N: '예비교사'
      },
      webUrl: process.env.VUE_APP_WEB_URL
    }
  },
  methods: {
    uuid () {
      let partialUUID = () => {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
      };
      return partialUUID() + partialUUID() + '-' + partialUUID() + '-' + partialUUID() + '-' + partialUUID() + '-' + partialUUID() + partialUUID() + partialUUID()
    },
    dataURItoBlob (dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
      } else {
        byteString = unescape(dataURI.split(',')[1]);
      }

      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    },
    timeParser (timestamp) {
      return moment(timestamp, 'YYYYMMDDHHmmss').fromNow()
    }
  }
}

export default BoardMixins
