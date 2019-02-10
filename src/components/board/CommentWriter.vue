<template>
  <v-layout column px-3>
    <v-flex class="comment-editor">
      <quill-editor v-model="content" ref="commentEditor" :options="editorOption">
      </quill-editor>
    </v-flex>
    <v-flex>
      <v-layout row align-center py-2>
        <span class="ml-3" v-show="allowAnonymous">
          <v-checkbox hide-details label="익명" v-model="anonymous" class="pt-0 mt-0" :disabled="isCommentWritable !== 'AVAILABLE' && isCommentWritable !== 'NEEDSUBSCRIPTION'"></v-checkbox>
        </span>
        <v-btn @click="selectImage" flat :class="{'my-0':true, 'ml-0':!allowAnonymous}" :disabled="isCommentWritable !== 'AVAILABLE' && isCommentWritable !== 'NEEDSUBSCRIPTION'">
          <v-icon>image</v-icon>이미지
        </v-btn>
        <v-spacer/>
        <v-btn small depressed @click="postComment" color="primary" class="short" :disabled="isCommentWritable !== 'AVAILABLE' && isCommentWritable !== 'NEEDSUBSCRIPTION'" :loading="loading">
          {{defaultComment?'수정':'등록'}}
        </v-btn>
        <v-btn v-if="defaultComment" small depressed @click="$emit('revokeUpdate')" color="default" class="short" >취소</v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import BoardMixins from '@/components/mixins/BoardMixins';
