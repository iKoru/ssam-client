
<template>
  <div class="position-relative">
    <div class="pt-3 px-2 position-relative boardTitle">
      <router-link :to="boardType==='T'?'/topicBest':'/loungeBest'">{{boardType === 'T'?'토픽':'라운지'}} 베스트</router-link>
    </div>
    <v-divider class="my-2 dark-border"/>
    <small class="boardExtractorPeriod">{{period === 0?'오늘':(period === 1?'이번주':'이번달')}}</small>
    <v-carousel cycle hide-controls light v-model="period" class="periodBestCarousel text-xs-center" :interval="10000" :height="(maxCount || 10)*28 + 50">
      <v-carousel-item transition="fade-transition" reverse-transition="fade-transition">
        <small-document-list :list="items.daily" :maxCount="maxCount" v-if="items.daily && items.daily.length > 0" :showDateTime="false" :showVoteUpCount="true"></small-document-list>
        <div v-else class="d-flex cover-title align-center">
          <div class="my-auto flex d-inline-block">표시할 내용이 없습니다.</div>
        </div>
      </v-carousel-item>
      <v-carousel-item transition="fade-transition" reverse-transition="fade-transition">
        <small-document-list :list="items.weekly" :maxCount="maxCount" v-if="items.weekly && items.weekly.length > 0" :showDateTime="false" :showVoteUpCount="true"></small-document-list>
        <div v-else class="d-flex cover-title align-center">
          <div class="my-auto flex d-inline-block">표시할 내용이 없습니다.</div>
        </div>
      </v-carousel-item>
      <v-carousel-item transition="fade-transition" reverse-transition="fade-transition">
        <small-document-list :list="items.monthly" :maxCount="maxCount" v-if="items.monthly && items.monthly.length > 0" :showDateTime="false" :showVoteUpCount="true"></small-document-list>
        <div v-else class="d-flex cover-title align-center">
          <div class="my-auto flex d-inline-block">표시할 내용이 없습니다.</div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
import SmallDocumentList from './SmallDocumentList';
export default {
  name: 'BoardExtractor',
  components: {
    SmallDocumentList
  },
  props: ['boardType', 'maxCount'],
  data () {
    return {
      period: 0,
      items: { daily: [], weekly: [], monthly: [] }
    };
  },
  created () {
    this.$axios
      .get('/best', { params: { boardType: this.boardType }, headers: { silent: true } })
      .then(response => {
        this.items = response.data;
      })
      .catch(error => {
        console.log(error);
        this.$store.dispatch('showSnackbar', { text: `베스트 게시물을 가져오는 데 오류가 발생했습니다.${error.response ? '[' + error.response.data.message + ']' : ''}`, color: 'error' });
      });
  }
};
</script>
<style>
.periodBestCarousel {
  box-shadow: none;
}
.periodBestCarousel .v-carousel__item, .periodBestCarousel .v-carousel__item .v-responsive__content{
  width:100%;
}
.periodBestCarousel .v-carousel__controls__item {
  margin: 0 !important;
}
.periodBestCarousel .v-carousel__controls {
  background: white;
}
.periodBestCarousel .v-btn--active:before,
.periodBestCarousel .v-btn:hover:before,
.periodBestCarousel .v-btn:focus:before {
  background-color: transparent;
}
.periodBestCarousel .v-carousel__controls__item .v-icon {
  opacity: 0.1;
}
.periodBestCarousel .v-carousel__controls__item:hover .v-icon,
.periodBestCarousel .v-carousel__controls__item.v-btn--active .v-icon {
  opacity: 0.5;
}
.boardExtractorPeriod {
  position: absolute;
  top: 16px;
  right: 8px;
  color: #aaa;
}
</style>
