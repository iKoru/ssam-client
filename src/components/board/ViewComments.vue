<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-list two-line class="commentList py-0">
          <template v-for="(item, index) in commentList">
            <v-list-tile :key="index">
              <comment-item :comment="item" :commentIndex="index" @openRecomment="openRecomment" @update="getCommentList" :reportTypes="reportTypes"/>
            </v-list-tile>
            <div :key="'child'+index" v-if="item.children">
              <div v-for="(childItem, childIndex) in item.children" :key="childIndex">
                <v-divider inset/>
                <v-list-tile avatar>
                  <v-list-tile-action></v-list-tile-action>
                  <comment-item :comment="childItem" :commentIndex="childIndex" :children="true" @update="getCommentList" :reportTypes="reportTypes"/>
                </v-list-tile>
              </div>
            </div>
            <v-list-tile :key="'writer'+index" v-if="openRecommentIndex === index">
              <CommentWriter :commentTo="item.commentId" @update="getCommentList" :isAnonymous="isAnonymous" :allowAnonymous="allowAnonymous" :isCommentWritable="isCommentWritable"/>
            </v-list-tile>
            <v-divider :key="'divider'+index"></v-divider>
          </template>
        </v-list>
        <div class="pt-3">
          <comment-writer @update="getCommentList" :isAnonymous="isAnonymous" :allowAnonymous="allowAnonymous" :isCommentWritable="isCommentWritable"/>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import BoardMixins from "@/components/mixins/BoardMixins";
import CommentItem from "./CommentItem";
import CommentWriter from "./CommentWriter";

export default {
  mixins: [BoardMixins],
  components: {
    CommentItem,
    CommentWriter
  },
  props: ["isAnonymous", "allowAnonymous", "isCommentWritable", "reportTypes"],
  data() {
    return {
      commentList: [],
      openRecommentIndex: -1
    };
  },
  methods: {
    getCommentList() {
      this.openRecommentIndex = -1;
      this.$axios
        .get("/comment", {params: {documentId: this.$route.params.documentId}, headers: {silent: true}})
        .then(res => {
          res.data.forEach(x => {
            if (Array.isArray(x.attach)) {
              x.attach = x.attach.filter(x => x);
            }
          });
          this.commentList = res.data;
        })
        .catch(err => console.log(err));
    },
    openRecomment(commentIndex) {
      if (this.openRecommentIndex === commentIndex) this.openRecommentIndex = -1;
      else this.openRecommentIndex = commentIndex;
    }
  },
  watch: {
    "$route.params": {
      handler() {
        this.getCommentList();
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style>
.commentList .v-list__tile__title {
  white-space: unset;
  overflow: visible;
  height: fit-content;
}
.commentList.v-list--two-line .v-list__tile {
  height: fit-content;
  padding: 8px 0;
}
.commentList .v-list__tile__content {
  height: fit-content;
  padding: 0 16px;
}
</style>