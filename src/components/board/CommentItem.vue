<template>
  <v-list-tile-content class="py-1 px-0">
    <v-list-tile-title>
      <v-layout row>
        <v-flex>
          <div v-html="comment.isDeleted?comment.contents:deltaToHTML(JSON.parse(comment.contents))" :class="{commentContents:true, 'body-1':comment.isDeleted,'grey--text':comment.isDeleted, 'lighten-1':comment.isDeleted, 'ql-editor':true, 'py-0':true, 'px-3':true}"></div>
        </v-flex>
      </v-layout>
    </v-list-tile-title>
    <v-list-tile-sub-title v-if="!comment.isDeleted" class="px-3">
      <v-layout row class="body-1" wrap>
        <!--prettyhtml-ignore-->
        <v-flex text-xs-left>
          <!--<component :is="comment.nickName === ''?'span':'b'" :class="{'body--text':comment.nickName!==''}">{{comment.nickName === '' ? '익명' : comment.nickName}}</component>-->
          <user-link :nickName="comment.nickName" :boardType="$store.getters.boardType"/>
          <small class="accent--text">({{comment.animalName}})</small> {{$moment(comment.writeDateTime, 'YYYYMMDDHHmmss').isSame($moment(), 'day')?$moment(comment.writeDateTime, 'YYYYMMDDHHmmss').format('HH:mm'):timeParser(comment.writeDateTime)}}
          <b v-if="!children" class="cursor-pointer" @click="$emit('openRecomment', commentIndex)" title="답글 쓰기">
            답글{{comment.childCount > 0? `(${comment.childCount})`:""}}
          </b>
        </v-flex>
        <v-spacer/>
        <v-flex text-xs-right px-2>
          <span @click="voteUp" class="cursor-pointer" title="추천">
            <v-icon color="primary" small>thumb_up</v-icon>
            <b class="mx-1 body--text">{{comment.voteUpCount}}</b> |
          </span>
          <template v-if="comment.isWriter">
            <span class="cursor-pointer" @click="updateComment">수정</span> |
            <span class="cursor-pointer" @click="deleteComment">삭제</span>
          </template>
          <v-menu open-on-hover bottom offset-y lazy v-else>
            <span class="cursor-pointer" slot="activator">신고</span>
            <v-list two-line>
              <v-list-tile v-for="(item, index) in reportTypes" :key="item.reportTypeId" @click="reportComment(item)" :class="{'mt-2':index>0}">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.reportTypeName }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{item.reportTypeDescription}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-flex>
      </v-layout>
    </v-list-tile-sub-title>
  </v-list-tile-content>
</template>

<script>
import BoardMixins from "@/components/mixins/BoardMixins";
import UserLink from '@/components/UserLink';
import Quill from "quill";

export default {
  props: ["comment", "commentIndex", "children", "reportTypes"],
  mixins: [BoardMixins],
  components:{
    UserLink
  },
  methods: {
    voteUp() {
      this.$axios
        .post("/vote/comment", {commentId: this.comment.commentId}, {headers: {silent: true}})
        .then(response => {
          this.comment.voteUpCount = response.data.voteUpCount;
        })
        .catch(error => {
          this.$store.dispatch("showSnackbar", {text: `${error.response ? error.response.data.message : "추천하지 못했습니다."}`, color: "error"});
        });
    },
    deleteComment() {
      this.$axios
        .put("/comment", {commentId: this.comment.commentId, isDeleted: true})
        .then(response => {
          this.comment.isDeleted = true;
          this.$store.dispatch("showSnackbar", {text: "댓글을 삭제하였습니다.", color: "success"});
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("showSnackbar", {text: `${error.response ? error.response.data.message : "댓글을 삭제하지 못했습니다."}`, color: "error"});
        });
    },
    updateComment() {
      console.log("update");
    },
    reportComment(item) {
      this.$axios
        .post("/report/comment", {commentId: this.comment.commentId, reportTypeId: item.reportTypeId})
        .then(response => {
          this.$store.dispatch("showSnackbar", {text: "댓글을 신고하였습니다.", color: "success"});
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "댓글을 신고하지 못했습니다." : "댓글을 신고하지 못했습니다.", color: "info"});
          } else {
            console.log(error);
            this.$store.dispatch("showSnackbar", {text: error.response ? error.response.data.message || "댓글을 신고하지 못했습니다." : "댓글을 신고하지 못했습니다.", color: "error"});
          }
        });
    },
    deltaToHTML(delta) {
      var tempCont = document.createElement("div");
      let quill = new Quill(tempCont);
      delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty("image")) {
          if (this.comment.attach.some(x => x.attach_name === item.insert.image)) {
            item.attributes = {
              download: item.insert.image,
              alt: item.insert.image
            };
            item.insert.image = this.webUrl + "/" + this.comment.attach.find(x => x.attach_name === item.insert.image).attach_path;
            item.attributes.link = item.insert.image;
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
.commentContents p img {
  max-width: 100%;
}
@media (max-width: 600px) {
  .commentContents p img {
    max-width: calc(100% + 32px);
    margin-left: -16px;
    margin-right: -16px;
  }
}
</style>