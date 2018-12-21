<template id="mainToolbar">
  <v-toolbar color="white" :fixed="false" :light="$store.getters.isLight" flat>
    <v-toolbar-side-icon @click.stop="$store.dispatch('toggleMenuDrawer')" v-if="$vuetify.breakpoint.xsOnly"></v-toolbar-side-icon>
    <v-toolbar-title class="ml-0 pl-3 cursor-pointer" @click="goMain" title="pedagy 메인">pedagy</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y right open-on-hover>
      <v-btn small flat slot="activator" v-if="$vuetify.breakpoint.smAndUp" class="plain">
        <v-avatar size="30px">
          <img src="@/static/img/man_1.jpg">
        </v-avatar>
        &nbsp;{{nickName || ''}}
      </v-btn>
      <v-btn icon large slot="activator" v-else>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list class="pa-0 mt-1">
        <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-dialog v-model="notification">알림센터입니다.</v-dialog>
  </v-toolbar>
</template>
<script>
export default {
  template: "#mainToolbar",
  name: "mainToolbar",
  components: {},
  data() {
    return {
      items: [
        {
          title: "내 계정정보",
          click: e => {
            this.$router.push("/myPage");
          }
        },
        {
          title: "알림내역",
          click: e => {
            this.notification = true;
          }
        },
        {
          title: "로그아웃",
          click: () => {
            this.signout();
          }
        }
      ],
      notification: false
    };
  },
  computed: {
    nickName() {
      return this.$store.getters.isLight ? this.$store.getters.loungeNickName : this.$store.getters.topicNickName;
    }
  },
  methods: {
    signout() {
      this.$store.dispatch("signout");
      this.$router.push("/index");
    },
    goMain() {
      this.$router.push("/");
    }
  }
};
</script>
