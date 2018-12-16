<template id="mainFooter">
  <v-footer height="auto" class="white pa-3 app--footer" absolute>
    <span class="caption">&copy; pedagy {{ new Date().getFullYear() }}. All rights reserved.</span>
    <v-spacer></v-spacer>
    <router-link to="/about" class="caption mr-1">pedagy 소개</router-link>|
    <router-link to="/privacy" class="caption mx-1">개인정보 처리방침</router-link>|
    <router-link to="/contract" class="caption ml-1">이용약관</router-link>
    <v-spacer></v-spacer>
  </v-footer>
</template>
<script>
export default {
  template: "#mainFooter",
  name: "mainFooter"
};
</script>
