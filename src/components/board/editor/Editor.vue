<template>
  <v-layout column :mx-1="$vuetify.breakpoint.smAndUp" :mt-1="$vuetify.breakpoint.smAndUp">
    <v-flex id="title" class="mb-0 pb-0">
      <v-text-field placeholder="제목" class="dense" :flat="$vuetify.breakpoint.xsOnly" :readonly="!!documentId" solo v-model="title" hide-details></v-text-field>
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
        </div>
      </quill-editor>
    </v-flex>
    <div>{{savedContent}}</div>
    <v-dialog v-model="surveyDialog" max-width="500px" :fullscreen="$vuetify.breakpoint.xsOnly" scrollable v-if="!documentId">
      <survey-maker @deleteSurvey="deleteSurvey" @closeSurvey="closeSurvey" @extractSurvey="extractSurvey" :survey="survey" :isSurveyDeletable="isSurveyDeletable" :dialog="surveyDialog"/>
    </v-dialog>

    <v-layout pt-1 pl-2 align-center>
      <div>
        <v-btn small flat @click="surveyButtonClick" :color="isSurveyDeletable?'primary':'default'" v-if="!documentId">
          <v-icon>how_to_vote</v-icon>
          <span>설문조사</span>
        </v-btn>
        <div v-else-if="isSurveyDeletable" class="body-1 primary--text mr-2" title="등록한 설문조사는 수정할 수 없습니다.">
          <v-icon class="primary--text cursor-default vertical-align-middle">how_to_vote</v-icon>
          <span class="cursor-default">설문조사</span>
        </div>
      </div>
      <div>
        <v-btn small flat @click="openImageDialog">
          <v-icon>image</v-icon>이미지
        </v-btn>
      </div>
      <div>
        <v-btn small flat @click="openFileDialog">
          <v-icon>attach_file</v-icon>파일첨부
        </v-btn>
      </div>
    </v-layout>
    <input class="d-none" ref="imageInput" multiple id="image-upload" accept="image/*" type="file" @click.native="$refs.imageInput.value = null" value="" @change="onImageChange" capture="filesystem">
    <input class="d-none" ref="fileInput" multiple id="file-upload" accept="application/zip, application/x-zip-compressed, multipart/x-zip, application/x-hwp,application/pdf, image/*, application/vnd.openxmlformats-officedocument.wordprocessingml.*, application/msword, application/vnd.ms-powerpoint, audio/*, video/*, application/vnd.ms-excel, application/haansofthwp, application/haansoftxlsx, application/haansoftxls, application/haansoftpptx, application/haansoftppt, application/haansoftdocx, application/haansoftdoc" type="file" @click.native="$refs.fileInput.value = null" value="" @change="onFileChange" capture="filesystem">
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
    <v-layout py-2 ml-3 justify-center v-if="board.allowAnonymous">
      <div class="mr-3">
        <v-checkbox hide-details class="mr-1 my-auto mb-0" v-model="isAnonymous" label="익명"></v-checkbox>
      </div>
      <div>
        <v-checkbox :disabled="isAnonymous" hide-details class="mr-1 my-auto mb-0" v-model="disallowAnonymous" label="익명댓글불가"></v-checkbox>
      </div>
      <v-spacer></v-spacer>
    </v-layout>
    <v-layout row mt-3>
      <v-flex text-xs-center>
        <v-btn @click="$router.go(-1)">돌아가기</v-btn>
        <v-btn class="primary" @click="post()">{{documentId?'수정':'등록'}}</v-btn>
      </v-flex>
    </v-layout>
  </v-layout>
</template>
<script>
// Import plugins
import Survey from '@/components/board/survey/Survey';
import SurveyMaker from '@/components/board/survey/SurveyMaker';
import BoardMixins from '@/components/mixins/BoardMixins';
import 'formdata-polyfill'

