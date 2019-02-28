<template>
  <v-list-tile-content class="py-1 px-0">
    <v-list-tile-title>
      <v-layout column>
        <v-flex>
          <v-chip label small :color="$store.getters.isLight?'primary':'secondary'" class="white--text ml-0 my-0 ml-3" v-if="isBest">베스트</v-chip>
        </v-flex>
        <v-flex v-if="!updatingComment">
          <div v-html="comment.isDeleted?comment.contents:deltaToHTML(JSON.parse(comment.contents))" :class="{'commentContents ql-editor pa-0 px-3':true, 'body-1 grey--text lighten-1':comment.isDeleted}"></div>
        </v-flex>
        <v-flex v-else-if="isCommentWritable !== 'DELETED'">
          <comment-writer :defaultComment="comment" @revokeUpdate="updatingComment=false" @update="updatingComment=false; $emit('update')" :isAnonymous="isAnonymous" :allowAnonymous="allowAnonymous" :isCommentWritable="isCommentWritable" :focus="true"/>
        </v-flex>
      </v-layout>
    </v-list-tile-title>
    <v-list-tile-sub-title v-if="!comment.isDeleted" class="px-3">
      <v-layout v-if="!updatingComment" row class="body-1" wrap>
        <!--prettyhtml-ignore-->
        <v-flex text-xs-left>
          <user-link :nickName="comment.nickName" :boardType="$store.getters.boardType"/>
          <small class="accent--text">({{comment.animalName}})</small><small class="ml-1">{{$moment(comment.writeDateTime, 'YYYYMMDDHHmmss').isSame($moment(), 'day')?$moment(comment.writeDateTime, 'YYYYMMDDHHmmss').format('HH:mm'):timeParser(comment.writeDateTime)}}</small>
          <b v-if="!children && !isBest && isCommentWritable !== 'DELETED'" :class="{'cursor-pointer':true, 'primary--text':isAddingChild && $store.getters.isLight, 'secondary--text':isAddingChild && !$store.getters.isLight}" @click="$emit('openRecomment', commentIndex)" title="답글 쓰기">
            답글{{comment.childCount > 0? `(${comment.childCount})`:""}}
          </b>
        </v-flex>
        <v-spacer/>
        <v-flex text-xs-right px-2>
          <span @click="voteUp" class="cursor-pointer" title="추천" v-if="isBest">
            <v-icon :color="$store.getters.isLight?'primary':'secondary'" small>thumb_up</v-icon>
            <b class="mx-1 body--text">{{comment.voteUpCount}}</b>
          </span>
          <template v-else>
            <span @click="voteUp" class="cursor-pointer" title="추천">
              <v-icon :color="$store.getters.isLight?'primary':'secondary'" small>thumb_up</v-icon>
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
          </template>
        </v-flex>
      </v-layout>
    </v-list-tile-sub-title>
  </v-list-tile-content>
</template>

<script>
import BoardMixins from '@/components/mixins/BoardMixins';
import UserLink from '@/components/UserLink';
import CommentWriter from './CommentWriter';
import Quill from 'quill';

export default {
  props: ['comment', 'commentIndex', 'children', 'reportTypes', 'isBest', 'isAnonymous', 'allowAnonymous', 'isCommentWritable', 'isAddingChild'],
  mixins: [BoardMixins],
  components: {
    UserLink, CommentWriter
  },
  data () {
    return {
      updatingComment: false
    }
  },
  mounted () {
    this.$root.$on('closeEditingComment', () => {
      this.updatingComment = false;
    })
  },
  methods: {
    voteUp () {
      this.$axios
        .post('/vote/comment', { commentId: this.comment.commentId }, { headers: { silent: true } })
        .then(response => {
          this.comment.voteUpCount = response.data.voteUpCount;
        })
        .catch(error => {
          this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '추천하지 못했습니다.'}`, color: 'error' });
        });
    },
    deleteComment () {
      this.$axios
        .put('/comment', { commentId: this.comment.commentId, isDeleted: true })
        .then(response => {
          this.comment.contents = '삭제된 댓글입니다.'
          this.comment.isDeleted = true;
          this.$store.dispatch('showSnackbar', { text: '댓글을 삭제하였습니다.', color: 'success' });
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '댓글을 삭제하지 못했습니다.'}`, color: 'error' });
        });
    },
    updateComment () {
      this.$root.$emit('closeEditingComment');
      this.$emit('openRecomment', -1);
      this.$nextTick(() => {
        this.updatingComment = true;
      })
    },
    reportComment (item) {
      this.$axios
        .post('/report/comment', { commentId: this.comment.commentId, reportTypeId: item.reportTypeId })
        .then(response => {
          this.$store.dispatch('showSnackbar', { text: '댓글을 신고하였습니다.', color: 'success' });
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message || '댓글을 신고하지 못했습니다.' : '댓글을 신고하지 못했습니다.', color: 'info' });
          } else {
            console.log(error);
            this.$store.dispatch('showSnackbar', { text: error.response ? error.response.data.message || '댓글을 신고하지 못했습니다.' : '댓글을 신고하지 못했습니다.', color: 'error' });
          }
        });
    },
    deltaToHTML (delta) {
      var tempCont = document.createElement('div');
      let quill = new Quill(tempCont);
      delta.ops.forEach(item => {
        if (item.insert.hasOwnProperty('image')) {
          if (this.comment.attach.some(x => x.attach_name === item.insert.image)) {
            item.attributes = {
              download: item.insert.image,
              alt: item.insert.image
            };
            item.insert.image = this.webUrl + this.comment.attach.find(x => x.attach_name === item.insert.image).attach_path;
            item.attributes.link = item.insert.image;
          }
        }
      });
      quill.setContents(delta);
      // Clean spaces between tags
      let newText = tempCont.getElementsByClassName('ql-editor')[0].innerHTML.replace(/(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g, '$1$3')

      // Clean empty paragraphs before the content
      // <p><br/><p> && <p></p>
      let slicer;
      while (newText.slice(0, 7) === '<p></p>' || newText.slice(0, 11) === '<p><br></p>') {
        if (newText.slice(0, 7) === '<p></p>') slicer = 7
        else slicer = 11
        newText = newText.substring(slicer, newText.length)
      }

      // Clean empty paragraphs after the content
      while (newText.slice(-7) === '<p></p>' || newText.slice(-11) === '<p><br></p>') {
        if (newText.slice(-7) === '<p></p>') slicer = 7
        else slicer = 11
        newText = newText.substring(0, newText.length - slicer)
      }
      // Return the clean Text
      return newText
    },
    getImagePath (imagePath) {
      if (this.comment.attach.some(x => x.attachName === imagePath)) {
        return this.webUrl + this.comment.attach.find(item => item.attachName === imagePath).attachPath;
      } else {
        return imagePath;
      }
    }
  }
};
</script>
<style>
.commentContents p {
  margin-bottom: 3px;
  word-break:break-all;
}
.commentContents p img {
  max-width: 100%;
}
.commentContents .video-container{
  position:relative;
  height:0;
  width:100%;
  padding-bottom:56%;
}
.commentContents .video-container iframe{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
}
@media (max-width: 600px) {
  .commentContents p img {
    max-width: calc(100% + 32px);
    margin-left: -16px;
    margin-right: -16px;
  }
  .commentContents .video-container{
    position:relative;
    height:0;
    width:calc(100% + 32px);
    margin-left:-16px;
    margin-right:-16px;
    padding-bottom:56%;
  }
}
</style>
