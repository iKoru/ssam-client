<template>
  <v-layout>
    <v-flex row>
      <Editor/>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "WriteDocument",
  components: {
    Editor: () => import("@/components/board/editor/Editor")
  },
  created() {
    console.log("write document");
    this.$store.dispatch("setColumnType", "HIDE_SM");
  }
};
</script>
