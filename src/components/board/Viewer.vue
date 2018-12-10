<template>
  <!-- bidirectional data binding（双向数据绑定） -->

  <div>
  {{content}}
  </div>
</template>

<script>
export default {
  props: [],
  data () {
    return {
      content: null
    }
  },
  mounted () {
    this.content = localStorage.item
  },
  watch: {
  }
}
</script>
