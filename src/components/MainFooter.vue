<template id="mainFooter">
  <v-footer height="auto" class="pa-3 app--footer" absolute inset>
    <v-layout :column="$route.path === '/index'?$vuetify.breakpoint.mdAndDown:$vuetify.breakpoint.smAndDown" :reverse="$route.path === '/index'?$vuetify.breakpoint.mdAndDown:$vuetify.breakpoint.smAndDown">
      <v-flex :class="{'position-absolute':$route.path === '/index'?$vuetify.breakpoint.lgAndUp:$vuetify.breakpoint.mdAndUp}">
        <div class="text-xs-center text-lg-left">
          <span class="caption">Copyright &copy; {{ new Date().getFullYear() }} Pedagy. All rights reserved.</span>
        </div>
      </v-flex>
      <v-flex text-xs-center>
        <router-link to="/contract" class="caption mr-1">이용약관</router-link>|
        <router-link to="/privacy" class="caption mr-1">개인정보 처리방침</router-link>|
        <router-link to="/rules" class="caption">커뮤니티 이용규칙</router-link>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
export default {
  template: '#mainFooter',
  name: 'mainFooter'
};
</script>
