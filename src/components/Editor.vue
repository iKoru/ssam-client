<template>
    <div>
        <quill-editor v-model="content"
                    ref="editor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
        </quill-editor>
        <div>
            <div id="boardView" v-if="savedContent" v-html="savedContent">
            </div>
            {{link}}
            <link-prevue v-if="link" :linkUrl="link">
            </link-prevue>
        </div>
        <v-btn class="success" @click="post()">업로드테스트</v-btn>
        <image-attachment ref="imageAttachment" @imageAttached="imageAttached"/>
        <attachment/>
    </div>
</template>
<script>

// Import FilePond
import vueFilePond from 'vue-filepond'

// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js'

import LinkPrevue from '@/components/LinkPrevue'
import ImageAttachment from '@/components/ImageAttachment.vue'
import Attachment from '@/components/Attachment'

// Create FilePond component
const ImageFilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)
export default {
  components: {
    LinkPrevue,
    Attachment,
    ImageAttachment
  },
  data () {
    return {
      savedContent: undefined,
      link: undefined,
      content: '',
      editorOption: {
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            handlers: {
              'image': function () {
                attachImage()
              }
            }
          },
          imageDrop: true,
          imageResize: true
        }
      }
    }
  },
  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    },
    post () {
      this.savedContent = localStorage.item = this.content
      this.attachImage();
      // post with saved imagefiles / files
    },
    attachImage() {
      let fileImages = this.$refs.editor.quill.container.querySelectorAll('img')
      this.$refs.imageAttachment.addImages(fileImages)
    },
    imageAttached () {
      console.log('done image')
    }
  },
  computed: {
    editor () {
      return this.$refs.editor.quill
    }
  },
  watch: {
    savedContent (to, from) {
      let href = to.match(/\bhttps?:\/\/\S+/gi)
      if (href) {
        this.link = href[0].substr(0, (href[0]).indexOf('<'))
        console.log(this.link)
      }
    }
  },
  mounted () {
    console.log(this.content)
  }
}
</script>
