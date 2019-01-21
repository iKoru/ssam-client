<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in commentList">
            <!-- <v-layout :key="'comment-show'+index" column> -->
            <!-- <v-flex> -->
            <v-list-tile :key="index" class="py-2">
              <comment-item :comment="item" :commentIndex="index" @openRecomment="openRecomment" @update="getCommentList"/>
            </v-list-tile>
            <div :key="'child'+index" v-if="item.children">
              <div v-for="(childItem, childIndex) in item.children" :key="childIndex">
                <v-divider inset/>
                <v-list-tile class="py-2" avatar>
                  <v-list-tile-action></v-list-tile-action>
                  <comment-item :comment="childItem" :commentIndex="childIndex" :children="true" @update="getCommentList"/>
                </v-list-tile>
              </div>
            </div>
            <v-list-tile :key="'writer'+index" v-if="openRecommentIndex === index">
              <CommentWriter :commentTo="item.commentId" @update="getCommentList" :isAnonymous="isAnonymous" :allowAnonymous="allowAnonymous"/>
            </v-list-tile>
            <!-- </v-flex> -->
            <!-- <v-flex :key="'child-comment-item'+childIndex" v-for="(childItem, childIndex) in item.children"> -->
            <!-- </v-flex> -->
            <!-- <v-layout :key="'child-comment-list'+index" column> -->
            <!-- </v-layout> -->
            <!-- <v-layout :key="'recomment-write'+index" v-if="openRecommentIndex==index"> -->
            <!-- <v-flex ml-5> -->
            <!-- </v-flex> -->
            <!-- </v-layout> -->
            <v-divider v-if="index < commentList.length - 1" :key="'divider'+index"></v-divider>
            <!-- </v-layout> -->
          </template>
        </v-list>
        <comment-writer @update="getCommentList" :isAnonymous="isAnonymous" :allowAnonymous="allowAnonymous"/>
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
  props: ["isAnonymous", "allowAnonymous"],
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
.v-list__tile__title {
  white-space: unset;
  overflow: visible;
}
.v-list--two-line .v-list__tile {
  height: fit-content;
}
.v-list__tile__content {
  height: fit-content;
}
.v-list__tile__title {
  height: fit-content;
}
</style>