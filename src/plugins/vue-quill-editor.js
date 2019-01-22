
import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// filepond
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import Quill from 'quill'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'

let BlockEmbed = Quill.import('blots/block/embed')
class ImageBlot extends BlockEmbed {
    static create(value) {
        let node = super.create();
        console.log(value)
        node.setAttribute('alt', value.alt);
        node.setAttribute('src', value.src);
        node.setAttribute('download', value.src);
        return node;
      }
    
    static value(node) {
        return {
            alt: node.getAttribute('alt'),
            src: node.getAttribute('src'),
            download: node.getAttribute('download')
        };
    }
}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot);
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

Vue.use(VueQuillEditor)
