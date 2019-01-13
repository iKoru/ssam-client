<template>
  <v-layout row>
    <v-flex xs12>
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in commentList">
            <v-layout :key="'comment-show'+index" column>
              <v-layout>
                <v-flex xs12>
                  <v-list-tile
                    :key="item.title"
                  >
                    <CommentItem :comment="item" :commentIndex="index" @openRecomment="openRecomment"/>
                  </v-list-tile>
                </v-flex>
              </v-layout>
              <v-layout :key="'child-comment-list'+index">
                <v-flex xs11 offset-xs1  :key="'child-comment-item'+childIndex" v-for="(childItem, childIndex) in item.children">

                  <v-list-tile>
                  <CommentItem :comment="childItem" :commentIndex="childIndex" :children="true"/>
                  </v-list-tile>
                </v-flex>
              </v-layout>
              <v-layout :key="'recomment-write'+index" v-if="openRecommentIndex==index">
                <v-flex xs12 offset-xs1>
                  <CommentWriter :commentTo="item.commentId"/>
                </v-flex>
              </v-layout>

              <v-divider
                v-if="index < commentList.length - 1"
                :inset="item.inset"
                :key="index"
              ></v-divider>
            </v-layout>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import BoardMixins from '@/components/mixins/BoardMixins'
import CommentItem from "./CommentItem";
import CommentWriter from "./CommentWriter"

  export default {
    mixins: [BoardMixins],
    components: {
      CommentItem,
      CommentWriter
    },
    data () {
      return {
        items: [
          { header: 'Today' },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Brunch this weekend?',
            subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
            subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
          },
          { divider: true, inset: true },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            title: 'Recipe to try',
            subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
          }
        ],
        commentList: [],
        openRecommentIndex: -1
      }
    },
    created() {
      this.$axios.get(`/comment?documentId=${this.$route.params.documentId}`)
        .then(res => {
          this.commentList = res.data
        })
        .catch(err => console.log(err))
    },
    methods: {
      openRecomment (commentIndex) {
        if(this.openRecommentIndex === commentIndex) this.openRecommentIndex = -1;
        else this.openRecommentIndex = commentIndex
      }
    }
  }
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
  height: fit-content
}
.v-list__tile__title {
  height: fit-content
}
</style>