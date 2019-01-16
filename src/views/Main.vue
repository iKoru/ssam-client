<template>
  <v-layout row wrap>
    <v-flex xs12 sm6>
      <board-extractor boardType="L" :maxCount="$vuetify.breakpoint.xsOnly?5:10" :class="{'mt-2':true, 'mx-2':$vuetify.breakpoint.smAndUp}"></board-extractor>
    </v-flex>
    <v-flex xs12 sm6>
      <board-extractor boardType="T" :maxCount="$vuetify.breakpoint.xsOnly?5:10" :class="{'mt-2':true,'mx-2':$vuetify.breakpoint.smAndUp}"></board-extractor>
    </v-flex>
    <v-flex xs12 sm6 v-for="(recent, index) in recents" :class="{'mt-3':$vuetify.breakpoint.xsOnly && index > 0, 'mb-3': $vuetify.breakpoint.xsOnly && index === recents.length - 1}" :key="index">
      <div :class="{'mt-2':true,'fill-height':true, 'position-relative':true, 'mx-2':$vuetify.breakpoint.smAndUp}" :style="{height:$vuetify.breakpoint.xsOnly?'190px':'330px'}">
        <template v-if="recent.documents && recent.documents.length > 0">
          <div class="pt-3 px-2 position-relative">
            <router-link :to="'/'+recent.boardId">
              <span v-if="recent.hot">최근 인기 토픽 - {{recent.boardName}}</span>
              <span v-else-if="recent.boardId === 'question'">답변을 기다리는 질문</span>
              <span v-else>{{recent.boardName}} 최근 {{recent.boardId === 'archive'?'자료':'게시물'}}</span>
            </router-link>
          </div>
          <v-divider class="my-2"/>
          <small-document-list :list="recent.documents" :maxCount="$vuetify.breakpoint.xsOnly?5:10" :showDateTime="true" :showVoteUpCount="false"></small-document-list>
        </template>
        <template v-else>
          <div class="d-flex cover-title align-center text-xs-center">
            <div class="my-auto flex d-inline-block">표시할 내용이 없습니다.</div>
          </div>
          <div class="pt-3 px-2 position-relative">
            <router-link :to="'/'+recent.boardId">
              <span v-if="recent.hot">최근 인기 토픽 - {{recent.boardName}}</span>
              <span v-else-if="recent.boardId === 'question'">답변을 기다리는 질문</span>
              <span v-else>{{recent.boardName}} 최근 {{recent.boardId === 'archive'?'자료':'게시물'}}</span>
            </router-link>
          </div>
          <v-divider class="my-2 "/>
        </template>
      </div>
    </v-flex>
  </v-layout>
  <!--<v-container px-0 fluid>
    <v-layout row wrap align-center>
      <v-layout row wrap>
        <v-flex xs12 md9>
        </v-flex>
        <v-flex d-flex xs12 md3>
          <v-layout column>
            <v-flex xs12>
              <v-card flat>
                <v-card-title>
                  <v-layout column>
                    <v-flex class="pt-3 px-2 position-relative">
                      <router-link to="/notice">
                        <span>공지사항</span>
                      </router-link>
                    </v-flex>
                    <v-divider class="my-2"/>
                    <v-flex>
                      <small-document-list :list="notice.documents" :maxCount="2" :showDateTime="false" :showVoteUpCount="false"></small-document-list>
                    </v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                    <v-flex xs12>asdfasdfasdf</v-flex>
                  </v-layout>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>-->
</template>

<script>
import MainLayout from "../layouts/MainLayout";
export default {
  name: "Main",
  components: {
    BoardExtractor: () => import("@/components/board/BoardExtractor.vue"),
    SmallDocumentList: () => import("@/components/board/SmallDocumentList.vue")
  },
  data() {
    return {
      recents: [],
      notice: {}
    };
  },
  created() {
    this.$emit("update:layout", MainLayout);
    this.$store.dispatch('setColumnType', 'SHOW_ALWAYS')
  },
  mounted() {
    this.$axios
      .get("/recent", {headers: {silent: true}})
      .then(response => {
        response.data.forEach(x => {
          x.documents.forEach(y => {
            if (y.writeDateTime) {
              y.writeDateTime = this.$moment(y.writeDateTime, "YYYYMMDDHHmmss");
            }
          });
        });
        this.recents = response.data.filter(x=>x.boardId !== 'notice');
        this.notice = response.data.filter(x=>x.boardId === 'notice');
      })
      .catch(error => {
        console.log(error);
        this.$store.dispatch("showSnackbar", {text: `최근 게시물을 가져오지 못했습니다.${error.response ? "[" + error.response.data.message + "]" : ""}`, color: "error"});
      });
  },
  methods: {}
};
</script>
<style>
.cover-title {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>