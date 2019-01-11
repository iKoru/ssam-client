<template>
    <v-layout column>
        <v-flex
            style="margin-bottom: 0; padding-bottom: 0;">
          <v-text-field
            label="Solo"
            placeholder="제목"
            solo
            v-model="title"
            hide-details
          ></v-text-field>
        </v-flex>
        <quill-editor
                    v-model="content"
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
            <button ref="imageAttach" class="ql-image" value="image"></button>
          </div>
        </quill-editor>
        <!-- <image-attachment ref="imageAttachment" @imageAttached="imageAttached"/> -->
        <div>{{savedContent}}</div>
        <!-- <Attachment ref="attachment" @imageAttached="imageAttached" @fileAttached="fileAttached" @fileRemoved="fileREmoved"/> -->
        <v-dialog v-model="surveyDialog" max-width="500px" transition="dialog-bottom-transition" persistent>
          <survey-maker @deleteSurvey="deleteSurvey" @closeSurvey="closeSurvey" @extractSurvey="extractSurvey" :currentSurvey="currentSurvey"/>
        </v-dialog>
        
        <v-layout pt-1 justify-center>
          <v-flex xs4 sm2 px-1 text-xs-center>
            <v-btn size="small" block @click="surveyButtonClick" :color="survey?'indigo':'default'">
              <v-icon id="survey-button" size="large" color="black">mdi-poll-box</v-icon>설문조사
            </v-btn>
          </v-flex>
          <v-flex xs4 sm2 px-1>
            <v-btn size="small" block @click="$refs.imageAttach.click()">
             <v-icon id="attach-button" size="large" color="black">mdi-image</v-icon>이미지
            </v-btn>
          </v-flex>
          <v-flex xs4 sm2 px-1>
            <v-btn size="small" block @click="attachButtonClick">
             <v-icon id="attach-button" size="large" color="black">mdi-content-save-outline</v-icon>파일첨부
            </v-btn>
          </v-flex>
          <v-spacer/>
        </v-layout>
        <v-layout>
        <v-flex xs12 sm6>
           <v-list v-if="attachedFilenames.length>0">
            <template v-for="(item, index) in attachedFilenames">
              <v-list-tile :key="index">
                <v-list-tile-content>
                  <v-list-tile-sub-title v-html="item"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn color="white" @click="removeFile(item)">파일삭제</v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
        </v-list>
          <!-- <v-list v-if="attachedFilenames.length>0">
            <v-list-tile :key="index" v-for="(item, index) in attachedFilenames">
              <v-list-tile-content>
                <v-list-tile-sub-title v-html="item"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn color="white" @click="removeFile(item)">파일삭제</v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list> -->
        </v-flex>
        </v-layout>
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
        <v-layout py-2 justify-center>
          <v-flex pl-4 ml-1 xs4 sm2>
            <v-checkbox hide-details class="mr-1 my-auto mb-0" v-model="isAnonymous" label="익명">
            </v-checkbox>
          </v-flex>
          <v-flex xs8 sm4>
            <v-checkbox v-if="!isAnonymous" hide-details class="mr-1 my-auto mb-0" v-model="allowAnonymous" label="익명댓글허용">
            </v-checkbox>
          </v-flex>
          <v-spacer></v-spacer>
        </v-layout>
        <v-btn class="success" @click="post()">글쓰기</v-btn>
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
  labelIdle: '',
  stylePanelLayout: 'integrated',
  stylePanelAspectRatio: 0.0001
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
      show: false,
      isAnonymous: false,
      allowAnonymous: true,
      attachedFilenames: [],
      attachedImages: [],
      formData: undefined,
      attachedFileNumber: 0,
      selectedFile: undefined,
      server: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          // const formData = new FormData();
          // // formdata 는 계속 append
          // console.log(this.attachedImages, this.attachedFilenames)
          // console.log(file.filename)
          if (!this.formData) this.formData = new FormData()
          if (this.attachedFilenames.includes(file.name)) {
            this.formData.append('attach', file, file.name);
            this.attachedFileNumber += 1;
          }
          if (this.attachedFileNumber === this.attachedFilenames.length) {
            this.uploadDocument()
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
    async uploadDocument() {
      if (!this.formData) this.formData = new FormData()
      await this.attachImages()
      this.formData.append('boardId', this.$route.params.boardId)
      this.formData.append('title', this.title)
      this.formData.append('contents', JSON.stringify(this.$refs.editor.quill.editor.delta))
      this.formData.append('isAnonymous', this.isAnonymous)
      this.formData.append('allowAnonymous', this.allowAnonymous)
      if(this.survey) {
        this.formData.append('survey', JSON.stringify(this.survey))
      }
      for (var pair of this.formData.entries()) {
          console.log(pair[0]+ ', ' + pair[1]); 
      }
      return this.$axios
        .post('/document', this.formData)
        .then(response => {
          if (response.status === 200) {
            this.$router.push(`/${this.$route.params.boardId}/${response.data.documentId}`)
          }
        })
        .catch(error => {
          delete this.formData
          this.attachedFileNumber = 0
          console.log(error.response)
        });
    },
    async post () {
      // manually add images as file
      await this.handleProcessFile()
      await this.uploadDocument()
    },
    handleFilePondInit: function () {
      console.log('FilePond has initialized')

      // example of instance method call on pond reference
      this.$refs.pond.getFiles()
    },
    handleFilePondAddFile: function (error, file) {
      console.log(error)
      this.attachedFilenames.push(file.filename)
    },
    removeFile(filename) {
      let fileid = this.$refs.pond.getFiles().find(file=>file.filename === filename).id
      this.$refs.pond.removeFile(fileid)
      this.show = false
    },
    handleFilePondRemoveFile: function (file) {
      this.attachedFilenames = this.attachedFilenames.filter(filename => file.filename !== filename)
    },
    handleProcessFile: function () {
      return this.$refs.pond.processFiles()
        .then(res=> console.log(res))
        .catch(err=>console.error(err))
    },
    uuid() {
      let partialUUID = () => {
          return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
      };
      return partialUUID() + partialUUID() + '-' + partialUUID() + '-' + partialUUID() + '-' + partialUUID() + '-' + partialUUID() + partialUUID() + partialUUID()
    },
    attachImages () {
      this.imageCount = this.$refs.editor.quill.editor.delta.ops.filter(item => item.insert.hasOwnProperty('image')).length
      return this.$refs.editor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty('image')) {
          // random generated uuid should given here
          let imgSrc = item.insert.image
          let imageName = this.uuid() + '.' + imgSrc.substring("data:image/".length, imgSrc.indexOf(";base64"))
          item.insert.image = imageName;
          this.formData.append('attach', this.dataURItoBlob(imgSrc), imageName)
        }
      })
    },
    dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
      else
          byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
  },
    surveyButtonClick () {
      console.log(this.currentSurvey, this.survey)
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
      if (confirm('설문을 삭제합니다.')) {
        this.surveyDialog = false
        this.currentSurvey.questions = []
        this.survey = undefined 
      }
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
<style scoped>
.ql-image {
  visibility: hidden;
}
#survey-button {
  width: 28px;
}
#attach-button {
  width: 28px;
}
#anonymous-slot {
  width: 28px;
}
.ql-editor {
  height:400px !important;
}
.ql-container {
  height: 400px;
}
</style>
