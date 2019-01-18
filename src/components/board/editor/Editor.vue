<template>
  <v-layout column>
    <v-flex id="title" class="mb-0 pb-0">
      <v-text-field placeholder="제목" class="dense" :flat="$vuetify.breakpoint.xsOnly" solo v-model="title" hide-details></v-text-field>
    </v-flex>
    <v-flex xs12 class="write-editor">
      <quill-editor v-model="content" ref="editor" :options="editorOption" @ready="onEditorReady($event)">
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
    </v-flex>
    <!-- <image-attachment ref="imageAttachment" @imageAttached="imageAttached"/> -->
    <div>{{savedContent}}</div>
    <!-- <Attachment ref="attachment" @imageAttached="imageAttached" @fileAttached="fileAttached" @fileRemoved="fileREmoved"/> -->
    <v-dialog v-model="surveyDialog" max-width="500px" transition="dialog-bottom-transition" persistent>
      <survey-maker @deleteSurvey="deleteSurvey" @closeSurvey="closeSurvey" @extractSurvey="extractSurvey" :currentSurvey="currentSurvey"/>
    </v-dialog>

    <v-layout pt-1 justify-center>
      <component :is="$vuetify.breakpoint.xsOnly?'v-flex':'div'" xs4 px-1>
        <v-btn small flat @click="surveyButtonClick" :color="survey?'primary':'default'">
          <v-icon id="survey-button">how_to_vote</v-icon>
          <span>설문조사</span>
        </v-btn>
      </component>
      <component :is="$vuetify.breakpoint.xsOnly?'v-flex':'div'" xs4 px-1>
        <v-btn small flat @click="$refs.imageAttach.click()">
          <v-icon id="attach-button">image</v-icon>이미지
        </v-btn>
      </component>
      <component :is="$vuetify.breakpoint.xsOnly?'v-flex':'div'" xs4 px-1>
        <v-btn small flat @click="attachButtonClick">
          <v-icon id="attach-button">attach_file</v-icon>파일첨부
        </v-btn>
      </component>
      <v-spacer/>
    </v-layout>
    <v-layout v-if="attachedFilenames.length>0">
      <v-flex xs12 sm6>
        <v-list>
          <template v-for="(item, index) in attachedFilenames">
            <v-list-tile :key="index">
              <v-list-tile-content>
                <v-list-tile-sub-title v-html="item"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn flat small class="short" @click="removeFile(item)">삭제</v-btn>
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
        </v-list>-->
      </v-flex>
    </v-layout>
    <file-pond name="attachment" ref="pond" instantUpload="false" allow-multiple="true" accepted-file-types="application/zip, application/x-hwp, application/pdf, image/jpeg, image/png, image/jpg" :server="server" @addfile="handleFilePondAddFile" @removefile="handleFilePondRemoveFile" v-on:init="handleFilePondInit"/>
    <v-layout py-2 justify-center>
      <v-flex pl-4 ml-1 xs4 sm2>
        <v-checkbox hide-details class="mr-1 my-auto mb-0" v-model="isAnonymous" label="익명"></v-checkbox>
      </v-flex>
      <v-flex xs8 sm4>
        <v-checkbox v-show="!isAnonymous" hide-details class="mr-1 my-auto mb-0" v-model="disallowAnonymous" label="익명댓글불가"></v-checkbox>
      </v-flex>
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
// Import FilePond
// import vueFilePond from 'vue-filepond'

// Import plugins
import Survey from "@/components/board/survey/Survey";
import SurveyMaker from "@/components/board/survey/SurveyMaker";

import vueFilePond, {setOptions} from "vue-filepond";
import BoardMixins from "@/components/mixins/BoardMixins";

// Import plugins
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
        modules: {
          toolbar: "#toolbar",
          imageDrop: true,
          imageResize: true
        }
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
      await this.handleProcessFile();
      await this.uploadDocument();
    },
    handleFilePondInit: function() {
      console.log("FilePond has initialized");

      // example of instance method call on pond reference
      this.$refs.pond.getFiles();
    },
    handleFilePondAddFile: function(error, file) {
      console.log(error);
      this.attachedFilenames.push(file.filename);
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
      console.log(this.currentSurvey, this.survey);
      if (this.currentSurvey.questions.length === 0) {
        this.currentSurvey.questions.push({
          title: "",
          allowMultipleChoice: false,
          choices: ["", ""]
        });
      } else this.currentSurvey = this.survey;
      this.surveyDialog = true;
    },
    attachButtonClick() {
      this.$refs.pond.browse();
    },
    extractSurvey(survey) {
      this.survey = survey;
      console.log(this.survey);
      this.surveyDialog = false;
    },
    closeSurvey() {
      this.surveyDialog = false;
    },
    deleteSurvey() {
      if (confirm("설문을 삭제합니다.")) {
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
      stylePanelAspectRatio: 0.0001
    });
  }
};
</script>
<style>
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
.write-editor .quill-editor .ql-container {
  min-height: 30rem;
  padding-bottom: 1rem;
}
#title .v-input__slot {
  box-shadow: none;
}
#title,
#toolbar,
#toolbar + .ql-container.ql-snow {
  border-top: 1px solid #e8e8e8;
  border-left: none;
  border-right: none;
}
#toolbar {
  display: none;
  border-bottom: none;
}
#toolbar + .ql-container.ql-snow {
  border-bottom: 1px solid #e8e8e8;
}
@media (min-width: 600px) {
  #title,
  #toolbar,
  #toolbar + .ql-container.ql-snow {
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
  }
  #toolbar {
    display: block;
  }
}
.write-editor .quill-editor .ql-editor {
  min-height: 30rem;
}
</style>
