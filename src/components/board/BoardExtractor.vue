
<template>
  <div class="text-xs-center position-relative">
    <div class="pt-3 position-relative">{{period === 0?'오늘':(period === 1?'이번주':'이번달')}}의 {{boardType === 'T'?'토픽':'라운지'}} 베스트</div>
    <v-carousel cycle hide-delimiters hide-controls v-model="period" class="periodBestCarousel" :interval="10000" :height="(maxCount || 10)*27 + 39">
      <v-carousel-item transition="fade-transition">
        <small-document-list :list="items.daily" :maxCount="maxCount" v-if="items.daily && items.daily.length > 0" :showDateTime="false"></small-document-list>
        <div v-else class="d-flex cover-title">
          <div class="my-auto flex">
            표시할 내용이 없습니다.
          </div>
        </div>
      </v-carousel-item>
      <v-carousel-item transition="fade-transition">
        <small-document-list :list="items.weekly" :maxCount="maxCount" v-if="items.weekly && items.weekly.length > 0" :showDateTime="false"></small-document-list>
        <div v-else class="d-flex cover-title">
          <div class="my-auto flex">
            표시할 내용이 없습니다.
          </div>
        </div>
      </v-carousel-item>
      <v-carousel-item transition="fade-transition">
        <small-document-list :list="items.monthly" :maxCount="maxCount" v-if="items.monthly && items.monthly.length > 0" :showDateTime="false"></small-document-list>
        <div v-else class="d-flex cover-title">
          <div class="my-auto flex">
            표시할 내용이 없습니다.
          </div>
        </div>
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