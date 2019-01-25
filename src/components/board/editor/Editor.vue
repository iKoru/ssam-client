<template>
  <v-layout column>
    <v-flex id="title" class="mb-0 pb-0">
      <v-text-field placeholder="제목" class="dense" :flat="$vuetify.breakpoint.xsOnly" solo v-model="title" hide-details></v-text-field>
    </v-flex>
    <v-flex xs12 id="write-editor">
      <quill-editor v-model="content" ref="editor" :options="editorOption" @ready="onEditorReady($event)">
        <div id="toolbar" slot="toolbar">
          <button class="ql-bold">Bold</button>
          <button class="ql-italic">Italic</button>
          <select class="ql-size">
            <option value="small">작게</option>
            <option selected>보통</option>
            <option value="large">크게</option>
            <option value="huge">더 크게</option>
          </select>
          <button ref="imageAttach" class="ql-image" value="image" v-show="$vuetify.breakpoint.smAndUp"></button>
        </div>
      </quill-editor>
    </v-flex>
    <div>{{savedContent}}</div>
    <v-dialog v-model="surveyDialog" max-width="500px" :fullscreen="$vuetify.breakpoint.xsOnly" scrollable>
      <survey-maker @deleteSurvey="deleteSurvey" @closeSurvey="closeSurvey" @extractSurvey="extractSurvey" :survey="currentSurvey"/>
    </v-dialog>

    <v-layout pt-1 align-center>
      <div>
        <v-btn small flat @click="surveyButtonClick" :color="survey?'primary':'default'">
          <v-icon id="survey-button">how_to_vote</v-icon>
          <span>설문조사</span>
        </v-btn>
      </div>
      <div>
        <v-btn small flat @click="$refs.imageAttach.click()">
          <v-icon id="attach-button">image</v-icon>이미지
        </v-btn>
      </div>
      <div>
        <v-btn small flat @click="$refs.pond.browse()">
          <v-icon id="attach-button">attach_file</v-icon>파일첨부
        </v-btn>
      </div>
    </v-layout>
    <v-slide-y-transition>
      <v-layout v-if="attachedFilenames.length>0" wrap class="border-light">
        <v-flex xs6 md4 v-for="(item, index) in attachedFilenames" :key="index" px-2>
          <v-slide-y-transition>
            <v-layout row align-center>
              <div class="ellipsis">{{item}}</div>
              <v-spacer/>
              <v-btn small class="short" @click="removeFile(item)">삭제</v-btn>           
            </v-layout>
          </v-slide-y-transition>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
    <file-pond name="attachment" ref="pond" instantUpload="false" allow-multiple="true" accepted-file-types="application/zip, application/x-zip-compressed, multipart/x-zip, application/x-hwp, application/pdf, image/*, application/vnd.openxmlformats-officedocument.wordprocessingml.*, application/msword, application/vnd.ms-powerpoint, audio/*, video/*, application/vnd.ms-excel, application/haansofthwp, application/haansoftxlsx, application/haansoftxls, application/haansoftpptx, application/haansoftppt, application/haansoftdocx, application/haansoftdoc" :server="server" @addfile="handleFilePondAddFile" @removefile="handleFilePondRemoveFile" v-on:init="handleFilePondInit"/>
    <v-layout py-2 ml-3 justify-center>
      <div class="mr-3">
        <v-checkbox hide-details class="mr-1 my-auto mb-0" v-model="isAnonymous" label="익명"></v-checkbox>
      </div>
      <div>
        <v-checkbox :disabled="isAnonymous" hide-details class="mr-1 my-auto mb-0" v-model="disallowAnonymous" label="익명댓글불가"></v-checkbox>
      </div>
      <v-spacer></v-spacer>
    </v-layout>
    <v-layout row>
      <v-flex text-xs-center>
        <v-btn @click="$router.go(-1)">돌아가기</v-btn>
        <v-btn class="primary" @click="post()">등록</v-btn>
      </v-flex>
    </v-layout>

    <!-- <div>viewer
          {{surveyJSON}}
          <survey :surveyJSON="surveyJSON"/>
    </div>-->
  </v-layout>
</template>
<script>
// Import plugins
import Survey from "@/components/board/survey/Survey";
import SurveyMaker from "@/components/board/survey/SurveyMaker";
import vueFilePond, {setOptions} from "vue-filepond";
import BoardMixins from "@/components/mixins/BoardMixins";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js";

const FilePond = vueFilePond(FilePondPluginFileValidateType);

