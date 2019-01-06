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
                    @ready="onEditorReady($event)">
                    <!-- @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"-->
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
            <v-layout align-center justify-end>
              <button class="ql-image" value="image"></button>사진
              <!-- You can also add your own -->
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
        <!-- <Attachment ref="attachment" @imageAttached="imageAttached" @fileAttached="fileAttached" @fileRemoved="fileREmoved"/> -->
        <v-dialog v-model="surveyDialog" max-width="500px" transition="dialog-bottom-transition" persistent>
          <survey-maker @closeSurvey="closeSurvey" @extractSurvey="extractSurvey" :currentSurvey="currentSurvey"/>
        </v-dialog>
        <v-layout pt-1 justify-center>
          <v-flex my-auto xs12 sm1 text-xs-right>
            <v-icon id="survey-button" size="large" color="black">mdi-poll-box</v-icon>설문조사
          </v-flex>
          <v-flex pl-4>
            <v-btn size="small" @click="surveyButtonClick">{{survey?'확인/수정':'추가하기'}}</v-btn>
            <span v-if="survey">설문조사가 추가되었습니다.</span>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex v-if="survey">
            <v-btn class="float-right" size="small" @click="deleteSurvey">삭제하기</v-btn>
          </v-flex>
        </v-layout>
        <v-layout pt-1 justify-center>
          <v-flex my-auto xs12 sm1 text-xs-right>
            <v-icon id="attach-button" size="large" color="black">mdi-content-save-outline</v-icon>파일첨부
          </v-flex>
          <v-flex pl-4>
            <v-btn size="small" @click="attachButtonClick">파일업로드</v-btn>
            <span>{{attachedFilenames}}</span>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex v-if="survey">
            <v-btn class="float-right" size="small" @click="deleteSurvey">삭제하기</v-btn>
          </v-flex>
        </v-layout>
        <v-dialog>
          <file-pond
            name="attachment"
            ref="pond"
            instantUpload="false"
            allow-multiple="true"
            accepted-file-types="application/zip, application/x-hwp, application/pdf, image/jpeg, image/png, image/jpg"
            :server="server"
            @addfile="handleFilePondAddFile"
            @removefile="handleFilePondRemoveFile"
            v-on:init="handleFilePondInit"
          />
        </v-dialog>
        <!-- <button @click="manualUpload">수동업로드</button> -->
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

import vueFilePond, { setOptions } from 'vue-filepond'

// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js'

const FilePond = vueFilePond(FilePondPluginFileValidateType)
setOptions({
  labelIdle: ''
});
export default {
  name: 'Editor',
  components: {
    SurveyMaker,
    Survey,
    FilePond
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
      allowAnonymous: true,
      attachedFilenames: [],
      attachedFiles: [],
      attachedImages: [],
      formData: undefined,
      attachedFileNumber: 0,
      server: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          // const formData = new FormData();
          // // formdata 는 계속 append
          // console.log(this.attachedImages, this.attachedFilenames)
          // console.log(file.filename)
          if (!this.formData) this.formData = new FormData()
          if (this.attachedImages.includes(file.name)) {
            this.formData.append('attach', file, file.name);
            this.attachedFileNumber += 1;
          } else if (this.attachedFilenames.includes(file.name)) {
            this.formData.append('attach', file, file.name);
            this.attachedFileNumber += 1;
          }
          if (this.attachedFileNumber === this.attachedFilenames.length) {
            this.formData.append('boardId', this.$route.params.boardId)
            this.formData.append('title', this.title)
            this.formData.append('contents', this.content) // to delta
            this.formData.append('isAnonymous', this.isAnonymous)
            this.formData.append('allowAnonymous', this.allowAnonymous)
            if(this.survey) {
              this.formData.append('survey', this.survey)
            }

            this.$axios
              .post('/document', this.formData)
              .then(response => {
                // this.profile.picturePath = response.data.picturePath;
                // this.dialog = false;
                // this.$store.dispatch("updateProfile", {picturePath: this.profile.picturePath});
                console.log(response)
                load();
              })
              .catch(error => {
                delete this.formData
                this.attachedFileNumber = 0
                abort();
                console.log(error.response)
                // this.$store.dispatch("showSnackbar", {text: `${error.response ? error.response.data.message : "프로필 이미지를 업로드하지 못했습니다."}`, color: "error"});
              });
          }
          return { load, error, progress, abort };
        }
      }
    }
  },
  // manually control the data synchronization
  methods: {
    // onEditorBlur (quill) {
    //   console.log('editor blur!', quill)
    // },
    // onEditorFocus (quill) {
    //   console.log('editor focus!', quill)
    // },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    },
    post () {
      // manually add images as file
      this.attachImage()
        .then(files => {
          this.attachedImages = files.map(file => file.filename)
          // console.log(this.$refs.editor.quill.editor.delta.ops)
          if (this.attachedImages.length === 0 && this.attachedFilenames.length === 0) {
            this.$axios.post('/document', {
              boardId: this.$route.params.boardId,
              title: this.title,
              contents: this.content, // delta
              isAnonymous: this.isAnonymous,
              allowAnonymous: this.allowAnonymous,
              survey: this.survey
            }).then(res => {
              if (res.status === 200) {
                this.$router.push(`/${this.$route.params.boardId}/${res.data.documentId}`)
              }
              console.log(res)
            }).catch(err => {
              console.log(err.response)
            })
          } else {
            this.handleProcessFile()
          }
        })
        .catch(err => {
          // failed in parse images to attached files
          console.log(err)
        })
    },

    handleFilePondInit: function () {
      console.log('FilePond has initialized')

      // example of instance method call on pond reference
      this.$refs.pond.getFiles()
    },
    handleFilePondAddFile: function (error, file) {
      console.log(error)
      this.attachedFilenames.push(file.filename)
      console.log(this.attachedFilenames)
    },
    handleFilePondRemoveFile: function (file) {
      this.attachedFilenames = this.attachedFilenames.filter(filename => file.filename !== filename)
    },
    handleProcessFile: function () {
      this.$refs.pond.processFiles()
        .then(files => {
          // go to read
        })
        .catch(err =>
          console.log(err.response)
        )
    },
    attachImage () {
      this.imageCount = this.$refs.editor.quill.editor.delta.ops.filter(item => item.insert.hasOwnProperty('image')).length
      let imageSrc = []
      this.$refs.editor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty('image')) {
          // random generated uuid should given here
          let imgSrc = item.insert.image
          item.insert.image = 'https://snulife.com/layouts/sejin7940_layout_snulife/images/main_logo_static.gif'
          imageSrc.push(imgSrc)
        }
      })
      return this.$refs.pond.addFiles(imageSrc)
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
      this.$refs.pond.browse()
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
      if (confirm('설문을 삭제합니다.')) { this.survey = undefined }
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
.ql-editor {
  height:400px !important;
}
.ql-container {
  height: 400px;
}
</style>
