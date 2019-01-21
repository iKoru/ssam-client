<template>
  <v-layout column px-3>
    <v-flex class="comment-editor">
      <quill-editor v-model="content" ref="commentEditor" :options="editorOption">
        <div class="commentToolbar" slot="toolbar">
          <button ref="imageAttach" class="ql-image" value="image"></button>
        </div>
      </quill-editor>
    </v-flex>
    <v-flex>
      <v-layout row align-center>
        <span class="ml-3">
          <v-checkbox hide-details label="익명" v-model="anonymous" v-show="allowAnonymous" class="pt-0 mt-0"></v-checkbox>
        </span>
        <v-btn @click="$refs.imageAttach.click()" flat>
          <v-icon>image</v-icon>이미지
        </v-btn>

        <v-spacer/>
        <v-btn small @click="postComment" color="primary" class="short">쓰기</v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import BoardMixins from "@/components/mixins/BoardMixins";

export default {
  name: "WriteComment",
  mixins: [BoardMixins],
  props: ["commentTo", "isAnonymous", "allowAnonymous"],
  data() {
    return {
      editorOption: {
        placeholder: "댓글을 입력해주세요.",

        modules: {
          toolbar: ".commentToolbar",
          imageDrop: true,
          imageResize: true
        },
        formData: undefined
      },
      content: "",
      anonymous: this.isAnonymous,
      originImages: []
    };
  },
  components: {},
  methods: {
    attachImages() {
      console.log(this.$refs.commentEditor.quill.editor.delta);
      this.imageCount = this.$refs.commentEditor.quill.editor.delta.ops.filter(item => item.insert.hasOwnProperty("image")).length;
      return this.$refs.commentEditor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty("image")) {
          // random generated uuid should given here
          let imgSrc = item.insert.image;
          let imageName = this.uuid() + "." + imgSrc.substring("data:image/".length, imgSrc.indexOf(";base64"));
          console.log(imgSrc);
          this.formData.append("attach", this.dataURItoBlob(imgSrc), imageName);
          item.insert.image = imageName;
          this.originImages.push({name: imageName, src: imgSrc});
          // 취소되었을 때 이미지 source restore해야함
        }
      });
    },
    revertImages() {
      console.log(this.$refs.commentEditor);
      this.$refs.commentEditor.quill.editor.delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty("image")) {
          // random generated uuid should given here
          let imgName = item.insert.image;
          item.insert.image = this.originImages.find(img => img.name === imgName).src;
        }
      });
      this.originImages = [];
      console.log(this.$refs.commentEditor.quill.editor.delta.ops);
    },
    async postComment() {
      if (!this.formData) this.formData = new FormData();
      await this.attachImages();
      console.log(this.$route.params.documentId);
      this.formData.append("documentId", this.$route.params.documentId);
      this.formData.append("contents", JSON.stringify(this.$refs.commentEditor.quill.editor.delta));
      this.formData.append("isAnonymous", this.anonymous);
      if (this.commentTo) {
        this.formData.append("parentCommentId", this.commentTo);
      }
      this.$axios
        .post("/comment", this.formData)
        .then(res => {
          console.log(res);
          this.$refs.commentEditor.quill.setText("");
          this.revertImages();
          this.$emit("update");
          delete this.formData;
        })
        .catch(err => {
          console.log(err);
          delete this.formData;
          this.revertImages();
        });
    }
  }
};
</script>
<style>
.comment-editor .ql-toolbar.ql-snow + .ql-container.ql-snow {
  min-height: 5rem;
  border: 1px solid #e8e8e8;
  border-top: 1px solid #e8e8e8;
}
.comment-editor .quill-editor .ql-toolbar {
  display: none;
}
.comment-editor .ql-editor.ql-blank::before {
  font-style: normal;
}
</style>