export default {
  name: "Editor",
  components: {
    SurveyMaker,
    Survey,
    FilePond
  },
  mixins: [BoardMixins],
  data() {
    return {
      savedContent: undefined,
      link: undefined,
      title: null,
      content: "",
      survey: undefined,
      surveyDialog: false,
      currentSurvey: {questions: []},
      editorOption: {
        placeholder: "내용을 입력해주세요.",
        modules: {
          toolbar: "#toolbar",
          magicUrl: {
            urlRegularExpression:/(https?:\/\/[\S]+)|(www.[\S]+)|([\S]+.(?:com|kr|org|io|net|me))/,
            globalRegularExpression:/(https?:\/\/[\S]+)|(www.[\S]+)|([\S]+.(?:com|kr|org|io|net|me))/,
            normalizeRegularExpression:/(https?:\/\/[\S]+)|(www.[\S]+)|([\S]+.(?:com|kr|org|io|net|me))/,
          },
          imageDrop: true,
          imageResize: true
        },
        theme:this.$vuetify.breakpoint.xsOnly?'bubble':'snow'
      },
      show: false,
      isAnonymous: false,
      disallowAnonymous: false,
      attachedFilenames: [],
      attachedImages: [],
      formData: undefined,
      attachedFileNumber: 0,
      selectedFile: undefined,
      originImages: [],
      server: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          // const formData = new FormData();
          // // formdata 는 계속 append
          // console.log(this.attachedImages, this.attachedFilenames)
          // console.log(file.filename)
          
          if (!this.formData) this.formData = new FormData();
          if (this.attachedFilenames.includes(file.name)) {
            this.formData.append("attach", file, file.name);
            this.attachedFileNumber += 1;
          }
          if (this.attachedFileNumber === this.attachedFilenames.length) {
            this.uploadDocument();
          }
          return {load, error, progress, abort};
        }
      }
    };
  },
  // manually control the data synchronization
  methods: {
    // onEditorBlur (quill) {
    //   console.log('editor blur!', quill)
    // },
    // onEditorFocus (quill) {
    //   console.log('editor focus!', quill)
    // },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({quill, html, text}) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },
    async uploadDocument() {
      if (!this.formData) this.formData = new FormData();
      await this.attachImages();
      this.formData.append("boardId", this.$route.params.boardId);
      this.formData.append("title", this.title);
      this.formData.append("contents", JSON.stringify(this.$refs.editor.quill.editor.delta));
      this.formData.append("isAnonymous", this.isAnonymous);
      this.formData.append("allowAnonymous", this.isAnonymous ? true : !this.disallowAnonymous);
      if (this.survey) {
        this.formData.append("survey", JSON.stringify(this.survey));
      }
      for (var pair of this.formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      return this.$axios
        .post("/document", this.formData)
        .then(response => {
          if (response.status === 200) {
            this.$router.push(`/${this.$route.params.boardId}/${response.data.documentId}`);
            this.revertImages();
          }
        })
        .catch(error => {
          delete this.formData;
          this.revertImages();
          this.attachedFileNumber = 0;
          console.log(error.response);
        });
    },
    async post() {
      // manually add images as file
      if(!this.title || this.title.trim() === ''){
        this.$store.dispatch('showSnackbar', {text:'제목을 입력해주세요.', color:'error'})
        return;
      }else if(!this.content || this.content.trim() === ''){
        this.$store.dispatch('showSnackbar', {text:'내용을 입력해주세요.', color:'error'})
        return;
      }
      await this.handleProcessFile();
      await this.uploadDocument();
    },
    handleFilePondInit: function() {
      console.log("FilePond has initialized");

      // example of instance method call on pond reference
      this.$refs.pond.getFiles();
    },
    handleFilePondAddFile: function(error, file) {
      console.log(file, error, file.getMetadata())
      if(!error){
        if (file.fileSize > 8 * 1024 * 1024) {
          this.$store.dispatch("showSnackbar", {text: "8MB 이내의 파일만 업로드할 수 있습니다.", color: "error"});
          file.abortLoad();
          file.abortProcessing();
          return;
        }
        this.attachedFilenames.push(file.filename);
      }else{
        this.$store.dispatch('showSnackbar', {text:file.main + ' ' + file.sub, color:'error'});
      }
    },
    removeFile(filename) {
      let fileid = this.$refs.pond.getFiles().find(file => file.filename === filename).id;
      this.$refs.pond.removeFile(fileid);
      this.show = false;
    },
    handleFilePondRemoveFile: function(file) {
      this.attachedFilenames = this.attachedFilenames.filter(filename => file.filename !== filename);
    },
    handleProcessFile: function() {
      return this.$refs.pond
        .processFiles()
        .then(res => console.log(res))
        .catch(err => console.error(err));
    },
    attachImages() {
      this.imageCount = this.$refs.editor.quill.editor.delta.ops.filter(item => item.insert.hasOwnProperty("image")).length;
      return this.$refs.editor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty("image")) {
          // random generated uuid should given here
          let imgSrc = item.insert.image;
          let imageName = this.uuid() + "." + imgSrc.substring("data:image/".length, imgSrc.indexOf(";base64"));
          this.formData.append("attach", this.dataURItoBlob(imgSrc), imageName);
          item.insert.image = imageName;
          this.originImages.push({name: imageName, src: imgSrc});
          // 취소되었을 때 이미지 source restore해야함
        }
      });
    },
    revertImages() {
      this.$refs.editor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty("image")) {
          // random generated uuid should given here
          let imgName = item.insert.image;
          item.insert.image = this.originImages.find(img => img.name === imgName).src;
        }
      });
      this.originImages = [];
      console.log(this.$refs.editor.quill.editor.delta.ops);
    },
    surveyButtonClick() {
      if (this.currentSurvey.questions.length === 0) {
        this.currentSurvey.questions.push({title: "", allowMultipleChoice: false, choices: ["", ""]});
      } else if(this.survey){
        this.currentSurvey = JSON.parse(JSON.stringify(this.survey));
      }
      this.surveyDialog = true;
    },
    extractSurvey(survey) {
      this.surveyDialog = false;
      this.survey = JSON.parse(JSON.stringify(survey));
    },
    closeSurvey() {
      this.surveyDialog = false;
    },
    deleteSurvey() {
      if (confirm("작성된 질문 및 내용을 삭제할까요?")) {
        this.surveyDialog = false;
        this.currentSurvey.questions = [];
        this.survey = undefined;
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.editor.quill;
    }
  },
  watch: {
    isAnonymous: {
      handler(to) {
        if (to) this.disallowAnonymous = false;
      }
    }
  },
  mounted() {
    setOptions({
      labelIdle: "",
      stylePanelLayout: "integrated",
      stylePanelAspectRatio: 0.0001,
      labelFileWaitingForSize: "파일의 크기를 확인중입니다...",
      labelFileSizeNotAvailable: "파일의 크기를 확인할 수 없습니다.",
      labelFileLoading: "파일을 불러오는 중...",
      labelFileLoadError: "파일을 불러오지 못헀습니다.",
      labelFileProcessing: "서버로 업로드중...",
      labelFileProcessingComplete: "파일을 서버로 업로드하였습니다.",
      labelFileProcessingAborted: "업로드가 취소되었습니다.",
      labelFileProcessingError: "파일을 업로드하지 못했습니다.",
      labelTapToCancel: "",
      labelTapToRetry: "재시도",
      labelTapToUndo: "",
      labelButtonRemoveItem: "삭제",
      labelButtonAbortItemLoad: "중지",
      labelButtonRetryItemLoad: "재시도",
      labelButtonAbortItemProcessing: "취소",
      labelButtonUndoItemProcessing: "재시도",
      labelButtonProcessItem: "업로드",
      labelFileTypeNotAllowed: "허용된 파일 형식이 아닙니다.",
      fileValidateTypeLabelExpectedTypes: "이미지, 문서 파일만 업로드가 가능합니다.",
      allowRevert: false
    });
  }
};
</script>
<style>
.ql-image {
  visibility: hidden;
}
#write-editor .quill-editor .ql-container {
  min-height: 20rem;
  padding-bottom: 1rem;
}
#write-editor .quill-editor .ql-editor {
  min-height: 20rem;
}
#title .v-input__slot {
  box-shadow: none;
}
#title,
#toolbar,
#toolbar + .ql-container.ql-snow,
#write-editor .ql-container.ql-bubble{
  border-top: 1px solid #e8e8e8;
  border-left: none;
  border-right: none;
}
.ql-snow #toolbar {
  display: none;
  border-bottom: none;
}
#toolbar + .ql-container.ql-snow,
#write-editor .ql-container.ql-bubble{
  border-bottom: 1px solid #e8e8e8;
}
#write-editor .quill-editor .ql-bubble .ql-tooltip {
  z-index:1
}
#write-editor .ql-bubble .ql-picker.ql-size {
  width: 70px;
}
@media (min-width: 600px) {
  #title,
  #toolbar,
  #toolbar + .ql-container.ql-snow,
  #write-editor .ql-container.ql-bubble{
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
  }
  .ql-snow #toolbar {
    display: block;
  }
  #write-editor .quill-editor .ql-container, .write-editor .quill-editor .ql-editor {
    min-height: 30rem;
  }
}
#write-editor .ql-editor.ql-blank::before {
  font-style: normal;
}
</style>
