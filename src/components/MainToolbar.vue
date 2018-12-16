<template id="mainToolbar">
  <v-toolbar color="white" :fixed="false" :light="$store.getters.isLight" flat>
    <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    <v-toolbar-title class="ml-0 pl-3">pedagy admin</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
      <v-btn icon large flat slot="activator" v-if="$vuetify.breakpoint.smAndUp">
        <v-avatar size="30px">
          <img src="static/img/man_1.jpg">
        </v-avatar>
        {{nickName || ''}}님, 안녕하세요!
      </v-btn>
      <v-btn icon large slot="activator" v-if="$vuetify.breakpoint.xsOnly">
        <v-icon>menu</v-icon>
      </v-btn>
      <v-list class="pa-0">
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
          title: this.$store.getters.loungeNickName,
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
          icon: "fullscreen_exit",
          title: "로그아웃",
          click() {
            this.signout();
          }
        }
      ],
      notification: false
    };
  },
  created() {
    console.log("created toolbar, ", this);
  },
  computed: {
    nickName() {
      return this.$store.getters.loungeNickName;
    }
  },
  methods: {
    signout() {
      this.$store.dispatch("signout");
      this.$router.push("/");
    }
  }
};
</script>
