<template>
  <v-container px-0 py-0 fluid v-if="$vuetify.breakpoint.xsOnly">
    <v-layout>
      <v-navigation-drawer :value="$store.getters.menuDrawer" @input="drawerChanged" app id="menuDrawer">
        <v-toolbar flat>
          <v-list>
            <v-list-tile @click="myPage">
              <v-list-tile-title class="subheading">{{($store.getters.isLight?$store.getters.loungeNickName:$store.getters.topicNickName) +'님, 안녕하세요!'}}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-list>
          <v-list-group v-model="openLounge" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-title>
                <b>라운지</b>
              </v-list-tile-title>
            </v-list-tile>

            <v-list-tile @click="drawerChanged(false)" to="/loungeBest">
              <v-list-tile-title>라운지 베스트</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-for="(lounge, i) in lounges" :key="i" @click="drawerChanged(false)" :to="`/${lounge.boardId}`">
              <v-list-tile-title v-text="lounge.boardName"></v-list-tile-title>
            </v-list-tile>
          </v-list-group>
          <v-list-group v-model="openTopic" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-title>
                <b>토픽</b>
              </v-list-tile-title>
            </v-list-tile>

            <v-list-tile @click="drawerChanged(false)">
              <v-list-tile-title>핫토픽</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-for="(topic, i) in topics" :key="i" @click="drawerChanged(false)" :to="`/${topic.boardId}`" :class="{recommand:topic.notJoined}">
              <v-layout column>
                <v-list-tile-title v-text="topic.boardName"></v-list-tile-title>
                <small v-if="topic.notJoined">추천 토픽</small>
              </v-layout>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "MenuDrawer",
  props: ["lounges", "topics"],
  methods: {
    myPage() {
      this.$router.push("/myPage");
    },
    drawerChanged(val) {
      if (val !== this.$store.getters.menuDrawer) {
        this.$store.dispatch("toggleMenuDrawer");
      }
    }
  },
  data() {
    return {
      openLounge: true,
      openTopic: false
    };
  },
  watch: {
    openLounge(val) {
      if (val && this.openTopic) {
        this.openTopic = false;
      }
    },
    openTopic(val) {
      if (val && this.openLounge) {
        this.openLounge = false;
      }
    }
  },
  mounted() {}
};
</script>
<style>
#menuDrawer .v-list__group__items--no-action .v-list__tile {
  padding-left: 40px;
}
.recommand a div {
  color: rgba(0, 0, 0, 0.54);
}
</style>