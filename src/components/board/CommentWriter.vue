<template>
  <v-layout column px-3>
    <v-flex class="comment-editor">
      <quill-editor v-model="content" ref="commentEditor" :options="editorOption">
        <div class="commentToolbar" slot="toolbar">
          <button class="ql-bold">Bold</button>
          <button class="ql-italic">Italic</button>
          <!-- Add font size dropdown -->
          <select class="ql-size">
            <option value="small">작게</option>
            <!-- Note a missing, thus falsy value, is used to reset to default -->
            <option selected>보통</option>
            <option value="large">크게</option>
          </select>
          <button ref="imageAttach" class="ql-image" value="image" v-show="false"></button>
        </div>
      </quill-editor>
    </v-flex>
    <v-flex>
      <v-layout row align-center py-2>
        <span class="ml-3" v-show="allowAnonymous">
          <v-checkbox hide-details label="익명" v-model="anonymous" class="pt-0 mt-0" :disabled="isCommentWritable !== 'AVAILABLE' && isCommentWritable !== 'NEEDSUBSCRIPTION'"></v-checkbox>
        </span>
        <v-btn @click="$refs.imageAttach.click()" flat :class="{'my-0':true, 'ml-0':!allowAnonymous}" :disabled="isCommentWritable !== 'AVAILABLE' && isCommentWritable !== 'NEEDSUBSCRIPTION'">
          <v-icon>image</v-icon>이미지
        </v-btn>
        <v-spacer/>
        <v-btn small @click="postComment" color="primary" class="short" :disabled="isCommentWritable !== 'AVAILABLE' && isCommentWritable !== 'NEEDSUBSCRIPTION'" :loading="loading">등록</v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import BoardMixins from "@/components/mixins/BoardMixins";

export default {
  name: "WriteComment",
  mixins: [BoardMixins],
  props: ["commentTo", "isAnonymous", "allowAnonymous", "isCommentWritable", "boardId"],
  data() {
    return {
      editorOption: {
        placeholder: this.isCommentWritable === 'AVAILABLE'?"댓글을 입력해주세요.":(this.isCommentWritable === 'UNAVAILABLE'?'댓글을 작성할 수 있는 권한이 없습니다.':(this.isCommentWritable === 'RESTRICTED'?'글쓰기가 제한되어 있습니다.':'토픽 구독 후 입력된 댓글이 등록됩니다.')),
        modules: {
          magicUrl: {
            urlRegularExpression:/(https?:\/\/[\S]+)|(www.[\S]+)|([\S]+.(?:com|kr|org|io|net|me))/,
            globalRegularExpression:/(https?:\/\/[\S]+)|(www.[\S]+)|([\S]+.(?:com|kr|org|io|net|me))/,
            normalizeRegularExpression:/(https?:\/\/[\S]+)|(www.[\S]+)|([\S]+.(?:com|kr|org|io|net|me))/
          },
          toolbar: ".commentToolbar",
          imageDrop: true,
          imageResize: true
        },
        formData: undefined,
        theme:'bubble'
      },
      content: "",
      anonymous: this.isAnonymous,
      originImages: [],
      loading:false
    };
  },
  components: {},
  methods: {
    attachImages() {
      this.imageCount = this.$refs.commentEditor.quill.editor.delta.ops.filter(item => item.insert.hasOwnProperty("image")).length;
      return this.$refs.commentEditor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty("image")) {
          // random generated uuid should given here
          let imgSrc = item.insert.image;
          let imageName = this.uuid() + "." + imgSrc.substring("data:image/".length, imgSrc.indexOf(";base64"));
          this.formData.append("attach", this.dataURItoBlob(imgSrc), imageName);
          item.insert.image = imageName;
          this.originImages.push({name: imageName, src: imgSrc});
          // 취소되었을 때 이미지 source restore해야함
        }
      });
    },
    revertImages() {
      this.$refs.commentEditor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty("image")) {
          // random generated uuid should given here
          let imgName = item.insert.image;
          item.insert.image = this.originImages.find(img => img.name === imgName).src;
        }
      });
      this.originImages = [];
    },
    async postComment() {
      this.loading = true;
      if(this.isCommentWritable === 'NEEDSUBSCRIPTION'){
        try{
          await this.$axios.post('/user/board', {boardId:this.boardId}, {headers:{silent:true}})
        }catch(error){
          if(!error.response || error.response.status !== 409){
            this.loading = false;
            this.$store.dispatch("showSnackbar", {text: `${error && error.response && error.response.data ? error.response.data.message || '댓글을 쓰기 위한 구독을 하지 못했습니다.' : "댓글을 쓰기 위한 구독을 하지 못했습니다."}`, color: "error"});
            return;
          }
        }
        this.$store.dispatch("addUserBoard", Object.assign({}, this.$store.getters.boards.find(x=>x.boardId === this.boardId)));
        this.$store.dispatch("showSnackbar", {text: `${this.$store.getters.boards.find(x=>x.boardId === this.boardId).boardName} 토픽을 구독하였습니다.`, color: "info"});
      }
      if (!this.formData) this.formData = new FormData();
      await this.attachImages();
      this.formData.append("documentId", this.$route.params.documentId);
      this.formData.append("contents", JSON.stringify(this.$refs.commentEditor.quill.editor.delta));
      this.formData.append("isAnonymous", this.anonymous);
      if (this.commentTo) {
        this.formData.append("parentCommentId", this.commentTo);
      }
      this.$axios
        .post("/comment", this.formData, {headers:{silent:true}})
        .then(res => {
          this.$refs.commentEditor.quill.setText("");
          this.revertImages();
          this.loading = false;
          this.$emit("update");
          delete this.formData;
        })
        .catch(error => {
          console.log(error);
          delete this.formData;
          this.revertImages();
          this.loading = false;
          this.$store.dispatch("showSnackbar", {text: `${error.response ? error.response.data.message : "댓글을 등록하지 못했습니다."}`, color: "error"});
        });
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
  z-index:1
}
.comment-editor .ql-bubble .ql-picker.ql-size {
  width: 60px;
}
.comment-editor .ql-editor.ql-blank::before {
  font-style: normal;
}
</style>