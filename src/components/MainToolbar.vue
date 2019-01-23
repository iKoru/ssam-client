<template id="mainToolbar">
  <v-toolbar color="white" :fixed="false" :light="$store.getters.isLight" flat>
    <v-toolbar-side-icon @click.stop="$store.dispatch('toggleMenuDrawer')" v-if="$vuetify.breakpoint.xsOnly"></v-toolbar-side-icon>
    <v-toolbar-title :class="{'ml-0 cursor-pointer':true, 'pl-3':$vuetify.breakpoint.smAndUp}" @click="goMain" title="Pedagy 메인">Pedagy</v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/search" class="d-flex fill-height">
      <v-icon>search</v-icon>
    </router-link>
    <v-menu offset-y right nudge-bottom="5px" :open-on-hover="$vuetify.breakpoint.smAndUp" v-model="menu">
      <v-btn small flat class="plain notificationActivator" v-if="$vuetify.breakpoint.smAndUp" slot="activator">
        <v-avatar size="30px" class="mr-1" :color="$store.getters.isLight?null:'primary'">
          <img v-if="$store.getters.isLight" :src="$store.getters.profile.picturePath || require('@/static/img/defaultUser.png')" title="프로필 이미지">
          <span v-else class="white--text subheading">{{nickName.substring(0, 1)}}</span>
        </v-avatar>
        <v-badge color="error" :value="totalNotifications>0 && !menu && !notification">
          <span>{{nickName || ''}}</span>
          <span slot="badge">{{totalNotifications}}</span>
        </v-badge>
      </v-btn>
      <v-btn icon large class="notificationActivator" v-else slot="activator">
        <v-badge color="error" :value="totalNotifications>0 && !menu && !notification" overlap>
          <v-icon>more_vert</v-icon>
          <span slot="badge">{{totalNotifications}}</span>
        </v-badge>
      </v-btn>
      <v-list class="py-0" v-if="!notification" id="mainToolbarMenu">
        <v-list-tile to="/myPage" ripple="ripple">
          <v-list-tile-content class="align-end">내 계정정보</v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/myCommunity" ripple="ripple">
          <v-list-tile-content class="align-end">내 커뮤니티</v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="notification = true" v-if="totalNotifications > 0">
          <div class="ml-auto" style="margin-right:18px;">
            <v-badge color="error" class="d-inline-flex">
              <v-list-tile-content>
                <v-list-tile-title>알림내역</v-list-tile-title>
              </v-list-tile-content>
              <span slot="badge">{{totalNotifications}}</span>
            </v-badge>
          </div>
        </v-list-tile>
        <v-list-tile to="/message" ripple="ripple">
          <v-list-tile-content class="align-end">메시지</v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="signout">
          <v-list-tile-content class="align-end">로그아웃</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-dialog attach=".mainLayout" content-class="notificationDialog" v-model="notification" hide-overlay absolute :fullscreen="$vuetify.breakpoint.xsOnly" :transition="$vuetify.breakpoint.xsOnly?'dialog-bottom-transition':'fade-transition'" lazy scrollable>
      <notification-center @closeDialog="closeDialog" :dialog="notification"/>
    </v-dialog>
  </v-toolbar>
</template>
<script>
export default {
  template: "#mainToolbar",
  name: "mainToolbar",
  components: {NotificationCenter: () => import("./NotificationCenter")},
  data() {
    return {
      notification: false,
      menu: false
    };
  },
  computed: {
    nickName() {
      return this.$store.getters.isLight ? this.$store.getters.loungeNickName : this.$store.getters.topicNickName;
    },
    totalNotifications() {
      return this.$store.getters.totalNotifications;
    },
    showNotificationBadge() {
      return this.totalNotifications > 0;
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
    openDialog() {
      this.notification = true;
    },
    closeDialog() {
      this.notification = false;
    }
  }
};
</script>
<style>
.v-menu__content {
  background-color: white;
}
.mainLayout .v-dialog__content {
  position: fixed;
  align-items: baseline;
  justify-content: flex-end;
}
.mainLayout .v-dialog__content .notificationDialog:not(.v-dialog--fullscreen) {
  min-width: 400px;
  max-width: 500px;
  width: 30vw;
  position: absolute;
  top: 30px;
  right: 0;
}
#mainToolbarMenu {
  white-space: nowrap;
}
</style>