
<template>
  <div class="text-xs-center">
    <div class="pt-3">{{period === 0?'오늘':(period === 1?'이번주':'이번달')}}의 {{boardType === 'T'?'토픽':'라운지'}} 베스트</div>
    <v-carousel cycle hide-delimiters hide-controls v-model="period" class="mt-3 periodBestCarousel" :interval="10000" :height="(maxCount || 10)*50">
      <v-carousel-item transition="fade-transition">
        <small-document-list :list="items.daily" :maxCount="maxCount"></small-document-list>
      </v-carousel-item>
      <v-carousel-item transition="fade-transition">
        <small-document-list :list="items.weekly" :maxCount="maxCount"></small-document-list>
      </v-carousel-item>
      <v-carousel-item transition="fade-transition">
        <small-document-list :list="items.monthly" :maxCount="maxCount"></small-document-list>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
import SmallDocumentList from "./SmallDocumentList";
export default {
  name: "BoardExtractor",
  components: {
    SmallDocumentList
  },
  props:['boardType', 'maxCount'],
  data() {
    return {
      period:0,
      items: {daily:[], weekly:[], monthly:[]}
    };
  },
  created() {
    this.$axios
      .get("/best", {params: {boardType: this.boardType}, headers: {silent: true}})
      .then(response => {
        this.items = response.data;
        //this.targets = this.items.daily;
      })
      .catch(error => {
        console.log(error);
        this.$store.dispatch("showSnackbar", {text: `베스트 게시물을 가져오는 데 오류가 발생했습니다.${error.response ? "[" + error.response.data.message + "]" : ""}`, color: "error"});
      });
  },
};
</script>
<style>
.periodBestCarousel{
  box-shadow:none;
}
.periodBestCarousel .v-carousel__item{
  display:block;
}
</style>