export default {
  name: 'Editor',
  components: {
    SurveyMaker,
    Survey
  },
  props: ['documentId', 'board'],
  mixins: [BoardMixins],
  data () {
    return {
      savedContent: undefined,
      link: undefined,
      title: null,
      content: '',
      surveyDialog: false,
      survey: { questions: [] },
      isSurveyDeletable: false,
      editorOption: {
        placeholder: '내용을 입력해주세요.',
        modules: {
          toolbar: '#toolbar',
          magicUrl: {
            urlRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|([\S]+.(?:com|kr|org|io|net|me))/,
            globalRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|([\S]+.(?:com|kr|org|io|net|me))/,
            normalizeRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|([\S]+.(?:com|kr|org|io|net|me))/
          },
          imageDrop: true
        },
        theme: this.$vuetify.breakpoint.xsOnly ? 'bubble' : 'snow'
      },
      show: false,
      isAnonymous: false,
      disallowAnonymous: false,
      formData: undefined,
      rawFileData: undefined,
      attachedFilenames: [], // for easy check
      attachFromServer: [], // for keeping attaches when modifying document
      newlyAddedImages: []
    };
  },
  methods: {
    onEditorChange ({ quill, html, text }) {
      this.content = html;
    },
    async post () {
      // manually add images as file
      if (!this.title || this.title.trim() === '') {
        this.$store.dispatch('showSnackbar', { text: '글 제목을 입력해주세요.', color: 'error' })
        return;
      } else if (!this.content || this.content.trim() === '') {
        this.$store.dispatch('showSnackbar', { text: '글 내용을 입력해주세요.', color: 'error' })
        return;
      }
      if (this.documentId) await this.uploadModifiedDocument();
      else await this.uploadDocument();
    },
    async uploadDocument () {
      if (!this.formData) this.formData = new FormData();
      this.attachImages();
      this.formData.append('boardId', this.$route.params.boardId);
      this.formData.append('title', this.title);
      this.formData.append('contents', JSON.stringify(this.$refs.editor.quill.editor.delta));
      this.formData.append('previewContents', this.$refs.editor.quill.getText(0, 50));
      this.formData.append('isAnonymous', this.isAnonymous);
      this.formData.append('allowAnonymous', this.isAnonymous ? true : !this.disallowAnonymous);
      if (this.isSurveyDeletable) {
        this.formData.append('survey', JSON.stringify(this.survey));
      }
      this.processUploadFiles()
      this.$axios
        .post('/document', this.formData)
        .then(response => {
          this.newlyAddedImages = [];
          this.$router.push(`/${this.$route.params.boardId}/${response.data.documentId}`);
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '글을 등록하지 못했습니다. 다시 시도해주세요.'}`, color: 'error' })
          delete this.formData;
          this.revertImages();
          this.newlyAddedImages = [];
        });
    },
    async uploadModifiedDocument () {
      // Convert Images And Upload First
      try {
        if (!this.formData) this.formData = new FormData();
        this.formData.append('documentId', this.documentId)
        this.restoreServerImages(); // revert originally existed image src
        this.attachImages(); // change newly added image from base64 to filename here
        if (await this.processFileChange()) {
          this.$axios
            .put(`/document`, { documentId: this.documentId, title: this.title, contents: JSON.stringify(this.$refs.editor.quill.editor.delta), previewContents: this.$refs.editor.quill.getText(0, 50) })
            .then(response => {
              this.$store.dispatch('showSnackbar', { text: '글을 수정하였습니다.', color: 'success' })
              this.newlyAddedImages = [];
              this.$router.push(`/${this.$route.params.boardId}/${this.documentId}`);
            })
            .catch(error => {
              console.log(error);
              delete this.formData
              this.revertImages();
              this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '글을 수정하지 못했습니다. 다시 시도해주세요.'}`, color: 'error' })
            })
        } else {
          delete this.formData
          this.revertImages();
        }
      } catch (error) {
        console.log(error)
        this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '글을 수정하지 못했습니다. 다시 시도해주세요.'}`, color: 'error' })
        this.revertImages();
        delete this.formData
      }
    },
    attachImages () {
      this.$refs.editor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.image && item.insert.image.startsWith('data:image')) { // newly inserted image
          let imgSrc = item.insert.image;
          let imageName = this.uuid() + '.' + imgSrc.substring('data:image/'.length, imgSrc.indexOf(';base64'));
          this.formData.append('attach', this.dataURItoBlob(imgSrc), imageName);
          item.insert.image = imageName;
          this.newlyAddedImages.push({ base64: imgSrc, attach_name: imageName })
        }
      });
    },
    restoreServerImages () { // restore already existed image on server from attach_path to attach_name
      this.$refs.editor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.image && this.attachFromServer.some(x => x.insert && x.attach_path === item.insert.image)) {
          item.insert.image = this.attachFromServer.find(x => x.insert && x.attach_path === item.insert.image).attach_name;
        }
      });
    },
    revertImages () { // revert translated image from attach_name to base64, attach_name to attach_path when failed to save
      this.$refs.editor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.image && this.newlyAddedImages.some(x => x.attach_name === item.insert.image)) {
          item.insert.image = this.newlyAddedImages.find(x => x.attach_name === item.insert.image).base64;
        } else if (item.insert.image && this.attachFromServer.some(x => x.insert && x.attach_name === item.insert.image)) {
          item.insert.image = this.webUrl + this.attachFromServer.find(x => x.insert && x.attach_name === item.insert.image).attach_path
        }
      });
      this.newlyAddedImages = [];
    },
    async processFileChange () {
      // new images are already in formdata
      // process deleted images
      let currentImageId = this.$refs.editor.quill.editor.delta.ops.filter(ops => ops.insert.image && this.attachFromServer.some(a => ops.insert.image === a.attach_name)).map(item => {
        return this.attachFromServer.find(a => item.insert.image === a.attach_name).attach_id
      })

      let promises = []
      this.attachFromServer.forEach(a => {
        if (a.insert && !currentImageId.includes(a.attach_id)) { // inserted image, currently deleted
          promises.push(this.$axios.delete(`/document/attach/${this.documentId}/${a.attach_id}`));
        } else if (!a.insert && !this.attachedFilenames.includes(a.attach_name)) { // attached file, currently deleted
          promises.push(this.$axios.delete(`/document/attach/${this.documentId}/${a.attach_id}`));
        }
      })

      if (this.processUploadFiles() > 0) { // newly added attach and images
        promises.push(this.$axios.post(`/document/attach`, this.formData));
      }
      if (promises.length > 0) {
        await Promise.all(promises)
          .catch(error => {
            console.log(error)
            this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '글을 수정하지 못했습니다. 다시 시도해주세요'}`, color: 'error' })
            return false;
          })
        return true;
      } else {
        return true;
      }
    },
    surveyButtonClick () {
      if (!this.isSurveyDeletable && this.survey.questions.length === 0) {
        this.survey.questions.push({ title: '', allowMultipleChoice: false, choices: ['', ''] });
      }
      this.surveyDialog = true;
    },
    extractSurvey (survey) {
      this.surveyDialog = false;
      this.survey = JSON.parse(JSON.stringify(survey));
      this.isSurveyDeletable = true;
    },
    closeSurvey () {
      this.surveyDialog = false;
    },
    deleteSurvey () {
      if (confirm('작성된 질문 및 내용을 삭제할까요?')) {
        this.surveyDialog = false;
        this.survey.questions = [];
        this.isSurveyDeletable = false;
      }
    },
    parseDocument (data) {
      this.title = data.title
      this.contents = JSON.parse(data.contents)
      this.attachFromServer = data.attach
      this.isAnonymous = data.isAnonymous
      if (data.survey) {
        this.survey = data.survey
        this.isSurveyDeletable = true
      }
      if (Array.isArray(data.attach)) {
        data.attach = data.attach.filter(x => x !== null);
      }
      if (data.attach) {
        let image;
        this.contents.ops.forEach(item => {
          if (item.insert.hasOwnProperty('image')) {
            image = data.attach.find(x => x.attach_name === item.insert.image);
            if (image) {
              image.insert = true;// mark to insert
              item.insert.image = this.webUrl + image.attach_path
            }
          }
        })
        this.attachedFilenames = data.attach.filter(f => !f.insert).map(f => f.attach_name)
      }

      this.$refs.editor.quill.setContents(this.contents)
    },
    openFileDialog () {
      document.getElementById('file-upload').click();
    },
    openImageDialog () {
      document.getElementById('image-upload').click();
    },
    async onFileChange (e) {
      if (!this.rawFileData) this.rawFileData = new FormData();
      var files = e.target.files || e.dataTransfer.files;
      let attachEntries;

      for (var i = 0; i < files.length; i++) {
        if (files[i].size > 1024 * 1024 * 8) {
          this.$store.dispatch('showSnackbar', { text: '8MB 이하의 파일만 첨부가능합니다.', color: 'error' })
          break;
        }
        attachEntries = this.rawFileData.getAll('file');// this is an array
        if (attachEntries.some(x => x.name === files[i].name)) { // conflict
          let avoid = 0;
          let splitter = files[i].name.lastIndexOf('.')
          do {
            avoid++;
          } while (attachEntries.some(x => x.name === files[i].name.substring(0, splitter) + ` (${avoid})` + files[i].name.substring(splitter, files[i].name.length)));
          this.rawFileData.append('file', files[i], files[i].name.substring(0, splitter) + ` (${avoid})` + files[i].name.substring(splitter, files[i].name.length))
          this.attachedFilenames.push(files[i].name.substring(0, splitter) + ` (${avoid})` + files[i].name.substring(splitter, files[i].name.length))
        } else { // no conflict in file names
          this.rawFileData.append('file', files[i], files[i].name)
          this.attachedFilenames.push(files[i].name)
        }
      }
    },
    async onImageChange (e) {
      var self = this;
      var files = e.target.files || e.dataTransfer.files;
      if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          if (files[i].size > 1024 * 1024 * 8) {
            this.$store.dispatch('showSnackbar', { text: '8MB 이하의 이미지만 첨부가능합니다.', color: 'error' })
            break;
          }
          if (/^image\//.test(files[i].type)) {
            var reader = new FileReader();
            await new Promise((resolve, reject) => {
              reader.readAsDataURL(files[i]);
              reader.onload = () => {
                // file type is only image.
                if (/^image\//.test(files[i].type)) {
                  let range = self.$refs.editor.quill.getSelection()
                  self.$refs.editor.quill.insertEmbed(range == null ? self.$refs.editor.quill.getLength() : range.index, 'image', reader.result);
                } else {
                }
                resolve();
              };
            });
          } else {
            this.$store.dispatch('showSnackbar', { text: '이미지 파일만 업로드할 수 있습니다.', color: 'error' })
          }
        }
      }
    },
    async removeFile (index) {
      if (this.rawFileData) {
        let newFileData = new FormData()
        let i = 0
        for (let pair of this.rawFileData.entries()) {
          if (pair[0] === 'file') {
            if (i !== Number(index)) {
              await newFileData.append(pair[0], pair[1], pair[1].name)
            }
            i += 1
          }
        }
        this.rawFileData = newFileData
      }

      this.attachedFilenames.splice(index, 1)
    },
    processUploadFiles () {
      if (this.rawFileData) {
        // clear not to exist duplicate file names
        let attachEntries;
        for (let pair of this.rawFileData.entries()) {
          attachEntries = this.formData.getAll('attach');// this is an array
          if (attachEntries.some(x => x.name === pair[1].name)) { // conflict
            let avoid = 0;
            let splitter = pair[1].name.lastIndexOf('.')
            do {
              avoid++;
            } while (attachEntries.some(x => x.name === pair[1].name.substring(0, splitter) + ` (${avoid})` + pair[1].name.substring(splitter, pair[1].name.length)));
            this.formData.append('attach', pair[1], pair[1].name.substring(0, splitter) + ` (${avoid})` + pair[1].name.substring(splitter, pair[1].name.length))
          } else { // no conflict in file names
            this.formData.append('attach', pair[1], pair[1].name)
          }
        }
      }
      return this.formData.getAll('attach').length;
    }
  },
  computed: {
    editor () {
      return this.$refs.editor.quill;
    }
  },
  watch: {
    isAnonymous: {
      handler (to) {
        if (to) this.disallowAnonymous = false;
      }
    }
  },
  created () {
    if (this.$route.params.boardId && this.documentId) {
      this.$axios
        .get(`/${this.$route.params.boardId}/${this.documentId}`)
        .then(response => {
          this.parseDocument(response.data)
        })
        .catch(error => {
          console.log(error)
          this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '글 내용을 불러오지 못했습니다.'}`, color: 'error' })
          this.$router.replace('/error?error=' + (error && error.response ? error.response.status || '404' : '404'));
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
#write-editor{
  width:100%;
  display:table;
  table-layout:fixed;
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
