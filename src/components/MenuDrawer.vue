<template>
  <v-container px-0 py-0 fluid>
    <v-layout>
      <v-navigation-drawer :value="$store.getters.menuDrawer" @input="drawerChanged" app id="menuDrawer">
        <v-toolbar flat class="bg-light">
          <v-list class="py-0">
            <v-list-tile @click="myPage" class="bg-light">
              <v-list-tile-title class="subheading">{{($store.getters.isLight?$store.getters.loungeNickName:$store.getters.topicNickName) +'님, 안녕하세요!'}}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-list dense class="pt-0">
          <v-list-group v-model="openLounge" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-title>
                <b class="primary--text">라운지</b>
              </v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-for="(lounge, i) in lounges.filter(x=>x.boardId)" :key="i" @click="drawerChanged(false)" :to="`/${lounge.boardId}`">
              <v-list-tile-title v-text="lounge.boardName"></v-list-tile-title>
            </v-list-tile>
          </v-list-group>
          <v-list-group v-model="openTopic" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-title>
                <b class="secondary--text">토픽</b>
              </v-list-tile-title>
            </v-list-tile>

            <v-list-tile v-for="(topic, i) in topics" :key="i" @click="drawerChanged(false)" :to="`/${topic.boardId}`" :class="{recommand:topic.notJoined}">
              <v-layout column>
                <v-list-tile-title>
                  {{topic.boardName}}
                  <v-chip v-if="topic.notJoined" small label class="ma-0">추천</v-chip>
                </v-list-tile-title>
              </v-layout>
            </v-list-tile>

            <v-list-tile @click="drawerChanged(false)" to="/searchBoard">
              <v-layout column>
                <v-list-tile-title>
                  <v-icon small>search</v-icon>다른 토픽 찾기
                </v-list-tile-title>
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
  name: 'MenuDrawer',
  props: ['lounges', 'topics'],
  methods: {
    myPage () {
      this.$router.push('/myPage');
      this.drawerChanged(false);
    },
    drawerChanged (val) {
      if (val !== this.$store.getters.menuDrawer) {
        this.$store.dispatch('toggleMenuDrawer');
      }
    }
  },
  data () {
    return {
      openLounge: true,
      openTopic: false
    };
  },
  watch: {
    openLounge (val) {
      if (val && this.openTopic) {
        this.openTopic = false;
      }
    },
    openTopic (val) {
      if (val && this.openLounge) {
        this.openLounge = false;
      }
    }
  },
  mounted () {}
};
</script>
