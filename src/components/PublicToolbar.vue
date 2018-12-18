<template id="publicToolbar">
  <v-toolbar color="#fafafa" :fixed="false" :light="$store.getters.isLight" flat>
    <v-toolbar-title class="ml-0 pl-3 cursor-pointer" @click="goIndex" title="Pedagy 홈">Pedagy</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>
<script>
export default {
  name: "publicToolbar",
  methods: {
    goIndex() {
      if (this.$store.getters.accessToken) {
        this.$router.push("/");
      } else {
        this.$router.push("/index");
      }
    }
  }
};
</script>