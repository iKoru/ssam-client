<template>
    <v-layout column>
      <v-layout justify-space-between row py-2 px-2>
        <v-flex xs12 class="comment">
          <quill-editor
              v-model="content"
              ref="commentEditor"
              :options="editorOption">
            <div id="toolbar" slot="toolbar">
              <button ref="imageAttach" class="ql-image" value="image"></button>
            </div>
          </quill-editor>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-spacer v-if="$vuetify.breakpoint.smAndUp"/>
        <v-flex xs4 sm1 my-auto py-0 text-xs-left >
          <v-btn @click="$refs.imageAttach.click()" icon><v-icon>image</v-icon>이미지</v-btn>
        </v-flex>
        <v-flex xs4 sm1 text-xs-right my-auto py-0 mx-auto px-auto>
          <v-checkbox hide-details label="익명" v-model="isAnonymous">
          </v-checkbox>
        </v-flex>
        <v-flex xs4 my-auto sm2 text-xs-center>
          <v-btn small short @click="postComment">
              쓰기
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
    
    
</template>

<script>
import BoardMixins from '@/components/mixins/BoardMixins'

export default {
  name: 'WriteComment',
  mixins: [BoardMixins],
  props: ['commentTo'],
  data: () => ({
    editorOption: {
      placeholder: '댓글을 남겨주세요',

      modules: {
        toolbar: '#toolbar',
        imageDrop: true,
        imageResize: true
      },
      formData: undefined
    },
    content: '',
    isAnonymous: false,
  }),
  components: {
  },
  methods: {
    attachImages () {
      console.log(this.$refs.commentEditor.quill.editor.delta)
      this.imageCount = this.$refs.commentEditor.quill.editor.delta.ops.filter(item => item.insert.hasOwnProperty('image')).length
      return this.$refs.commentEditor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty('image')) {
          // random generated uuid should given here
          let imgSrc = item.insert.image
          let imageName = this.uuid() + '.' + imgSrc.substring("data:image/".length, imgSrc.indexOf(";base64"))
          console.log(imgSrc)
          this.formData.append('attach', this.dataURItoBlob(imgSrc), imageName)
          item.insert.image = imageName;
          // 취소되었을 때 이미지 source restore해야함
        }
      })
    },
    async postComment() {
      if (!this.formData) this.formData = new FormData()
      await this.attachImages()
      // this.formData.append('documentId', this.$route.params.documentId)
      // this.formData.append('contents', JSON.stringify(this.$refs.commentEditor.quill.editor.delta))
      // this.formData.append('isAnonymous', this.isAnonymous)
      let body = {}
      body['documentId'] = this.$route.params.documentId;
      if(this.commentTo) {
        body['parentCommentId'] = this.commetTo
      }
      body['contents'] = JSON.stringify(this.$refs.commentEditor.quill.editor.delta)
      body['isAnonymous'] = this.isAnonymous
      console.log(body)
      this.$axios.post('/comment',
      //  this.formData
      body
      ).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    console.log('write document')
  }
}
</script>
<style>
.comment .quill-editor .ql-container {
  min-height: 5rem;
  padding-bottom: 1rem;
}
.comment .quill-editor .ql-container .ql-editor {
  border-top: 1px solid #ccc;
  min-height: 5rem;
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