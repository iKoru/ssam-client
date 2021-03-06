
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import Quill from 'quill'
import MagicUrl from 'quill-magic-url'
import { ImageDrop } from 'quill-image-drop-module'

Quill.debug(process.env.NODE_ENV === 'development' ? 'warn' : 'error')
let BlockEmbed = Quill.import('blots/block/embed')

class VideoBlot extends BlockEmbed {
  static create (url) {
    const node = super.create();
    node.setAttribute('class', 'video-container');
    this.url = url;
    const child = document.createElement('iframe');
    child.setAttribute('src', url);
    child.setAttribute('frameborder', 0);
    child.setAttribute('allowfullscreen', true);
    node.appendChild(child);
    return node;
  }

  static formats (node) {
    // We still need to report unregistered embed formats
    let format = {};
    if (node.hasAttribute('height')) {
      format.height = node.getAttribute('height');
    }
    if (node.hasAttribute('width')) {
      format.width = node.getAttribute('width');
    }
    return format;
  }

  static value (node) {
    return this.url
  }

  format (name, value) {
    // Handle unregistered embed formats
    if (name === 'height' || name === 'width') {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name, value);
      }
    } else {
      super.format(name, value);
    }
  }
}
VideoBlot.blotName = 'video';
VideoBlot.tagName = 'div';
Quill.register(VideoBlot)
Quill.register('modules/magicUrl', MagicUrl)
Quill.register('modules/imageDrop', ImageDrop)

Vue.use(VueQuillEditor)
