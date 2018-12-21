<template id="mainFooter">
  <v-footer height="auto" class="white pa-3 app--footer" absolute inset>
    <v-layout :column="$vuetify.breakpoint.smAndDown" :reverse="$vuetify.breakpoint.smAndDown">
      <v-flex>
        <div class="text-xs-center text-md-left">
          <span class="caption">Copyright &copy; {{ new Date().getFullYear() }} Pedagy. All rights reserved.</span>
        </div>
      </v-flex>
      <v-flex text-xs-center text-md-left>
        <router-link to="/about" class="caption mr-1">Pedagy 소개</router-link>|
        <router-link to="/privacy" class="caption mx-1">개인정보 처리방침</router-link>|
        <router-link to="/contract" class="caption ml-1">이용약관</router-link>
      </v-flex>
      <v-spacer></v-spacer>
    </v-layout>
  </v-footer>
</template>
<script>
export default {
  template: "#mainFooter",
  name: "mainFooter"
};
</script>
