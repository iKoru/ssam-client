<template>
  <v-container px-0 fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row wrap align-center>
        <v-flex xs12 md8 offset-md2>
          aaa
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
export default {
  name: "Main",
  components: {
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