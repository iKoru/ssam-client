<template id="mainFooter">
  <v-footer height="auto" class="pa-3 app--footer" absolute inset>
    <v-layout :column="$vuetify.breakpoint.smAndDown" :reverse="$vuetify.breakpoint.smAndDown">
      <v-flex class="copyright">
        <div class="text-xs-center text-md-left">
          <span class="caption">Copyright &copy; {{ new Date().getFullYear() }} Pedagy. All rights reserved.</span>
        </div>
      </v-flex>
      <v-flex text-xs-center>
        <router-link to="/contract" class="caption mr-1 primary--text">이용약관</router-link>|
        <router-link to="/privacy" class="caption mx-1 primary--text">개인정보 처리방침</router-link>|
        <router-link to="/rules" class="caption ml-1 primary--text">커뮤니티 이용규칙</router-link>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
export default {
  template: "#mainFooter",
  name: "mainFooter"
};
</script>
<style>
@media (min-width: 960px) {
  .copyright {
    position: absolute;
  }
}
</style>