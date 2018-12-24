<template id="mainToolbar">
  <v-toolbar color="white" :fixed="false" :light="$store.getters.isLight" flat>
    <v-toolbar-side-icon @click.stop="$store.dispatch('toggleMenuDrawer')" v-if="$vuetify.breakpoint.xsOnly"></v-toolbar-side-icon>
    <v-toolbar-title class="ml-0 pl-3 cursor-pointer" @click="goMain" title="pedagy 메인">Pedagy</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y right open-on-hover>
      <v-btn small flat slot="activator" v-if="$vuetify.breakpoint.smAndUp" class="plain">
        <v-avatar size="30px">
          <img :src="$store.getters.profile.picturePath || require('@/static/img/defaultUser.png')" title="프로필 이미지">
        </v-avatar>
        &nbsp;{{nickName || ''}}
      </v-btn>
      <v-btn icon large slot="activator" v-else>
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
    <v-dialog v-model="notification" :fullscreen="$vuetify.breakpoint.xsOnly" hide-overlay transition="dialog-bottom-transition" scrollable>
        <v-card tile>
          <v-toolbar card color="primary">
            <v-toolbar-title>알림센터</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="notification = false">
              <v-icon>keyboard_arrow_down</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-tooltip right>
              <v-btn slot="activator">Tool Tip Activator</v-btn>
              Tool Tip
            </v-tooltip>
            <v-list three-line subheader>
              <v-subheader>User Controls</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Content filtering</v-list-tile-title>
                  <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Password</v-list-tile-title>
                  <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader>
              <v-subheader>General</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Notifications</v-list-tile-title>
                  <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Sound</v-list-tile-title>
                  <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Auto-add widgets</v-list-tile-title>
                  <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>

          <v-flex></v-flex>
        </v-card>
      </v-dialog>
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
    }
  }
};
</script>
<style>
  .v-menu__content{
    background-color:white;
  }
</style>