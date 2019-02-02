<template>
  <v-layout column :mx-1="$vuetify.breakpoint.smAndUp" :mt-1="$vuetify.breakpoint.smAndUp">
    <v-flex id="title" class="mb-0 pb-0">
      <v-text-field placeholder="제목" class="dense" :flat="$vuetify.breakpoint.xsOnly" solo v-model="title" hide-details></v-text-field>
    </v-flex>
    <v-flex xs12 id="write-editor">
      <quill-editor v-model="content" ref="editor" :options="editorOption">
        <div id="toolbar" slot="toolbar">
          <button class="ql-bold">Bold</button>
          <button class="ql-italic">Italic</button>
          <select class="ql-size">
            <option value="small">작게</option>
            <option selected>보통</option>
            <option value="large">크게</option>
            <option value="huge">더 크게</option>
          </select>
          <!--<button ref="imageAttach" class="ql-image" value="image" v-show="$vuetify.breakpoint.smAndUp"></button>-->
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
        <v-btn small flat @click="selectImage">
          <v-icon id="attach-button">image</v-icon>이미지
        </v-btn>
      </div>
      <div>
        <v-btn small flat @click="openFileDialog">
          <v-icon id="attach-button">attach_file</v-icon>파일첨부
        </v-btn>
      </div>
    </v-layout>
    <input style="diplay:none!important; height:0px; width:0px;"  ref="fileInput" multiple id="file-upload" accept="image/*" type="file" @click="$refs.fileInput.value = null" value="" @change="onFileChange" capture="filesystem">
    <v-slide-y-transition>
      <v-layout v-if="attachedFilenames.length>0" wrap class="border-light">
        <v-flex xs6 md4 v-for="(item, index) in attachedFilenames" :key="index" px-2>
          <v-slide-y-transition>
            <v-layout row align-center>
              <div class="ellipsis">{{item}}</div>
              <v-spacer/>
              <v-btn small class="short" @click="removeFile(index)">삭제</v-btn>
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
        <v-btn class="primary" @click="post()">{{documentId?'수정하기':'등록'}}</v-btn>
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
      disallowAnonymous: false,
      formData: undefined,
      rawFileData: undefined, 
      attachedFilenames: [], // for easy check
      attachFromServer: undefined, // for keeping attaches when modifying document
      originImages: [], // for Revert Imaage
    };
  },
  methods: {
    onEditorChange({quill, html, text}) {
      console.log("editor change!", quill, html, text);
      this.content = html;
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
      if (this.documentId) await this.uploadModifiedDocument();
      else await this.uploadDocument();
    },
    async uploadDocument() {
      console.log(this.$refs.editor.quill.editor.delta)
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
          }
        })
        .catch(error => {
          this.$store.dispatch('showSnackbar', {text:'게시물 작성이 실패하였습니다. 다시 시도해주세요', color:'error'})
          delete this.formData;
          this.revertImages();
          console.log(error.response);
        });
    },
    async uploadModifiedDocument() {
      if(!confirm('게시물을 수정하시겠습니까?')) {
        return;
      }
      // Convert Images And Upload First
      try {
        if (!this.formData) this.formData = new FormData();
        this.formData.append('documentId', this.documentId)
        await this.attachImages(); // change image url here
        await this.processFileChange()
          let modifiedBody = {
            documentId: this.documentId,
            title: this.title,
            contents: JSON.stringify(this.$refs.editor.quill.editor.delta),
          }
          
          return this.$axios
          .put(`/document`, modifiedBody)
          .then(response => {
            if (response.status === 200) {
              this.$store.dispatch('showSnackbar', {text:'게시물을 수정하였습니다', color:'success'})
              this.$router.push(`/${this.$route.params.boardId}/${this.documentId}`);
            }
          })
          .catch(error => {
            this.$store.dispatch('showSnackbar', {text:'게시물 수정에 실패했습니다. 다시 시도해주세요', color:'error'})
            console.log(error.response);
          })
      } catch (err){
        console.log(err)
        this.$store.dispatch('showSnackbar', {text:'게시물 수정에 실패했습니다. 다시 시도해주세요', color:'error'})
        this.revertImages();
        delete this.formData
      }
    },
    attachImages() {
      return this.$refs.editor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty("image")) {
          console.log(item.insert)
          if(item.insert.image.includes('data:image')) {
            let imgSrc = item.insert.image;
            let imageName = this.uuid() + "." + imgSrc.substring("data:image/".length, imgSrc.indexOf(";base64"));
            this.formData.append("attach", this.dataURItoBlob(imgSrc), imageName);
            item.insert.image = imageName;
            this.originImages.push({name: imageName, src: imgSrc});
          }
          console.log(item.insert)
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
    async processFileChange() {
      // let serverPaths = this.attachFromServer.map(a => '/' + a.attach_path)
      
      // new images are already in formdata
      // process deleted images
            console.log(this.attachFromServer)

      let currentImageId = this.$refs.editor.quill.editor.delta.ops.map(item => {
        if (item.insert.hasOwnProperty("image")) {
          if(item.insert.image.startsWith('/attach')) {
            // '/attach/:documentId(^[\\d]+$)/:attachId
            return this.attachFromServer.find(a => item.insert.image === '/' + a.attach_path).attach_id
          }
        }
      });
      console.log(currentImageId)
      let deleteImageP, deleteFileP, uploadFileP
      console.log(this.attachFromServer)
      this.attachFromServer = this.attachFromServer.filter(a => a!==null)
      this.attachFromServer.forEach(a => {
        console.log(a.attach_name)
        if(a.insert && !currentImageId.filter(i=>i!==undefined).includes(a.attach_id)) {
          deleteImageP = this.$axios
            .delete(`/document/attach/${this.documentId}/${a.attach_id}`)
            .then(response => {
              if (response.status === 200) {
                console.log(response)
              }
            })
            .catch(error => {
              console.log(error.response);
            });
        } else if(!this.attachedFilenames.includes(a.attach_name) && !a.insert){
          deleteFileP = this.$axios
            .delete(`/document/attach/${this.documentId}/${a.attach_id}`)
            .then(response => {
              if (response.status === 200) {
                console.log(response)
              }
            })
            .catch(error => {
              console.log(error.response);
          });
        }
      })
      await this.processUploadFiles()
      let fileCount = 0;
      for (let pair of this.formData.entries()) {
        if(pair[0] === 'attach') fileCount += 1;
      }
      if(fileCount > 0) {
        uploadFileP = this.$axios
          .post(`/document/attach`, this.formData)
          .then(response => {
            if (response.status === 200) {
              console.log(response)
            }
          })
          .catch(error => {
            console.log(error.response);
          });
      }
      await Promise.all([deleteImageP, deleteFileP, uploadFileP])
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          this.$store.dispatch('showSnackbar', {text:'게시물 수정에 실패했습니다. 다시 시도해주세요', color:'error'})
        })
    },
    surveyButtonClick() {
      if (this.documentId && this.survey) {
        // 글 수정시 설문 수정 불가
        this.surveyViewerDialog = true
        return;
      }
      if (this.documentId && !this.survey) {
        // 글 작성 후 설문 추가 불가
        this.$store.dispatch('showSnackbar', {text:'게시물 작성 후 설문을 추가할 수 없습니다.', color:'error'})
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
          console.log(data.attach)
          this.isAnonymous = data.isAnonymous
          if(data.survey) {
            this.survey = data.survey
          }
          if (Array.isArray(data.attach)) {
            data.attach = data.attach.filter(x => x !== null);
          }
          if(data.attach) {
            console.log(data.attach)
            let image;
            this.contents.ops.forEach(item => {
              if (item.insert.hasOwnProperty("image")) {
                image = data.attach.find(x => x.attach_name === item.insert.image);
                console.log(image)
                if (image) {
                  image.insert = true;
                  item.insert.image = this.webUrl + "/" + image.attach_path
                }
              }
            })
            this.attachedFilenames = data.attach.filter(f => !f.insert).map(f => f.attach_name)
          }
          
          this.$refs.editor.quill.setContents(this.contents)
    },
    attachButtonClick() {
      if(this.documentId) this.openFileDialog()
      else this.$refs.pond.browse()
    },
    openFileDialog() {
      document.getElementById('file-upload').click();
    },
    async onFileChange(e) { 
        if (!this.rawFileData) this.rawFileData = new FormData();
        var self = this;
        var files = e.target.files || e.dataTransfer.files;
        if(files.length > 0){
            for(var i = 0; i < files.length; i++){
              if(files[i].size > 1024 * 1024 * 8) {
                this.$store.dispatch('showSnackbar', {text:'8MB 이하의 파일만 첨부가능합니다.', color:'error'})
                break;
              }
                await self.rawFileData.append("file", files[i], files[i].name);
                await self.attachedFilenames.push(files[i].name)
                // keep delete -> attach case
            }
        }
    },
    async removeFile(index) {
      if (this.rawFileData) {
        let newFileData = new FormData()
        let i = 0
        for (let pair of this.rawFileData.entries()) {
          if(pair[0] ==='file') {
            if(i !== Number(index)){
              await newFileData.append(pair[0], pair[1], pair[1].name)
            }
            i += 1
          }
        }
        this.rawFileData = newFileData
      }
      
      this.attachedFilenames.splice(index, 1)
    },
    processUploadFiles() {
      if(!this.rawFileData ) this.rawFileData = new FormData()
      let namesCount = {}
      for (let pair of this.rawFileData.entries()) {
        namesCount[pair[1].name] = {
          count: namesCount[pair[1].name] ? (namesCount[pair[1].name].count + 1) : 1,
          index: 0
        }
      }
      for (let pair of this.rawFileData.entries()) {
        
        let splitter = pair[1].name.lastIndexOf('.')
        let fileExtension = pair[1].name.substring(splitter, pair[1].name.length)
        let filename = pair[1].name.substring(0, splitter)
        let suffix = ''
        if( namesCount[pair[1].name].count > 0) {
          suffix = namesCount[pair[1].name].index === 0 ? '' : ` (${namesCount[pair[1].name].index})`
          namesCount[pair[1].name].index += 1
        }
        this.formData.append('attach', pair[1], filename + suffix + fileExtension)
      }
    },
    selectImage() {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();
      let self = this;
      // Listen upload local image and save to server
      input.onchange = () => {
        const file = input.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          // file type is only image.
          if (/^image\//.test(file.type)) {
            console.log('이미지다')
            let range = self.$refs.editor.quill.getSelection()
            console.log(range)
            console.log(file)
            self.$refs.editor.quill.insertEmbed(range == null ? self.$refs.editor.quill.getLength() : range.index , 'image', reader.result);
  
          } else {
            this.$store.dispatch('showSnackbar', {text:'이미지 파일만 업로드할 수 있습니다.', color:'error'})
          }
        };
        reader.onerror = function (error) {
         console.log('Error: ', error);
        };
      };
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
          console.log(error)
          console.log(error.response);
          this.$store.dispatch('showSnackbar', {text:'게시물을 불러오는데 실패했습니다.', color:'error'})
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
