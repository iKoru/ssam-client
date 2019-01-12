'use strict'

import Vue from 'vue'
import moment from 'moment'
moment.locale('ko')
Object.defineProperties(Vue.prototype, {
  $moment: {
    get () {
      return moment
    }
  }
})

export default moment
