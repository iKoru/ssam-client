<template id="mainToolbar">
  <v-toolbar color="white" :fixed="false" :light="$store.getters.isLight" flat>
    <v-toolbar-side-icon @click.stop="$store.dispatch('toggleMenuDrawer')" v-if="$vuetify.breakpoint.xsOnly"></v-toolbar-side-icon>
    <v-toolbar-title class="ml-0 pl-3 cursor-pointer" @click="goMain" title="pedagy 메인">Pedagy</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y right>
      <v-btn small flat slot="activator" v-if="$vuetify.breakpoint.smAndUp" class="plain notificationActivator">
        <v-avatar size="30px" class="mr-1">
          <img :src="$store.getters.profile.picturePath || require('@/static/img/defaultUser.png')" title="프로필 이미지">
        </v-avatar>
        {{nickName || ''}}
      </v-btn>
      <v-btn icon large slot="activator" v-else class="notificationActivator">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list class="pa-0 mt-2">
        <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-dialog v-model="notification" fullscreen v-if="$vuetify.breakpoint.xsOnly" transition="dialog-bottom-transition" lazy scrollable>
      <notification-center @closeDialog="closeDialog" :dialog="notification"/>
    </v-dialog>
    <v-menu v-model="notification" v-else :nudge-width="200" offset-y right attach=".notificationActivator">
      <notification-center @closeDialog="closeDialog" :dialog="notification"/>
    </v-menu>
  </v-toolbar>
</template>
<script>
export default {
  template: "#mainToolbar",
  name: "mainToolbar",
  components: {NotificationCenter:() => import('./NotificationCenter')},
  data() {
    return {
      items: [
        {
          title: "내 계정정보",
          click: e => {
            this.$router.push("/myPage");
            return true;
          }
        },
        {
          title: "내 커뮤니티",
          click: e => {
            this.$router.push("/myCommunity");
            return true;
          }
        },
        {
          title: "알림내역",
          click: e => {
            this.notification = true;
            return true;
          }
        },
        {
          title: "로그아웃",
          click: () => {
            this.signout();
            return true;
          }
        }
      ],
      notification: false,
      menu:false
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
    },
    openDialog(){
      this.notification = true;
    },
    closeDialog(){
      this.notification = false;
    }
  }
};
</script>
<style>
  .v-menu__content{
    background-color:white;
  }
</style>