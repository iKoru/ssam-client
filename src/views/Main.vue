<template>
  <v-container px-0 fluid>
    <v-layout row wrap align-center>
      <v-flex xs12 sm6 md4 offset-md2>
        <board-extractor boardType="L" :maxCount="5" class="elevation-1 ma-2"></board-extractor>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <board-extractor boardType="T" :maxCount="5" class="elevation-1 ma-2"></board-extractor>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
export default {
  name: "Main",
  components: {
    BoardExtractor: () => import("@/components/board/BoardExtractor.vue")
  },
  data() {
    return {
      
    };
  },
  created() {
    this.$emit("update:layout", MainLayout);
  },
  methods: {}
};
</script>