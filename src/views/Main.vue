<template>
  <v-container px-0 fluid>
    <v-layout row wrap align-center>
      <v-flex xs12 sm6 md4 offset-md2>
        <board-extractor boardType="L" :maxCount="$vuetify.breakpoint.xsOnly?5:10" :class="{'elevation-1':true, 'my-2':true, 'mx-2':$vuetify.breakpoint.smAndUp}"></board-extractor>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <board-extractor boardType="T" :maxCount="$vuetify.breakpoint.xsOnly?5:10" :class="{'elevation-1':true, 'my-2':true, 'mx-2':$vuetify.breakpoint.smAndUp}"></board-extractor>
      </v-flex>
      <v-flex xs12 sm6 md4 :offset-md2="index % 2 === 0" v-for="(recent, index) in recents" :class="{'mt-3':$vuetify.breakpoint.xsOnly && index > 0, 'mb-3': $vuetify.breakpoint.xsOnly && index === recents.length - 1}" :key="index">
        <div :class="{'elevation-1':true, 'my-2':true, 'text-xs-center':true, 'fill-height':true, 'position-relative':true, 'mx-2':$vuetify.breakpoint.smAndUp}" :style="{height:$vuetify.breakpoint.xsOnly?'200px':'335px'}">
          <div class="pt-3 position-relative">
            <template v-if="recent.hot">
              최근 인기 토픽 - {{recent.boardName}}
            </template>
            <template v-else>
              {{recent.boardName}} 최근 {{recent.boardId === 'archive'?'자료':'게시물'}}
            </template>
          </div>
          <small-document-list :list="recent.documents" :maxCount="$vuetify.breakpoint.xsOnly?5:10" v-if="recent.documents && recent.documents.length > 0" :showDateTime="true"></small-document-list>
          <div v-else class="d-flex cover-title">
            <div class="my-auto flex">
              표시할 내용이 없습니다.
            </div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
export default {
  name: "Main",
  components: {
    BoardExtractor: () => import("@/components/board/BoardExtractor.vue"),
    SmallDocumentList: () => import('@/components/board/SmallDocumentList.vue')
  },
  data() {
    return {
      recents:[]
    };
  },
  created() {
    this.$emit("update:layout", MainLayout);
  },
  mounted(){
    this.$axios.get('/recent', {headers:{silent:true}})
    .then(response => {
      response.data.forEach(x=>{
        x.documents.forEach(y=>{
          if(y.writeDateTime){
            y.writeDateTime = this.$moment(y.writeDateTime, 'YYYYMMDDHHmmss').toDate()
          }
        })
      })
      this.recents = response.data
    })
    .catch(error => {
      console.log(error);
        this.$store.dispatch("showSnackbar", {text: `최근 게시물을 가져오는 데 오류가 발생했습니다.${error.response ? "[" + error.response.data.message + "]" : ""}`, color: "error"});
    })
  },
  methods: {}
};
</script>
<style>
.cover-title{
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
}
</style>