<template>
  <v-layout>
    <v-flex row>
      <Editor :board="board"/>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'WriteDocument',
  components: {
    Editor: () => import('@/components/board/editor/Editor')
  },
  props: ['board'],
  created () {
    this.$store.dispatch('setColumnType', 'HIDE_SM');
  }
};
</script>
