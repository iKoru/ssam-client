<template>
  <!-- bidirectional data binding（双向数据绑定） -->
  <div>{{content}}</div>
</template>

<script>
//import LinkPrevue from '@/components/LinkPrevue'
export default {
  props: [],
  data() {
    return {
      content: null
    };
  },
  mounted() {
    this.content = localStorage.item;
  },
  created() {
    this.getDocument();
  },
  methods: {
    getDocument: function() {
      this.$axios
        .get(`/${this.$route.params.boardId}/${this.$route.params.documentId}`)
        .then(response => {
          console.log(response);
        
          this.content = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    savedContent(to, from) {
      let href = to.match(/\bhttps?:\/\/\S+/gi);
      if (href) {
        this.link = href[0].substr(0, href[0].indexOf("<"));
        console.log(this.link);
      }
    }
  }
};
</script>
