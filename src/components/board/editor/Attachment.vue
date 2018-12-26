<template>
  <div id="app">
    <file-pond
        name="attachment"
        ref="pond"
        instantUpload="false"
        allow-multiple="true"
        accepted-file-types="application/zip, application/x-hwp, application/pdf, image/jpeg, image/png, image/jpg"
        :server="server"
        @addfile="handleFilePondAddFile"
        @removefile="handleFilePondRemoveFile"
        v-on:init="handleFilePondInit"/>
    <button @click="manualUpload">수동업로드</button>
  </div>
</template>

<script>
// Import FilePond
import vueFilePond, {setOptions} from 'vue-filepond'

// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js'

// Create FilePond component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)
setOptions({
  labelIdle: "파일을 여기로 끌어다놓거나 여기를 클릭하여 올려주세요.",
  // labelFileWaitingForSize: "파일의 크기를 확인중입니다...",
  // labelFileSizeNotAvailable: "파일의 크기를 확인할 수 없습니다.",
  // labelFileLoading: "이미지를 불러오는 중...",
  // labelFileLoadError: "이미지를 불러오지 못헀습니다.",
  // labelFileProcessing: "서버로 업로드중...",
  // labelFileProcessingComplete: "이미지를 서버로 업로드하였습니다.",
  // labelFileProcessingAborted: "업로드가 취소되었습니다.",
  // labelFileProcessingError: "이미지를 업로드하지 못했습니다.",
  // labelTapToCancel: "",
  // labelTapToRetry: "재시도",
  // labelTapToUndo: "",
  // labelButtonRemoveItem: "삭제",
  // labelButtonAbortItemLoad: "중지",
  // labelButtonRetryItemLoad: "재시도",
  // labelButtonAbortItemProcessing: "취소",
  // labelButtonUndoItemProcessing: "재시도",
  labelButtonProcessItem: "업로드",
  labelFileTypeNotAllowed: "허용된 파일 형식이 아닙니다.",
  fileValidateTypeLabelExpectedTypes: "(어떤ㄷ 종류의) 파일만 업로드 가능합니다.",
  allowRevert: false
});

export default {
  name: 'Attachment',
  data: function () {
    return {
      files: [],
       server: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          const formData = new FormData();
          formData.append("picture", file, file.name);
          this.$axios
            .post("/user/picture", formData)
            .then(response => {
              // this.profile.picturePath = response.data.picturePath;
              // this.dialog = false;
              // this.$store.dispatch("updateProfile", {picturePath: this.profile.picturePath});
              console.log(response)
              load();
            })
            .catch(error => {
              abort();
              console.log(error)
              // this.$store.dispatch("showSnackbar", {text: `${error.response ? error.response.data.message : "프로필 이미지를 업로드하지 못했습니다."}`, color: "error"});
            });
          return {load, error, progress, abort};
        }
      }
    }
  },
  methods: {
    handleFilePondInit: function () {
      console.log('FilePond has initialized')

      // example of instance method call on pond reference
      this.$refs.pond.getFiles()
    },
    handleFilePondAddFile: function (error, file) {
      console.log(error)
      this.$emit('fileAttached', file.filename)
    },
    handleFilePondRemoveFile: function (error, file) {
      console.log(error)
      this.$emit('fileRemoved', file.filename)
    },
    handleProcessFile: function () {
      this.$refs.pond.processFiles().then(files => {
        console.log(files)
      }).catch(err=> console.log(err))
    },
    manualUpload: function () {
      this.handleProcessFile()
    },
    addImage: function (imageSrc) {
      return this.$refs.pond.addFile(imageSrc)
      // quill 에서 받아서 임베드로 대체하기(임베드에 어떤거 들어갈지 정해지면)
      // 툴바로 업로드했을때도 동일하게 처리하기  -할 필요 없음 어차피 다르게 됨(업로드시에 보낼거임)
      // 임베드로 뭘로 박을지되면 , 설문조사 툴바로 만들기 해보기
    },
    browseFile: function () {
      this.$refs.pond.browse()
    }
  },
  components: {
    FilePond
  },
  created () {
    this.$refs.pond.addEventListener('FilePond:addfile', e => {
      console.log('File added', e.detail);
    });
  }
}
</script>
<style>
.filepond--root {
    height: 100px;
}
</style>
