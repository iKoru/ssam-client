'use strict'

import Vue from 'vue'
import loadImage from 'blueimp-load-image/js/load-image'
// important to order the following files as is.
import 'blueimp-load-image/js/load-image-orientation'
import 'blueimp-load-image/js/load-image-exif'
import 'blueimp-load-image/js/load-image-exif-map'

Object.defineProperties(Vue.prototype, {
  $loadImage: {
    get () {
      return loadImage
    }
  }
})

export default loadImage
