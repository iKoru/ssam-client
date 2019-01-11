<template>
    <v-layout column >
      <v-layout justify-space-between row py-2 px-2>
        <v-flex xs12 class="comment">
          <quill-editor
                      v-model="content"
                      ref="editor"
                      :options="editorOption">
            <div id="toolbar" slot="toolbar">
              <button ref="imageAttach" class="ql-image" value="image"></button>
            </div>
          </quill-editor>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs4 sm2 my-auto py-0 text-xs-center >
          <v-btn @click="$refs.imageAttach.click()">이미지</v-btn>
        </v-flex>
        <v-flex xs4 sm1 text-xs-center my-0 py-0 px-0 mx-0>
          <v-checkbox hide-details label="익명">
          </v-checkbox>
        </v-flex>

        <v-spacer v-if="$vuetify.breakpoint.smAndUp"/>
        <v-flex xs4 sm2 text-xs-center>
          <v-btn full-width>
              달기
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
    
    
</template>

<script>
export default {
  name: 'WriteComment',
  data: () => ({
    editorOption: {
      placeholder: '댓글을 남겨주세요',

      modules: {
        toolbar: '#toolbar',
        imageDrop: true,
        imageResize: true
      }
    },
    content: ''
  }),
  components: {
  },
  created () {
    console.log('write document')
  }
}
</script>
<style>
.comment .quill-editor .ql-container .ql-editor {
  /* height: 5rem; */
  padding-bottom: 1rem;
}

.comment .quill-editor .ql-toolbar{
  height: 0;
  padding: 0;
  visibility: hidden;
}
.comment .quill-editor .ql-toolbar button{
  height: 0;
  padding: 0;
  visibility: hidden;
}
.v-input {
  margin-top: 0;
  margin-bottom: 0;
}
</style>