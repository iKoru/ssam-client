<template>
    <v-layout column>
        <v-flex
            style="margin-botom: 0; padding-bottom: 0;">
          <v-text-field
            label="Solo"
            placeholder="제목"
            solo
            v-model="title"
            hide-details
          ></v-text-field>
        </v-flex>
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
            <div class="float-right">
              <button class="ql-image" value="image"></button>
              <v-icon id="attach-button" size="medium" color="black" @click="attachButtonClick">mdi-content-save-outline</v-icon>
              <!-- You can also add your own -->
              <v-icon id="survey-button" size="medium" color="black" @click="surveyButtonClick">mdi-poll-box</v-icon>
            </div>
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
        <Attachment ref="attachment" @imageAttached="imageAttached"/>

        <v-dialog v-model="surveyDialog" max-width="500px" transition="dialog-bottom-transition" persistent>
          <survey-maker @closeSurvey="closeSurvey" @extractSurvey="extractSurvey" :currentSurvey="currentSurvey"/>
        </v-dialog>
        <div v-if="surveyJSON">설문조사가 추가되었습니다.
            <v-btn class="primary" @click="surveyDialog = true">설문확인</v-btn>
          <!-- <v-btn @click="openSurvey">확인하기</v-btn> -->
        </div>

        <v-layout ref="isAnonymous" row class="ml-3 mr-3">
          <v-checkbox class="mr-1 my-auto mb-0" v-model="isAnonymous" label="익명">
          </v-checkbox>
          <v-checkbox v-if="!isAnonymous" class="mr-1 my-auto mb-0" v-model="allowAnonymous" label="익명댓글허용">
          </v-checkbox>
        </v-layout>
        <v-btn class="success" @click="post()">업로드</v-btn>
        <!-- <div>viewer
          {{surveyJSON}}
          <survey :surveyJSON="surveyJSON"/>
        </div> -->
    </v-layout>
</template>
<script>

// Import FilePond
// import vueFilePond from 'vue-filepond'

// Import plugins
import Survey from '@/components/board/survey/Survey'
import SurveyMaker from '@/components/board/survey/SurveyMaker'
import Attachment from '@/components/board/editor/Attachment'
// Create FilePond component
export default {
  name: 'Editor',
  components: {
    Attachment,
    SurveyMaker,
    Survey
  },
  data () {
    return {
      savedContent: undefined,
      link: undefined,
      title: null,
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
      },
      isAnonymous: false,
      allowAnonymous: false
    }
  },
  // manually control the data synchronization
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
      console.log(this.$route.params.boardId)
      console.log('post document')

      this.$axios.post('/document', {
        boardId: this.$route.params.boardId,
        title: this.title,
        contents: this.content,
        isAnonymous: this.isAnonymous,
        allowAnonymous: this.allowAnonymous
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        console.log(err.response)
      })
      // post with saved imagefiles / files
    },
    attachImage () {
      this.imageCount = this.$refs.editor.quill.editor.delta.ops.filter(item => item.insert.hasOwnProperty('image')).length
      this.$refs.editor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty('image')) {
          console.log(item)
          let src = item.insert.image
          this.$refs.attachment.addImage(src).then(file => {
            this.embedImage(item, src)
          }).catch(err => {
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
      // console.log(this.$refs.editor.quill.editor)
      // this.$refs.imageAttachment.addImage(fileImages)
      // const range = this.$refs.editor.quill.getSelection(true)
      // fileImages.forEach(image => {
      //   console.log(image)
      //   image.src = ''
      //   this.$refs.editor.quill.enable(true)
      //   this.$refs.editor.quill.editor.insertEmbed(range.index, 'image', 'https://snulife.com/layouts/sejin7940_layout_snulife/images/main_logo_static.gif')
      //   this.$refs.editor.quill.setSelection(range.index + 1, Quill.sources.SILENT)
      //   console.log(this.$refs.editor.quill.editor.delta)
      // })
    },
    surveyButtonClick () {
      this.surveyDialog = true
    },
    attachButtonClick () {
      this.$refs.attachment.browseFile()
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
    'isAnonymous': {
      handler: function (to) {
        if (this.isAnonymous) this.allowAnonymous = false
      }
    }
  },
  mounted () {
    document.addEventListener('FilePond:loaded', e => {
      console.log('FilePond ready for use', e.detail)
    })
  }
}
</script>
<style>

#survey-button {
  width: 28px;
}
#attach-button {
  width: 28px;
}
.ql-container {
  height: 400px;
}

</style>
