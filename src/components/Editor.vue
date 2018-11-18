<template>
    <div>
        <quill-editor v-model="content"
                    ref="editor"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)">
          <div id="toolbar" slot="toolbar">
            <!-- Add a bold button -->
            <button class="ql-bold">Bold</button>
            <button class="ql-italic">Italic</button>
            <!-- Add font size dropdown -->
            <select class="ql-size">
              <option value="small"></option>
              <!-- Note a missing, thus falsy value, is used to reset to default -->
              <option selected></option>
              <option value="large"></option>
              <option value="huge"></option>
            </select>
            <select class="ql-font">
              <option selected="selected"></option>
              <option value="serif"></option>
              <option value="monospace"></option>
            </select>

            <!-- Add subscript and superscript buttons -->
            <button class="ql-script" value="sub"></button>
            <button class="ql-script" value="super"></button>
            <button class="ql-image" value="super"></button>
            <!-- You can also add your own -->
            <button id="survey-button" @click="surveyButtonClick">설문조사</button>
          </div>
        </quill-editor>
        <div>
            <div id="boardView" v-if="savedContent" v-html="savedContent">
            </div>
            {{link}}
            <link-prevue v-if="link" :linkUrl="link">
            </link-prevue>
        </div>
        <!-- <image-attachment ref="imageAttachment" @imageAttached="imageAttached"/> -->
        <div>{{savedContent}}</div>
        <attachment ref="attachment" @imageAttached="imageAttached"/>

        <v-dialog v-model="surveyDialog" max-width="500px" transition="dialog-bottom-transition" persistent>
          <survey-maker @closeSurvey="closeSurvey" @extractSurvey="extractSurvey" :currentSurvey="currentSurvey"/>
        </v-dialog>
        <div v-if="surveyJSON">설문조사가 추가되었습니다.
            <v-btn class="primary" @click="surveyDialog = true">설문확인</v-btn>
          <!-- <v-btn @click="openSurvey">확인하기</v-btn> -->
        </div>
        <v-btn class="success" @click="post()">업로드</v-btn>
        <!-- <div>viewer
          {{surveyJSON}}
          <survey :surveyJSON="surveyJSON"/>
        </div> -->
    </div>
</template>
<script>

// Import FilePond
import vueFilePond from 'vue-filepond'

// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js'
import Survey from '@/components/Survey'
import SurveyMaker from '@/components/SurveyMaker'
import LinkPrevue from '@/components/LinkPrevue'
import Attachment from '@/components/Attachment'
// Create FilePond component
export default {
  components: {
    LinkPrevue,
    Attachment,
    SurveyMaker,
    Survey
  },
  data () {
    return {
      savedContent: undefined,
      link: undefined,
      content: '',
      surveyJSON: undefined,
      surveyDialog: false,
      currentSurvey: { questions: [] },
      editorOption: {
        modules: {
          toolbar: '#toolbar',
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
      this.attachImage()
      // post with saved imagefiles / files
    },
    attachImage () {
      this.imageCount = this.$refs.editor.quill.editor.delta.ops.filter(item => item.insert.hasOwnProperty('image')).length
      this.$refs.editor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty('image')) {
          console.log(item)
          let src = item.insert.image
          this.$refs.attachment.addImage(src).then(file=> {
            this.embedImage(item, src);
          }).catch(err=> {
            console.log(err)
          })
        }
      })
    },
    imageAttached () {
      this.embedImages()
      console.log(this.$refs.editor.quill.editor.delta)
      // this.preprocessUpload.attachImages = true
    },
    embedImage (deltaOps, src) {
      console.log(deltaOps)
      deltaOps.insert.image = 'https://snulife.com/layouts/sejin7940_layout_snulife/images/main_logo_static.gif'
      this.$refs.editor.quill.setContents([deltaOps])
      let newDeltaOps = []
      this.$refs.editor.quill.editor.delta.ops.forEach(item => {
        newDeltaOps.push(item)
      })
      this.$refs.editor.quill.setContents(newDeltaOps)
      console.log(this.$refs.editor.quill.editor.delta.ops)
    },
    embedImages () {
      console.log(this.$refs.editor.quill.editor)
      this.$refs.imageAttachment.addImage(fileImages)
      const range = this.$refs.editor.quill.getSelection(true)
      fileImages.forEach(image => {
        console.log(image)
        image.src = ''
        this.$refs.editor.quill.enable(true)
        this.$refs.editor.quill.editor.insertEmbed(range.index, 'image', 'https://snulife.com/layouts/sejin7940_layout_snulife/images/main_logo_static.gif')
        this.$refs.editor.quill.setSelection(range.index + 1, Quill.sources.SILENT)
        console.log(this.$refs.editor.quill.editor.delta)
      })
    },
    surveyButtonClick () {
      this.surveyDialog = true
    },
    extractSurvey (surveyJSON) {
      console.log(surveyJSON)
      this.surveyJSON = surveyJSON
      this.surveyDialog = false
    },
    openSurvey () {
      this.currentSurvey = JSON.parse(this.surveyJSON)
      this.surveyDialog = true
    },
    closeSurvey () {
      this.surveyDialog = false
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
  }
}
</script>
<style>

#survey-button {
  width: 75px;
}
</style>
