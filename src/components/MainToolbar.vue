<template id="mainToolbar">
  <v-toolbar color="white" :fixed="false" :light="$store.getters.isLight" flat>
    <v-toolbar-side-icon @click.stop="$store.dispatch('toggleMenuDrawer')" v-if="$vuetify.breakpoint.xsOnly"></v-toolbar-side-icon>
    <v-toolbar-title :class="{'ml-0 cursor-pointer':true, 'pl-3':$vuetify.breakpoint.smAndUp}" @click="goMain" title="Pedagy 메인">
      <div style="width:120px">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1650 512" style="enable-background:new 0 0 1650 512;vertical-align:middle" xml:space="preserve">
          <path class="st1" d="M698.2,240.1c0-17.4-14.1-31.6-31.6-31.6c-17.4,0-31.6,14.1-31.6,31.6c0,17.4,14.1,31.6,31.6,31.6 C684.1,271.6,698.2,257.5,698.2,240.1"/>
          <path class="st1" d="M962.2,240.1c0-17.4-14.1-31.6-31.6-31.6c-17.4,0-31.6,14.1-31.6,31.6c0,17.4,14.1,31.6,31.6,31.6 C948,271.6,962.2,257.5,962.2,240.1"/>
          <g>
            <path class="st2" d="M1004,112.5L1004,112.5c-16.4,0-30.1,11.9-32.7,27.6c-17.1-10-37-15.8-58.3-15.8c-52.5,0-96.8,35-111,82.9
              h-37.2V72.8c0-21.3-17.3-38.6-38.6-38.6h0c-21.3,0-38.6,17.3-38.6,38.6v58.2c-12.1-4.3-25-6.6-38.6-6.6
              c-63.9,0-115.7,51.8-115.7,115.7c0,63.9,51.8,115.7,115.7,115.7c46.5,0,86.6-27.4,105-67h54c18.4,39.6,58.5,67,105,67
              c22.6,0,43.8-6.5,61.6-17.8c5.6,10.6,16.6,17.8,29.4,17.8h0c18.4,0,33.3-14.9,33.3-33.3V145.7
              C1037.2,127.4,1022.3,112.5,1004,112.5z M649,289.3c-27.2,0-49.2-22-49.2-49.2c0-27.2,22-49.2,49.2-49.2c27.2,0,49.2,22,49.2,49.2
              C698.2,267.3,676.2,289.3,649,289.3z M912.9,289.3c-27.2,0-49.2-22-49.2-49.2c0-27.2,22-49.2,49.2-49.2s49.2,22,49.2,49.2
              C962.2,267.3,940.1,289.3,912.9,289.3z"/>
            <path class="st2" d="M168.1,34.2C104.2,34.2,52.4,86,52.4,149.9l0,0v172.6c0,18.4,14.9,33.3,33.3,33.3h0
              c18.4,0,33.3-14.9,33.3-33.3v-67.9c14.9,7,31.6,11,49.2,11c63.9,0,115.7-51.8,115.7-115.7S232,34.2,168.1,34.2z M168.1,199.2
              c-27.2,0-49.2-22-49.2-49.2s22-49.2,49.2-49.2c27.2,0,49.2,22,49.2,49.2S195.3,199.2,168.1,199.2z"/>
            <path class="st2" d="M1264.7,112.5c-15,0-27.6,9.9-31.8,23.5c-15.3-7.5-32.5-11.7-50.7-11.7c-63.9,0-115.7,51.8-115.7,115.7
              c0,63.9,51.8,115.7,115.7,115.7c17.6,0,34.3-3.9,49.2-11v31.4c0,27.2-22,49.2-49.2,49.2c-20.3,0-37.8-12.3-45.3-29.9
              c-5.1-11.9-17.2-19.3-30.2-19.3c-24.1,0-40.1,24.8-30.4,46.9c18,40.6,58.6,68.8,105.8,68.8c62,0,112.6-48.7,115.6-110h0.1V145.7
              C1298,127.4,1283.1,112.5,1264.7,112.5z M1182.3,289.3c-27.2,0-49.2-22-49.2-49.2c0-27.2,22-49.2,49.2-49.2s49.2,22,49.2,49.2
              C1231.5,267.3,1209.4,289.3,1182.3,289.3z"/>
            <path class="st2" d="M1539.8,129.6c-18.4,0-33.3,14.9-33.3,33.3v77.2c0,27.2-22,49.2-49.2,49.2c-27.2,0-49.2-22-49.2-49.2h0v-77.2
              c0-18.4-14.9-33.3-33.3-33.3h0c-18.4,0-33.3,14.9-33.3,33.3v77.2c0,63.9,51.8,115.7,115.7,115.7c17.6,0,34.3-3.9,49.2-11v31.4
              c0,27.2-22,49.2-49.2,49.2c-20.3,0-37.8-12.3-45.3-29.9c-5.1-11.9-17.2-19.3-30.2-19.3c-24.1,0-40.1,24.8-30.4,46.9
              c18,40.6,58.6,68.8,105.8,68.8c62,0,112.6-48.7,115.6-110h0.1v-142v-77.2C1573.1,144.5,1558.2,129.6,1539.8,129.6z"/>
            <path class="st2" d="M514.1,199.3C497.5,153.7,453.6,123,405,123c-64,0-116.1,52.1-116.1,116.1S341,355.2,405,355.2
              c36.5,0,70.1-16.6,92.2-45.6c11.2-14.6,8.4-35.5-6.2-46.7c-14.6-11.2-35.5-8.4-46.7,6.2c-9.5,12.4-23.8,19.5-39.3,19.5
              c-25.6,0-46.7-19.6-49.2-44.5h127c10.9,0,21.1-5.3,27.3-14.2C516.3,220.9,517.8,209.5,514.1,199.3z M404.9,173.8
              c16.2,0,30.3,8.5,38.3,21.2h-76.7C374.6,182.3,388.8,173.8,404.9,173.8z"/>
          </g>
        </svg>
      </div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="/search" class="d-flex fill-height align-center">
      <v-icon :color="$store.getters.isLight?'primary':'secondary'">search</v-icon>
    </router-link>
    <v-menu offset-y left nudge-bottom="5px" :open-on-hover="$vuetify.breakpoint.smAndUp" v-model="menu">
      <v-btn small flat class="plain notificationActivator" v-if="$vuetify.breakpoint.smAndUp" slot="activator">
        <v-avatar size="30px" class="mr-1" :color="$store.getters.isLight?null:'secondary'">
          <img v-if="$store.getters.isLight" :src="$store.getters.profile.picturePath || '/img/defaultUser.svg'" title="프로필 이미지">
          <span v-else class="white--text subheading">{{nickName? nickName.substring(0, 1) : '?'}}</span>
        </v-avatar>
        <v-badge color="error" :value="totalNotifications>0 && !menu && !notification">
          <span class="font-weight-bold">{{nickName || ''}}</span>
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
function deleteCookie (name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export default {
  template: '#mainToolbar',
  name: 'mainToolbar',
  components: { NotificationCenter: () => import('./NotificationCenter') },
  data () {
    return {
      notification: false,
      menu: false
    };
  },
  computed: {
    nickName () {
      return this.$store.getters.isLight ? this.$store.getters.loungeNickName : this.$store.getters.topicNickName;
    },
    totalNotifications () {
      return this.$store.getters.totalNotifications;
    },
    showNotificationBadge () {
      return this.totalNotifications > 0;
    }
  },
  methods: {
    signout () {
      deleteCookie('token');
      deleteCookie('_csrf');
      deleteCookie('CSRF-TOKEN');
      this.$axios
        .post('/signout', null, { headers: { silent: true } })
        .then(() => {
          this.$store.dispatch('setToken', false);
          this.$store.dispatch('setUserId', null);
          this.$router.push('/index');
        })
        .catch(error => {
          this.$store.dispatch('showSnackbar', { text: error && error.response ? error.response.data.message : '로그아웃하지 못했습니다.', color: 'error' });
        });
    },
    goMain () {
      this.$router.push('/');
    },
    openDialog () {
      this.notification = true;
    },
    closeDialog () {
      this.notification = false;
    }
  }
};
</script>
