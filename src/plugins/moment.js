'use strict'

import Vue from 'vue'
import moment from 'moment'

Object.defineProperties(Vue.prototype, {
  $moment: {
    get () {
      return moment
    }
  }
})

export default moment
