<template>
  <v-layout column>
    <v-flex class="comment-editor px-3">
      <quill-editor ref="commentEditor" :options="editorOption"></quill-editor>
    </v-flex>
    <v-flex class="comment-writer-actions">
      <v-layout row align-center py-2 pr-2 :justify-end="$vuetify.breakpoint.xsOnly">
        <span class="ml-3" v-show="allowAnonymous">
          <v-checkbox hide-details label="익명" v-model="anonymous" class="pt-0 mt-0 small" :readonly="!!defaultComment" :disabled="isCommentWritable !== 'AVAILABLE' && isCommentWritable !== 'NEEDSUBSCRIPTION'"></v-checkbox>
        </span>
        <v-btn @click="selectImage" small flat :class="{'my-0':true, 'ml-0':!allowAnonymous}" :icon="$vuetify.breakpoint.xsOnly" :disabled="isCommentWritable !== 'AVAILABLE' && isCommentWritable !== 'NEEDSUBSCRIPTION'">
          <v-icon>image</v-icon><span v-if="$vuetify.breakpoint.smAndUp" class="ml-2">이미지</span>
        </v-btn>
        <v-spacer/>
        <v-btn v-if="defaultComment" small depressed @click="$emit('revokeUpdate')" class="short ma-0">취소</v-btn>
        <v-btn small depressed @click="postComment" color="primary" class="short my-0" :disabled="isCommentWritable !== 'AVAILABLE' && isCommentWritable !== 'NEEDSUBSCRIPTION'" :loading="loading">{{defaultComment?'수정':'등록'}}</v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import BoardMixins from '@/components/mixins/BoardMixins';
import 'formdata-polyfill'

