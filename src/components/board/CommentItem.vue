<template>
  <v-list-tile-content :class="{'py-1':true, 'pl-1':children}">
    <v-list-tile-title>
      <v-layout row>
        <v-flex>
          <div v-html="deltaToHTML(JSON.parse(comment.contents))" class="commentContents"></div>
        </v-flex>
      </v-layout>
    </v-list-tile-title>
    <v-list-tile-sub-title>
      <v-layout row>
        <!--prettyhtml-ignore-->
        <v-flex my-auto text-xs-left>
          <component :is="comment.nickName === ''?'span':'b'" :class="{'body--text':comment.nickName!==''}">{{comment.nickName === '' ? '익명' : comment.nickName}}</component>
          <small class="accent--text">({{comment.animalName}})</small> {{$moment(comment.writeDateTime, 'YYYYMMDDHHmmss').isSame($moment(), 'day')?$moment(comment.writeDateTime, 'YYYYMMDDHHmmss').format('HH:mm'):timeParser(comment.writeDateTime)}}
          <span v-if="!children" class="cursor-pointer" @click="$emit('openRecomment', commentIndex)" title="답글 쓰기">
            답글{{comment.childCount > 0? `(${comment.childCount})`:""}}
          </span>
        </v-flex>
        <v-spacer/>
        <v-flex text-xs-right px-2 my-auto>
          <span @click="voteUp" class="cursor-pointer" title="추천">
            <v-icon color="primary" small>thumb_up</v-icon>
            <b class="mx-1 body--text">{{comment.voteUpCount}}</b> |
          </span>
          <template v-if="comment.isWriter">
            <span class="subheading cursor-pointer" @click="updateComment">수정</span> |
            <span class="subheading cursor-pointer" @click="deleteComment">삭제</span>
          </template>
          <span class="subheading cursor-pointer" @click="reportComment" v-else>신고</span>
        </v-flex>
      </v-layout>
    </v-list-tile-sub-title>
  </v-list-tile-content>
</template>

<script>
import BoardMixins from "@/components/mixins/BoardMixins";
import Quill from "quill";

export default {
  props: ["comment", "commentIndex", "children"],
  mixins: [BoardMixins],
  methods: {
    voteUp() {
      console.log("vote");
    },
    deleteComment() {
      this.$axios
        .delete(`/comment/${this.comment.commentId}`)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    },
    updateComment() {
      console.log("update");
    },
    reportComment() {
      console.log("report");
    },
    deltaToHTML(delta) {
      var tempCont = document.createElement("div");
      let quill = new Quill(tempCont);
      delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty("image")) {
          console.log(this.comment.attach, item.insert.image);
          if (this.comment.attach.some(x => x.attach_name === item.insert.image)) {
            item.attributes={
              download:item.insert.image,
              alt:item.insert.image
            }
            const image = this.comment.attach.splice(this.comment.attach.findIndex(x => x.attach_name === item.insert.image), 1);
            console.log("this",image)
            item.insert.image = this.webUrl + "/" + image[0].attach_path;
            item.attributes.link = item.insert.image
            console.log("item",item);
          }
        }
      });
      quill.setContents(delta);
      return tempCont.getElementsByClassName("ql-editor")[0].innerHTML;
    },
    getImagePath(imagePath) {
      console.log(this.comment);
      let attach = this.comment.attach;
      return this.webUrl + attach.find(item => item.attachName === imagePath).attachPath;
    }
  }
};
</script>
<style>
.commentContents p {
  margin-bottom: 3px;
}
.commentContents p img{
  max-width:100%;
}
@media(max-width:600px){
  .commentContents p img{
    max-width:calc(100% + 32px);
    margin-left:-16px;
    margin-right:-16px;
  }
}
</style>