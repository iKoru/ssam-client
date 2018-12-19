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
            <v-layout class="float-right" align-center justify-end>
              <button class="ql-image" value="image"></button>
              <v-icon id="attach-button" size="large" color="black" @click="attachButtonClick">mdi-content-save-outline</v-icon>
              <!-- You can also add your own -->
              <v-icon id="survey-button" size="large" color="black" @click="surveyButtonClick">mdi-poll-box</v-icon>
            </v-layout>
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
        <v-layout ref="isAnonymous" row class="ml-3 mr-3" align-center>
          <v-flex xs-4>
            <v-checkbox hide-details class="mr-1 my-auto mb-0" v-model="isAnonymous" label="익명">
            </v-checkbox>
          </v-flex>
          <v-flex xs-4>
            <v-checkbox v-if="!isAnonymous" hide-details class="mr-1 my-auto mb-0" v-model="allowAnonymous" label="익명댓글허용">
            </v-checkbox>
          </v-flex>
          <v-flex xs-12 md-4 text-xs-right>
            <v-layout v-if="survey" align-center justify-end>
              <v-chip label color="pink" @click="surveyButtonClick">
                <v-icon left>mdi-poll-box</v-icon><span style="color:white">설문</span>
              </v-chip>
              <v-icon @click="deleteSurvey">mdi-close</v-icon>
            </v-layout>
          </v-flex>
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
      survey: undefined,
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
      allowAnonymous: true
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
        allowAnonymous: this.allowAnonymous,
        survey: this.survey
      }).then(res => {
        if(res.status === 200) {
          this.$router.push(`/board/${this.$route.params.boardId}/${res.data.documentId}`)
        }
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
      if (this.currentSurvey.questions.length === 0) {
        this.currentSurvey.questions.push(
          {
            title: '',
            allowMultipleChoice: false,
            choices: ['', '']
          }
        )
      } else this.currentSurvey = this.survey
      this.surveyDialog = true
    },
    attachButtonClick () {
      this.$refs.attachment.browseFile()
    },
    extractSurvey (survey) {
      this.survey = survey
      console.log(this.survey)
      this.surveyDialog = false
    },
    closeSurvey () {
      this.surveyDialog = false
    },
    deleteSurvey () {
      if(confirm('설문을 삭제합니다.'))
        this.survey = undefined
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
