'use strict'

import Vue from 'vue'
import loadImage from 'blueimp-load-image/js/load-image'

import 'blueimp-load-image/js/load-image-orientation'

Object.defineProperties(Vue.prototype, {
  $loadImage: {
    get () {
      return loadImage
    }
  }
})

export default loadImage
