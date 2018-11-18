<template>
  <div id="app">

    <file-pond
        class="image-attachment"
        name="test"
        ref="pond"
        class-name="my-pond"
        label-idle="숨겨진 이미지 첨부"
        allow-multiple="true"
        v-bind:files="files"
        instantUpload="false"
        accepted-file-types="image/jpeg, image/png, image/jpg"
        v-on:init="handleFilePondInit"
        :file-rename-function="renameFile"
        />
    <v-btn class="primary" @click="manualUpload">수동업로드</v-btn>
  </div>
</template>

<script>
// Import FilePond
import vueFilePond from 'vue-filepond'

// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js'
import FilePondPluginFileRename from 'filepond-plugin-file-rename'

// Create FilePond component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview, FilePondPluginFileRename)

export default {
  data: function () {
    return {
      files: [],
      server: {},
      imgExtension: ''
    }
  },
  methods: {
    handleFilePondInit: function () {
      console.log('FilePond has initialized')

      // example of instance method call on pond reference
      this.$refs.pond.getFiles()
    },
    handleProcessFile: function () {
      this.$refs.pond.processFiles().then(files => {
        console.log(files)
      })
    },
    handleProcessFileStart: function () {

    },
    handleProcessFileAbort: function () {

    },
    handleProcessFileUndo: function () {

    },
    manualUpload: function () {
      this.handleProcessFile()
    },
    addImages: function (images) {
      const pond = this.$refs.pond
      images.forEach((image, index) => {
        let src = image.src
        pond.addFiles([src]).then(res => {
          if (index == images.length - 1) {
            this.$emit('imageAttached')
          }
        })
      })
      // quill 에서 받아서 임베드로 대체하기(임베드에 어떤거 들어갈지 정해지면)
      // 툴바로 업로드했을때도 동일하게 처리하기  -할 필요 없음 어차피 다르게 됨(업로드시에 보낼거임)
      // 임베드로 뭘로 박을지되면, 설문조사 툴바로 만들기 해보기
    },
    renameFile: function (file) {
      // unique id
      return file.name
    }
  },
  components: {
    FilePond
  },
  mounted () {
  }
}
</script>
<style>
.image-attachment .filepond--root {
    height: 50px!important;
}
</style>