require('formdata-polyfill')
export default {
  name: 'WriteComment',
  mixins: [BoardMixins],
  props: ['commentTo', 'isAnonymous', 'allowAnonymous', 'isCommentWritable', 'boardId', 'defaultComment'],
  data () {
    return {
      editorOption: {
        placeholder: this.isCommentWritable === 'AVAILABLE' ? '댓글을 입력해주세요.' : this.isCommentWritable === 'UNAVAILABLE' ? '댓글을 작성할 수 있는 권한이 없습니다.' : this.isCommentWritable === 'RESTRICTED' ? '글쓰기가 제한되어 있습니다.' : this.isCommentWritable === 'DELETED' ? '삭제된 글입니다.' : '토픽 구독 후 입력된 댓글이 등록됩니다.',
        modules: {
          magicUrl: {
            urlRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|([\S]+.(?:com|kr|org|io|net|me))/,
            globalRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|([\S]+.(?:com|kr|org|io|net|me))/,
            normalizeRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|([\S]+.(?:com|kr|org|io|net|me))/
          },
          toolbar: undefined,
          imageDrop: true,
          imageResize: true
        },
        formData: undefined,
        theme: 'bubble'
      },
      content: '',
      anonymous: this.isAnonymous | true,
      originImages: [],
      loading: false
    };
  },
  components: {},
  mounted () {
    if (this.defaultComment) {
      console.log(this.defaultComment)
      let contents = JSON.parse(this.defaultComment.contents)
      console.log(contents)
      if (this.defaultComment.attach) {
        let image;
        contents.ops.forEach(item => {
          if (item.insert.hasOwnProperty('image')) {
            image = this.defaultComment.attach.find(x => x.attach_name === item.insert.image);
            console.log(image)
            if (image) {
              image.insert = true;
              item.insert.image = this.webUrl + '/' + image.attach_path
            }
          }
        })
      }
      console.log(contents)
      this.$refs.commentEditor.quill.setContents(contents)
    }
  },
  methods: {
    onEditorChange ({ quill, html, text }) {
      this.content = html;
    },
    selectImage () {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();
      // Listen upload local image and save to server
      input.onchange = () => {
        const file = input.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          // file type is only image.
          if (/^image\//.test(file.type)) {
            let commentEditor = this.$refs.commentEditor
            let range = commentEditor.quill.getSelection()
            console.log(range)
            commentEditor.quill.insertEmbed(range == null ? commentEditor.quill.getLength() : range.index, 'image', reader.result);
          } else {
            this.$store.dispatch('showSnackbar', { text: '이미지 파일만 업로드할 수 있습니다.', color: 'error' })
          }
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      };
    },
    attachImages () {
      return this.$refs.commentEditor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty('image')) {
          if (item.insert.image.includes('data:image')) {
            let imgSrc = item.insert.image;
            let imageName = this.uuid() + '.' + imgSrc.substring('data:image/'.length, imgSrc.indexOf(';base64'));
            this.formData.append('attach', this.dataURItoBlob(imgSrc), imageName);
            item.insert.image = imageName;
            this.originImages.push({ name: imageName, src: imgSrc });
          }
        }
      });
    },
    revertImages () {
      this.$refs.commentEditor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty('image')) {
          // random generated uuid should given here
          let imgName = item.insert.image;
          item.insert.image = this.originImages.find(img => img.name === imgName).src;
        }
      });
      this.originImages = [];
    },
    async postComment () {
      this.loading = true;
      if (this.isCommentWritable === 'NEEDSUBSCRIPTION') {
        try {
          await this.$axios.post('/user/board', { boardId: this.boardId }, { headers: { silent: true } });
        } catch (error) {
          if (!error.response || error.response.status !== 409) {
            this.loading = false;
            this.$store.dispatch('showSnackbar', { text: `${error && error.response && error.response.data ? error.response.data.message || '댓글을 쓰기 위한 구독을 하지 못했습니다.' : '댓글을 쓰기 위한 구독을 하지 못했습니다.'}`, color: 'error' });
            return;
          }
        }
        this.$store.dispatch('addUserBoard', Object.assign({}, this.$store.getters.boards.find(x => x.boardId === this.boardId)));
        this.$store.dispatch('showSnackbar', { text: `${this.$store.getters.boards.find(x => x.boardId === this.boardId).boardName} 토픽을 구독하였습니다.`, color: 'info' });
      }

      if (!this.content || this.content.trim() === '') {
        this.$store.dispatch('showSnackbar', { text: '댓글 내용을 입력해주세요.', color: 'error' })
        return;
      }
      if (!this.formData) this.formData = new FormData();
      await this.attachImages();
      if (this.defaultComment) {
        await this.updateComment();
        return;
      }
      this.formData.append('documentId', this.$route.params.documentId);
      this.formData.append('contents', JSON.stringify(this.$refs.commentEditor.quill.editor.delta));
      this.formData.append('isAnonymous', this.anonymous);
      if (this.commentTo) {
        this.formData.append('parentCommentId', this.commentTo);
      }
      this.$axios
        .post('/comment', this.formData, { headers: { silent: true } })
        .then(res => {
          this.$refs.commentEditor.quill.setText('');
          this.revertImages();
          this.loading = false;
          this.$emit('update');
          delete this.formData;
        })
        .catch(error => {
          console.log(error);
          delete this.formData;
          this.revertImages();
          this.loading = false;
          this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '댓글을 등록하지 못했습니다.'}`, color: 'error' });
        });
    },
    async updateComment () {
      if (!confirm('댓글을 수정하시겠습니까?')) {
        this.loading = false;
        return;
      }
      // Convert Images And Upload First
      try {
        if (!this.formData) this.formData = new FormData();
        if (this.defaultComment.parentCommentId) {
          this.formData.append('parentCommentId', this.defaultComment.parentCommentId);
        }
        this.formData.append('documentId', this.$route.params.documentId);
        this.formData.append('commentId', this.defaultComment.commentId)
        await this.attachImages(); // change image url here
        await this.processFileChange()
        let modifiedBody = {
          documentId: this.$route.params.documentId,
          commentId: this.defaultComment.commentId,
          contents: JSON.stringify(this.$refs.commentEditor.quill.editor.delta)
        }
        console.log(modifiedBody)
        return this.$axios
          .put(`/comment`, modifiedBody)
          .then(response => {
            this.loading = false;
            if (response.status === 200) {
              console.log(response)
              this.$store.dispatch('showSnackbar', { text: '댓글을 수정하였습니다', color: 'success' })
              this.$emit('update');
            }
          })
          .catch(error => {
            this.loading = false;
            this.$store.dispatch('showSnackbar', { text: '댓글 수정에 실패했습니다. 다시 시도해주세요', color: 'error' })
            console.log(error.response);
          })
      } catch (err) {
        this.loading = false;
        console.log(err)
        this.$store.dispatch('showSnackbar', { text: '댓글 수정에 실패했습니다. 다시 시도해주세요', color: 'error' })
        this.revertImages();
        delete this.formData
      }
    },
    async processFileChange () {
      let attachFromServer = this.defaultComment.attach.filter(a => a !== null)
      let currentImageId = this.$refs.commentEditor.quill.editor.delta.ops.map(item => {
        if (item.insert.hasOwnProperty('image')) {
          if (item.insert.image.startsWith('/attach')) {
            // '/attach/:documentId(^[\\d]+$)/:attachId
            return attachFromServer.find(a => item.insert.image === '/' + a.attach_path).attach_id
          }
        }
      });
      let deleteImageP, uploadFileP
      attachFromServer.forEach(a => {
        if (a.insert && !currentImageId.filter(i => i !== undefined).includes(a.attach_id)) {
          deleteImageP = this.$axios
            .delete(`/comment/attach/${this.documentId}/${a.attach_id}`)
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
      let fileCount = 0;
      for (let pair of this.formData.entries()) {
        if (pair[0] === 'attach') fileCount += 1;
      }
      if (fileCount > 0) {
        uploadFileP = this.$axios
          .post(`/comment/attach`, this.formData)
          .then(response => {
            if (response.status === 200) {
              console.log(response)
            }
          })
          .catch(error => {
            console.log(error.response);
          });
      }
      await Promise.all([deleteImageP, uploadFileP])
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          this.$store.dispatch('showSnackbar', { text: ' 댓글 수정에 실패했습니다. 다시 시도해주세요', color: 'error' })
        })
    }
  }
};
</script>
<style>
.comment-editor .ql-container.ql-bubble {
  min-height: 5rem;
  border: 1px solid #e8e8e8;
  border-top: 1px solid #e8e8e8;
}
.comment-editor .quill-editor .ql-bubble .ql-tooltip {
  z-index: 1;
}
.comment-editor .ql-bubble .ql-picker.ql-size {
  width: 60px;
}
.comment-editor .ql-editor.ql-blank::before {
  font-style: normal;
}
.comment-editor .video-container {
  position: relative;
  height: 0;
  width: 100%;
  padding-bottom: 56%;
}
.comment-editor .video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
