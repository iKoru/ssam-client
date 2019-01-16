<template>
  <v-container px-0 fluid>
    <v-layout row wrap align-center>
      <v-layout row wrap>
        <v-flex xs12 :md9="columnType !== 'HIDE_ALWAYS'">
          <slot></slot>
        </v-flex>
        <v-flex xs12 md3 v-show="(columnType === 'SHOW_ALWAYS') || (columnType === 'HIDE_SM' && $vuetify.breakpoint.mdAndUp)" id="columnAside">
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
                      <small-document-list :list="notice.length > 0? notice[0].documents : []" :maxCount="2" :showDateTime="false" :showVoteUpCount="false"></small-document-list>
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
  </v-container>
</template>

<script>
export default {
  name: "MainColumnLayout",
  components: {
    SmallDocumentList: () => import("@/components/board/SmallDocumentList.vue")
  },
  data() {
    return {
      notice: {}
    };
  },
  computed:{
    columnType(){
      return this.$store.getters.columnType;
    }
  },
  mounted() {
    if(this.$store.getters.recents){
      this.notice = this.$store.getters.recents.filter(x=>x.boardId === 'notice')
    }else{
      this.$axios
        .get("/recent", {headers: {silent: true}})
        .then(response => {
          response.data.forEach(x=>{
            x.documents.forEach(y => {
              if (y.writeDateTime) {
                y.writeDateTime = this.$moment(y.writeDateTime, "YYYYMMDDHHmmss");
              }
            })
          })
          this.notice = response.data.filter(x=>x.boardId === 'notice');
          this.$store.dispatch('setRecents', response.data)
        })
        .catch(error => {
          console.log(error);
          this.$store.dispatch("showSnackbar", {text: `최근 게시물을 가져오는 데 오류가 발생했습니다.${error.response ? "[" + error.response.data.message + "]" : ""}`, color: "error"});
        });
    }
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
#columnAside{
  display:flex;
}
</style>