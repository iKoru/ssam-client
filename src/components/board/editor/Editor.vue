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
        <v-btn small flat @click="openFileDialog">
          <v-icon id="attach-button">attach_file</v-icon>파일첨부
          <input type="file" multiple id="file-upload" style="display:none" @change="onFileChange">
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
    <v-dialog v-if="documentId && survey" v-model="surveyViewerDialog" max-width="500px" :fullscreen="$vuetify.breakpoint.xsOnly" scrollable>
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>설문조사 확인</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn class="toolbar-btn-last" @click="surveyViewerDialog=false" icon><v-icon>close</v-icon></v-btn>
        </v-toolbar>
        <v-card-text>
          <v-layout column>
            <survey :currentSurvey="survey" :onlyView="true"/>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
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
        <v-btn v-if="documentId" class="primary" @click="modifyPost()">수정</v-btn>
        <v-btn v-else class="primary" @click="post()">등록</v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
</template>
<script>
// Import plugins
import Survey from "@/components/board/survey/Survey";
import SurveyMaker from "@/components/board/survey/SurveyMaker";
import BoardMixins from "@/components/mixins/BoardMixins";
export default {
  name: "Editor",
  components: {
    SurveyMaker,
    Survey,
  },
  props: ['documentId', 'boardId'],
  mixins: [BoardMixins],
  data() {
    return {
      savedContent: undefined,
      link: undefined,
      title: null,
      content: "",
      survey: undefined,
      surveyDialog: false,
      surveyViewerDialog: false,
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
      formData: undefined,
      rawFileData: undefined,
      disallowAnonymous: false,
      attachedFilenames: [],
      deletedFilenames: [],
      attachedImages: [],
      modifyingFormData: undefined,
      attachedFileNumber: 0,
      attachFromServer: undefined,
      selectedFile: undefined,
      originImages: [],
    };
  },
  // manually control the data synchronization
  methods: {
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
      await this.processUploadFiles()
      /*for (var pair of this.formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }*/
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
      // await this.handleProcessFile();
      await this.uploadDocument();
    },
    async modifyPost() {
      // edit given document put 한번 attach post delete한번
      // if (!this.formData) this.formData = new FormData();

      // check image and attach change
      // 이미지/파일 달라진 것 -> post/delete
      // 이전 파일 올릴 때 동일이름 체크 필요(이미지는 uid부여중)
      let modifiedBody = {
        documentId: this.documentId,
        title: this.title,
        contents: JSON.stringify(this.$refs.editor.quill.editor.delta)
      }
      return this.$axios
      .put(`/document`, modifiedBody)
      .then(response => {
        if (response.status === 200) {
          console.log(response)

          console.log(this.deletedFilenames)
        }
      })
      .catch(error => {
        delete this.formData;
        this.attachedFileNumber = 0;
        console.log(error.response);
      });
    },
    attachImages() {
      this.imageCount = this.$refs.editor.quill.editor.delta.ops.filter(item => item.insert.hasOwnProperty("image")).length;
      return this.$refs.editor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty("image")) {
          // random generated uuid should given here
          if(item.insert.image.includes('data:image')) {
            let imgSrc = item.insert.image;
            let imageName = this.uuid() + "." + imgSrc.substring("data:image/".length, imgSrc.indexOf(";base64"));
            this.formData.append("attach", this.dataURItoBlob(imgSrc), imageName);
            item.insert.image = imageName;
            this.originImages.push({name: imageName, src: imgSrc});
          }
          // 취소되었을 때 이미지 source restore해야함
        }
      });
    },
    revertImages() {
      this.$refs.editor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty("image")) {
          let imgName = item.insert.image;
          item.insert.image = this.originImages.find(img => img.name === imgName).src;
        }
      });
      this.originImages = [];
    },
    surveyButtonClick() {
      if (this.documentId && this.survey) {
        // 글 수정시 설문 수정 불가
        this.surveyViewerDialog = true
        return;
      }
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
    },
    parseDocument(data) {
          this.boardId = data.boardId
          this.title = data.title
          this.contents = JSON.parse(data.contents)
          this.attachFromServer = data.attach
          this.$refs.editor.quill.setContents(this.contents)
          this.isAnonymous = data.isAnonymous
          if(data.survey) {
            this.survey = data.survey
          }
          if(data.attach) {
            console.log(data.attach)
            console.log(this.contents)
            let image;
            this.contents.ops.forEach(item => {
              if (item.insert.hasOwnProperty("image")) {
                image = data.attach.find(x => x.attach_name === item.insert.image);
                if (image) {
                  image.insert = true;
                }
              }
            })
            this.attachedFilenames = data.attach.filter(f => !f.insert).map(f => f.attach_name)
            
          }
    },
    attachButtonClick() {
      if(this.documentId) this.openFileDialog()
      else this.$refs.pond.browse()
    },
    openFileDialog() {
      document.getElementById('file-upload').click();
    },
    onFileChange(e) {
        if (!this.rawFileData) this.rawFileData = new FormData();
        var self = this;
        var files = e.target.files || e.dataTransfer.files;
        console.log(files)
        if(files.length > 0){
            for(var i = 0; i < files.length; i++){
                let sameNameCount = 0;
                self.attachedFilenames.forEach(name => {
                  if(name.toLowerCase() === files[i].name.toLowerCase()) sameNameCount++
                })
                let filename = files[i].name
                if(sameNameCount > 0) filename = filename + ' (' + sameNameCount + ')'
                self.rawFileData.append("file", files[i], filename);
                self.attachedFilenames.push(filename)
                // keep delete -> attach case
                self.deletedFilenames = self.deletedFilenames.filter(f=>f!==filename)
            }
        }
    },
    removeFile(filename) {
      this.deletedFilenames.push(filename)
      this.attachedFilenames = this.attachedFilenames.filter(f => f !== filename)
    },
    processUploadFiles() {
      if(this.rawFileData){
        for (var pair of this.rawFileData.entries()) {
            if(!this.deletedFilenames.includes(pair[1].name)) {
              this.formData.append('attach', pair[1], pair[1].name)
            }
        }
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
  created() {
    if(this.boardId && this.documentId) {
      this.$axios
        .get(`/${this.boardId}/${this.documentId}`)
        .then(response => {
          this.parseDocument(response.data)
        })
        .catch(error => {
          console.log(error.response);
          this.$router.replace("/error?error=" + (error && error.response ? error.response.status || "404" : "404"));
        }); 
    }
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
#write-editor .video-container{
  position:relative;
  height:0;
  width:100%;
  padding-bottom:56%;
}
#write-editor .video-container iframe{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
}
</style>
