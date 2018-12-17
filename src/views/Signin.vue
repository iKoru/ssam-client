<template>
  <v-container>
    <v-layout>
      <Signin/>
    </v-layout>
  </v-container>
</template>

<script>
import PublicLayout from "../layouts/PublicLayout";
export default {
  components: {
    Signin: () => import("@/components/Signin.vue")
  },
  created() {
    this.$emit("update:layout", PublicLayout);
  }
};
</script>
<style scoped>
</style>