export default {
  name: 'WriteComment',
  mixins: [BoardMixins],
  props: ['commentTo', 'isAnonymous', 'allowAnonymous', 'isCommentWritable', 'boardId', 'defaultComment', 'focus'],
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
          imageDrop: true
        },
        formData: undefined,
        theme: 'bubble',
        spellCheck: false
      },
      anonymous: this.isAnonymous || true,
      newlyAddedImages: [],
      loading: false
    };
  },
  components: {},
  mounted () {
    if (this.defaultComment) {
      let contents = JSON.parse(this.defaultComment.contents);
      if (this.defaultComment.attach && this.defaultComment.attach.some(x => x)) {
        contents.ops.filter(item => item.insert.image && this.defaultComment.attach.some(x => x && x.attach_name === item.insert.image)).forEach(item => {
          item.insert.image = this.webUrl + this.defaultComment.attach.find(x => x && x.attach_name === item.insert.image).attach_path;
        });
      }
      this.$refs.commentEditor.quill.setContents(contents);
    }
    if (this.focus) {
      try {
        this.$refs.commentEditor.quill.setSelection(this.$refs.commentEditor.quill.getLength());
      } catch (error) {
      }
    }
  },
  methods: {
    async selectImage () {
      let input = document.getElementById('commentFile')
      if (!input) {
        input = document.createElement('input');
        input.setAttribute('id', 'commentFile');
        input.setAttribute('type', 'file');
        input.setAttribute('multiple', 'multiple');
        input.setAttribute('accept', 'image/*');
        input.classList.add('d-none');
        document.body.appendChild(input);
      }
      // Listen upload local image and save to server
      input.onchange = async () => {
        let reader = new FileReader();
        let quill = this.$refs.commentEditor.quill;
        reader.onerror = function (error) {
          console.log(error);
          this.$store.dispatch('showSnackbar', { text: '파일을 업로드하지 못했습니다.', color: 'error' });
        };
        for (let i = 0; i < input.files.length; i++) {
          if (input.files[i].type.startsWith('image/')) {
            if (input.files[i].size > 1024 * 1024 * 8) {
              this.$store.dispatch('showSnackbar', { text: '최대 8MB 이하의 이미지만 업로드할 수 있습니다.', color: 'error' });
            } else {
              await new Promise((resolve) => {
                this.$loadImage(input.files[i], (img) => {
                  if (img.type === 'error') {
                    this.$store.dispatch('showSnackbar', { text: '이미지를 업로드하지 못했습니다.', color: 'error' });
                  }
                  let range = quill.getSelection()
                  if (range) {
                    if (quill.getLine(range.index)[1]) { // current line has the contents
                      quill.insertText(range.index, '\n')
                      range.index++;
                    }
                    quill.insertEmbed(range.index, 'image', img.toDataURL(input.files[i].type, (input.files[i].type === 'image/jpeg' || input.files[i].type === 'image/webp') ? 0.91 : undefined));
                    quill.insertText(++range.index, '\n')
                    quill.setSelection(++range.index)
                  } else {
                    let index = quill.getLength()
                    if (quill.getLine(index)[1]) { // last line has the contents
                      quill.insertText(index, '\n')
                      index++;
                    }
                    quill.insertEmbed(index, 'image', img.toDataURL(input.files[i].type, (input.files[i].type === 'image/jpeg' || input.files[i].type === 'image/webp') ? 0.91 : undefined));
                    quill.insertText(++index, '\n')
                    quill.setSelection(++index)
                  }
                  resolve();
                }, { canvas: true, orientation: true, meta: true })
              })
            }
          } else {
            this.$store.dispatch('showSnackbar', { text: '이미지 파일만 업로드할 수 있습니다.', color: 'error' });
          }
        }
        try {
          input.value = '';
        } catch (error) {
          input.parentNode.removeChild(input);
        }
      };
      input.click();
    },
    attachImages () {
      this.$refs.commentEditor.quill.editor.delta.ops.forEach(item => {
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
      this.$refs.commentEditor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.image && this.defaultComment.attach.some(x => x && x.attach_path === item.insert.image)) {
          item.insert.image = this.defaultComment.attach.find(x => x && x.attach_path === item.insert.image).attach_name;
        }
      });
    },
    revertImages () {
      this.$refs.commentEditor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.image && this.newlyAddedImages.some(x => x.attach_name === item.insert.image)) {
          item.insert.image = this.newlyAddedImages.find(x => x.attach_name === item.insert.image).base64;
        } else if (item.insert.image && this.defaultComment.attach.some(x => x && x.attach_name === item.insert.image)) {
          item.insert.image = this.webUrl + this.defaultComment.attach.find(x => x && x.attach_name === item.insert.image).attach_path
        }
      });
      this.newlyAddedImages = [];
    },
    async postComment () {
      if (this.isCommentWritable === 'NEEDSUBSCRIPTION') {
        try {
          await this.$axios.post('/user/board', { boardId: this.boardId }, { headers: { silent: true } });
        } catch (error) {
          if (!error.response || error.response.status !== 409) {
            this.$store.dispatch('showSnackbar', { text: `${error && error.response && error.response.data ? error.response.data.message || '댓글을 쓰기 위한 구독을 하지 못했습니다.' : '댓글을 쓰기 위한 구독을 하지 못했습니다.'}`, color: 'error' });
            return;
          }
        }
        this.$store.dispatch('addUserBoard', Object.assign({}, this.$store.getters.boards.find(x => x.boardId === this.boardId)));
        this.$store.dispatch('showSnackbar', { text: `${this.$store.getters.boards.find(x => x.boardId === this.boardId).boardName} 토픽을 구독하였습니다.`, color: 'info' });
      }

      if (this.$refs.commentEditor.quill.getText().replace(/\n/g, '').trim() === '' && this.$refs.commentEditor.quill.editor.delta.ops.every(x => typeof x.insert === 'string')) {
        this.$store.dispatch('showSnackbar', { text: '댓글 내용을 입력해주세요.', color: 'error' });
        return;
      }

      try {
        this.$refs.commentEditor.quill.emitter.emit('text-change', this.$refs.commentEditor.quill.editor.delta)
      } catch (error) {
      }
      try {
        if (!this.formData) this.formData = new FormData();
        this.attachImages();
        if (this.defaultComment) {
          await this.updateComment();
          return;
        }

        this.loading = true;
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
      } catch (error) {
        this.loading = false;
        console.log(error);
        this.$store.dispatch('showSnackbar', { text: `댓글을 등록하지 못했습니다. 다시 시도해주세요.[${error.message || error}]`, color: 'error' });
        this.revertImages();
        delete this.formData;
      }
    },
    async updateComment () {
      // Convert Images And Upload First
      try {
        this.restoreServerImages();
        if (this.defaultComment.parentCommentId) {
          this.formData.append('parentCommentId', this.defaultComment.parentCommentId);
        }
        this.formData.append('documentId', this.defaultComment.documentId);
        this.formData.append('commentId', this.defaultComment.commentId);
        if (await this.processFileChange()) {
          this.loading = true;
          this.$axios
            .put(`/comment`, { documentId: this.$route.params.documentId, commentId: this.defaultComment.commentId, contents: JSON.stringify(this.$refs.commentEditor.quill.editor.delta) })
            .then(response => {
              this.loading = false;
              this.$store.dispatch('showSnackbar', { text: '댓글을 수정하였습니다.', color: 'success' });
              this.$emit('update');
            })
            .catch(error => {
              console.log(error);
              this.loading = false;
              this.revertImages();
              this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '댓글을 수정하지 못했습니다. 다시 시도해주세요.'}`, color: 'error' });
            });
        } else {
          this.loading = false;
          this.revertImages();
          delete this.formData;
        }
      } catch (error) {
        this.loading = false;
        console.log(error);
        this.$store.dispatch('showSnackbar', { text: `댓글을 수정하지 못했습니다. 다시 시도해주세요.[${error.message || error}]`, color: 'error' });
        this.revertImages();
        delete this.formData;
      }
    },
    async processFileChange () {
      // new images are already in formdata
      // process deleted images
      let currentImageId = this.$refs.commentEditor.quill.editor.delta.ops.filter(ops => ops.insert.image && this.defaultComment.attach.some(a => a && ops.insert.image === a.attach_name)).map(item => {
        return this.defaultComment.attach.find(a => a && item.insert.image === a.attach_name).attach_id
      })

      let promises = []
      this.defaultComment.attach.forEach(a => {
        if (a && a.insert && !currentImageId.includes(a.attach_id)) { // inserted image, currently deleted
          promises.push(this.$axios.delete(`/comment/attach/${this.defaultComment.commentId}/${a.attach_id}`));
        }
      })

      if (this.newlyAddedImages.length > 0) { // newly added attach and images
        promises.push(this.$axios.post(`/comment/attach`, this.formData));
      }
      if (promises.length > 0) {
        await Promise.all(promises)
          .catch(error => {
            console.log(error)
            this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '댓글을 수정하지 못했습니다. 다시 시도해주세요'}`, color: 'error' })
            return false;
          })
      }
      return true;
    }
  }
};
</script>
<style>
.comment-editor{
  width:100%;
  display:table;
  table-layout:fixed;
}
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
.comment-writer-actions .small label{
  margin-top:auto;
  margin-bottom:auto;
}
</style>
