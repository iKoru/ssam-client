<template id="mainToolbar">
  <v-toolbar color="white" :fixed="false" :light="$store.getters.isLight" flat>
    <v-toolbar-side-icon @click.stop="$store.dispatch('toggleMenuDrawer')" v-if="$vuetify.breakpoint.xsOnly"></v-toolbar-side-icon>
    <v-toolbar-title class="ml-0 pl-3 cursor-pointer" @click="goMain" title="pedagy 메인">Pedagy</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y right nudge-bottom="5px" open-on-hover v-model="menu">
      <v-btn small flat class="plain notificationActivator" v-if="$vuetify.breakpoint.smAndUp" slot="activator">
        <v-avatar size="30px" class="mr-1">
          <img :src="$store.getters.profile.picturePath || require('@/static/img/defaultUser.png')" title="프로필 이미지">
        </v-avatar>
        <v-badge color="error" :value="totalNotifications>0 && !menu && !notification">
          <span>{{nickName || ''}}</span>
          <span slot="badge">{{totalNotifications}}</span>
        </v-badge>
      </v-btn>
      <v-btn icon large class="notificationActivator" v-else slot="activator">
        <v-badge color="error" :value="totalNotifications>0 && !menu && !notification">
          <v-icon>more_vert</v-icon>
          <span slot="badge">{{totalNotifications}}</span>
        </v-badge>
      </v-btn>
      <v-list class="py-0" v-if="!notification">
        <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
          <div v-if="item.badge" class="ml-auto" :style="{'margin-right':totalNotifications > 0?'18px':'initial'}">
            <v-badge color="error" :value="totalNotifications > 0">
              <v-list-tile-content>
                  <v-list-tile-title class="text-xs-right">{{item.title}}</v-list-tile-title>
              </v-list-tile-content>
              <span slot="badge">{{totalNotifications}}</span>
            </v-badge>
          </div>
          <v-list-tile-content v-else>
            <v-list-tile-title class="text-xs-right">{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
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
          badge: true,
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
  },
  mounted() {
    this.$axios
      .get("/notification")
      .then(response => {
        this.$store.dispatch("setNotifications", response.data);
      })
      .catch(error => {
        console.log(error);
      });
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
</style>