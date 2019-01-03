'use strict'

import Vue from 'vue'
import timeago from 'vue-timeago'

Vue.use(timeago, {
  locale: 'ko',
  locales: {
    'ko': require('date-fns/locale/ko')
  }
})

export default timeago