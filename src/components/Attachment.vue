<template>
  <div id="app">

    <file-pond
        name="test"
        ref="pond"
        class-name="my-pond"
        label-idle="클릭하거나 파일을 끌어다 놓으세요"
        allow-multiple="true"
        v-bind:files="files"
        instantUpload="false"
        accepted-file-types="application/octet-stream, images/*, application/*"
        v-on:init="handleFilePondInit"/>
    <button @click="manualUpload">수동업로드</button>
    <attachment />
  </div>
</template>

<script>
// Import FilePond
import vueFilePond from 'vue-filepond'

// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js'

// Create FilePond component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)

export default {
  name: 'app',
  data: function () {
    return { files: [],
      server: {} }
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
    }
  },
  components: {
    FilePond
  }
}
</script>
<style>
.filepond--root {
    height: 200px;
}
</style>
