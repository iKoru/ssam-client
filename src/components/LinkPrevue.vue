<template>
  <!-- bidirectional data binding（双向数据绑定） -->
  <div>
    <link-prevue :url="linkUrl"></link-prevue>
  </div>
</template>

<script>
import LinkPrevue from 'link-prevue'
export default {
  props: ['linkUrl'],
  components: {
    LinkPrevue
  },
  mounted () {
    // console.log(this.linkUrl)
  },
  watch: {
    linkUrl (to, from) {
    }
  }
}
</script>
