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
        accepted-file-types="image/jpeg, image/png, image/jpg"
        :server="server"
        v-on:init="handleFilePondInit"/>
    <button @click="manualUpload">수동업로드</button>
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
  name: 'Attachment',
  data: function () {
    return { files: [],
      server: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
            console.log('process')
            // fieldName is the name of the input field
            // file is the actual file object to send
            const formData = new FormData();
            formData.append(fieldName, file, file.name);

            // const request = new XMLHttpRequest();
            console.log(this.$axios.defaults.baseURL)
            // request.open('POST', '/document');
            this.$axios.post('/document', {
              boardId: this.$route.params.boardId,
              title: "attachment test",
              contents: "please go",
              isAnonymous: true,
              allowAnonymous: true,
              attachment: {
                attachId: 'test', 
                attachType: 'image',
                attacyPath: 'test',
                attachName: 'no'
              }
            }).then(res => {
              console.log(res)
            }).catch(err => {
              console.log(err)
              console.log(err.response)
            })
            // Should call the progress method to update the progress to 100% before calling load
            // Setting computable to false switches the loading indicator to infinite mode
            // request.upload.onprogress = (e) => {
            //     progress(e.lengthComputable, e.loaded, e.total);
            // };

            // // Should call the load method when done and pass the returned server file id
            // // this server file id is then used later on when reverting or restoring a file
            // // so your server knows which file to return without exposing that info to the client
            // request.onload = function() {
            //     if (request.status >= 200 && request.status < 300) {
            //         // the load method accepts either a string (id) or an object
            //         load(request.responseText);
            //     }
            //     else {
            //         // Can call the error method if something is wrong, should exit after
            //         error('oh no');
            //     }
            // };

            // request.send(formData);
            
            // Should expose an abort method so the request can be cancelled
            return {
                abort: () => {
                    // This function is entered if the user has tapped the cancel button
                    request.abort();

                    // Let FilePond know the request has been cancelled
                    abort();
                }
            };
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
  }
}
</script>
<style>
.filepond--root {
    height: 100px;
}
</style>
