<template>
  <v-layout row>
    <v-flex xs12>
      <v-card class="mb-3 elevation-1" flat v-if="best && best.length > 0">
        <v-list two-line class="commentList py-0">
          <template v-for="(item, index) in best">
            <v-list-tile :key="'best'+index" class="bestComment">
              <comment-item :comment="item" :commentIndex="index" @update="getCommentList" :reportTypes="reportTypes" :isBest="true"/>
            </v-list-tile>
            <v-divider :key="'bestDivider'+index"></v-divider>
          </template>
        </v-list>
      </v-card>
      <v-card>
        <v-list two-line class="commentList py-0 pb-1">
          <template v-for="(item, index) in commentList">
            <v-list-tile :key="index">
              <comment-item :comment="item" :commentIndex="index" @openRecomment="openRecomment" @update="getCommentList" :reportTypes="reportTypes" :isAnonymous="isAnonymous" :allowAnonymous="allowAnonymous" :isCommentWritable="isCommentWritable"/>
            </v-list-tile>
            <div :key="'child'+index" v-if="item.children">
              <v-list-group v-model="item.active" :key="item.title" :prepend-icon="item.action" v-if="item.children.length > 5" lazy>
                <v-list-tile slot="activator" avatar>
                  <v-list-tile-action></v-list-tile-action>
                  <v-list-tile-title class="text-xs-center">
                    <small>{{item.active?'답글 숨기기':'이전 '+(item.children.length - 5)+'개의 답글 펼치기'}}</small>
                  </v-list-tile-title>
                </v-list-tile>
                <div v-for="(childItem, childIndex) in item.children.filter((x, y) => y < (item.children.length - 5))" :key="'hidden'+childIndex">
                  <v-divider inset/>
                  <v-list-tile avatar>
                    <v-list-tile-action></v-list-tile-action>
                    <comment-item :comment="childItem" :commentIndex="childIndex" :children="true" @update="getCommentList" :reportTypes="reportTypes" :isAnonymous="isAnonymous" :allowAnonymous="allowAnonymous" :isCommentWritable="isCommentWritable"/>
                  </v-list-tile>
                </div>
              </v-list-group>
              <template v-if="item.children.length > 5"></template>
              <div v-for="(childItem, childIndex) in (item.children.length > 5 ? item.children.filter((x, y) => y >= (item.children.length - 5)) : item.children)" :key="childIndex">
                <v-divider inset/>
                <v-list-tile avatar>
                  <v-list-tile-action></v-list-tile-action>
                  <comment-item :comment="childItem" :commentIndex="childIndex" :children="true" @update="getCommentList" :reportTypes="reportTypes" :isAnonymous="isAnonymous" :allowAnonymous="allowAnonymous" :isCommentWritable="isCommentWritable"/>
                </v-list-tile>
              </div>
            </div>
            <v-list-tile :key="'writer'+index" v-if="openRecommentIndex === index && isCommentWritable !== 'DELETED'" class="pl-5">
              <CommentWriter :commentTo="item.commentId" @update="getCommentList" :isAnonymous="isAnonymous" :allowAnonymous="allowAnonymous" :isCommentWritable="isCommentWritable" :boardId="boardId"/>
            </v-list-tile>
            <v-divider :key="'divider'+index"></v-divider>
          </template>
        </v-list>
        <v-flex text-xs-center mt-2 xs12 v-if="pages > 1">
          <v-pagination id="commentPagination" v-model="page" :length="pages" :total-visible="$vuetify.breakpoint.smAndUp?10:undefined"></v-pagination>
        </v-flex>
        <div class="pt-2" v-if="isCommentWritable !== 'DELETED'">
          <comment-writer @update="getCommentList" :isAnonymous="isAnonymous" :allowAnonymous="allowAnonymous" :isCommentWritable="isCommentWritable"/>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import BoardMixins from '@/components/mixins/BoardMixins';
import CommentItem from './CommentItem';
import CommentWriter from './CommentWriter';

export default {
  mixins: [BoardMixins],
  components: {
    CommentItem,
    CommentWriter
  },
  props: ['isAnonymous', 'allowAnonymous', 'isCommentWritable', 'reportTypes', 'boardId', 'best', 'pages'],
  data () {
    return {
      commentList: [],
      openRecommentIndex: -1,
      page: undefined,
      documentId: this.$route.params.documentId
    };
  },
  methods: {
    getCommentList () {
      this.openRecommentIndex = -1;
      this.$axios
        .get('/comment', { params: { documentId: this.$route.params.documentId, page: this.page }, headers: { silent: true } })
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
    openRecomment (commentIndex) {
      if (this.openRecommentIndex === commentIndex) this.openRecommentIndex = -1;
      else this.openRecommentIndex = commentIndex;
    }
  },
  watch: {
    '$route.params': {
      handler () {
        if (!this.page || this.documentId !== this.$route.params.documentId) {
          this.$nextTick(() => {
            this.documentId = this.$route.params.documentId;
            this.page = this.pages;
          });
        }
      },
      deep: true,
      immediate: true
    },
    page (val) {
      this.getCommentList();
    },
    documentId (val) {
      this.getCommentList();
    },
    pages (val) {
      this.page = this.pages;
    }
  }
};
</script>
<style>
.commentList .v-list__tile__title {
  white-space: unset;
  overflow: visible;
  height:auto;
}
.commentList.v-list--two-line .v-list__tile {
  height: auto;
  padding: 8px 0;
}
.commentList .v-list__tile__content {
  height: auto;
  padding: 0 16px;
  display:block;
}
.commentList .bestComment {
  background-color: #b3e5fc;
}
#commentPagination .v-pagination__item,
#commentPagination .v-pagination__item--active,
#commentPagination .v-pagination__navigation {
  box-shadow: none;
  margin: 0;
  padding: 0;
}
#commentPagination .v-pagination__item--active {
  color: black;
  font-weight: bold;
  background-color: white !important;
  border-color: white !important;
}
.commentList.v-list .v-list__group--active:before,
.commentList.v-list .v-list__group--active:after {
  display: none;
}
@media (max-width: 599px) {
  .commentList.theme--light.v-list .v-list__group__header:hover {
    background-color: #fff;
  }
}
</style>
