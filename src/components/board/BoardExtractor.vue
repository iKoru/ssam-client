
<template>
  <div>
    <span>기간별 베스트</span>
    <v-flex xs12 class="py-2 mx-2">
      <v-btn-toggle v-model="period" id="boardExtractorBtnGroup" flat>
        <v-btn flat value="daily">
          오늘
        </v-btn>
        <v-btn flat value="weekly">
          이번주
        </v-btn>
        <v-btn flat value="monthly">
          이번달
        </v-btn>
      </v-btn-toggle>
    </v-flex>
    <small-document-list :list="targets"></small-document-list>
    
  </div>
</template>
<script>
import SmallDocumentList from './SmallDocumentList'
export default {
  name: 'BoardExtractor', 
  components:{
    SmallDocumentList
  },
  data () {
    return {
      targets: [],
      period: 'daily',
      items: null
    }
  },
  created(){
    this.$axios.get('/best', {params:{boardType:'L'}})
    .then(response => {
      this.items = response.data;
      this.targets = this.items.daily
    })
    .catch(error => {
      console.log(error);
      this.$store.dispatch('showSnackbar', {text:`베스트 게시물을 가져오는 데 오류가 발생했습니다.${error.response?'['+error.response.data.message+']': ''}`, color:'error'})
    })
  },
  watch:{
    period(val){
      switch(val){
        case 'daily':
          this.targets = this.items.daily
          break;
        case 'weekly':
          this.targets = this.items.weekly
          break;
        case 'monthly':
          this.targets = this.items.monthly
          break;
      }
    }
  }
}
</script>
<style>
  #boardExtractorBtnGroup{
    width:100%;
  }
</style>