<template>
  <v-container px-0 py-0 fluid>
    <v-tabs :dark="menu!==undefined?menu===1:!$store.getters.isLight" hide-slider v-model="menu" :mandatory="false" height="32" id="menuBarTabs">
      <v-tab :key="0" class="loungeTab" @click="toggleMenuBar('lounge')">라운지</v-tab>
      <v-spacer :class="{tapSpacer:true, dark:menu!==undefined?menu===1:!$store.getters.isLight}"/>
      <v-tab :key="1" class="topicTab" @click="toggleMenuBar('topic')">토픽</v-tab>
      <v-tabs-items touchless :dark="menu!==undefined?menu===1:!$store.getters.isLight" :class="{'d-none':!menuBar}">
        <v-tab-item :key="0">
          <v-flex class="scrollContainer">
            <v-flex class="menuColumn" sm2 v-for="n in Math.floor(lounges.length / 3)" :key="n">
              <v-layout column>
                <v-flex>
                  <router-link :to="'/'+lounges[(n-1)*3].boardId" :title="lounges[(n-1)*3].boardName">{{lounges[(n-1)*3].boardName}}</router-link>
                </v-flex>
                <v-flex>
                  <router-link :to="'/'+lounges[((n-1)*3)+1].boardId" :title="lounges[((n-1)*3)+1].boardName">{{lounges[((n-1)*3)+1].boardName}}</router-link>
                </v-flex>
                <v-flex>
                  <router-link :to="'/'+lounges[((n-1)*3)+2].boardId" :title="lounges[((n-1)*3)+2].boardName">{{lounges[((n-1)*3)+2].boardName}}</router-link>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex class="menuColumn" sm2 v-if="lounges.length % 3 !== 0">
              <v-layout column>
                <v-flex v-for="n in (lounges.length % 3)" :key="n">
                  <router-link :to="'/'+lounges[lounges.length - (lounges.length % 3) + n - 1].boardId" :title="lounges[lounges.length - (lounges.length % 3) + (n-1)].boardName">{{lounges[lounges.length - (lounges.length % 3) + (n-1)].boardName}}</router-link>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-flex>
        </v-tab-item>
        <v-tab-item :key="1" class="secondary white--text">
          <v-flex class="scrollContainer">
            <v-flex class="menuColumn" sm2 v-for="n in (Math.floor(topics.length / 3))" :key="n">
              <v-layout column>
                <v-flex>
                  <router-link :class="{'white--text':true, 'text-darken-1':topics[(n-1)*3].notJoined}" :title="topics[(n-1)*3].notJoined?'추천 토픽':topics[(n-1)*3].boardName" :to="'/'+topics[(n-1)*3].boardId">{{topics[(n-1)*3].boardName}}</router-link>
                </v-flex>
                <v-flex>
                  <router-link :class="{'white--text':true, 'text-darken-1':topics[((n-1)*3) + 1].notJoined}" :title="topics[((n-1)*3) + 1].notJoined?'추천 토픽':topics[((n-1)*3) + 1].boardName" :to="'/'+topics[((n-1)*3)+1].boardId">{{topics[((n-1)*3)+1].boardName}}</router-link>
                </v-flex>
                <v-flex>
                  <router-link :class="{'white--text':true, 'text-darken-1':topics[((n-1)*3) + 2].notJoined}" :title="topics[((n-1)*3) + 2].notJoined?'추천 토픽':topics[((n-1)*3) + 2].boardName" :to="'/'+topics[((n-1)*3)+2].boardId">{{topics[((n-1)*3)+2].boardName}}</router-link>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex class="menuColumn" sm2 v-if="topics.length % 3 !== 0">
              <v-layout column>
                <v-flex v-for="n in topics.length % 3" :key="n">
                  <router-link :class="{'white--text':true, 'text-darken-1':topics[topics.length - (topics.length %3) + n - 1].notJoined}" :title="topics[topics.length - (topics.length %3) + n - 1].notJoined?'추천 토픽':topics[topics.length - (topics.length %3) + n - 1].boardName" :to="'/'+topics[topics.length - (topics.length %3) + n - 1].boardId">{{(topics[topics.length - (topics.length % 3) + (n-1)]).boardName}}</router-link>
                </v-flex>
                <v-flex>
                  <router-link class="white--text" to="/searchBoard">
                    <v-icon small>add</v-icon>다른 토픽 찾기
                  </router-link>
                </v-flex>
                <v-flex v-if="topics.length % 3 === 1">&nbsp;</v-flex>
              </v-layout>
            </v-flex>
            <v-flex class="menuColumn" sm2 v-else>
              <v-layout column>
                <v-flex>
                  <router-link class="white--text" to="/searchBoard">
                    <v-icon small>add</v-icon>다른 토픽 찾기
                  </router-link>
                </v-flex>
                <v-flex>&nbsp;</v-flex>
                <v-flex>&nbsp;</v-flex>
              </v-layout>
            </v-flex>
          </v-flex>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-container>
</template>

<script>
export default {
  name: "MenuBar",
  props: ["lounges", "topics"],
  data() {
    return {
      menu: 0
    };
  },
  computed: {
    menuBar() {
      return this.$store.getters.menuBar;
    }
  },
  methods: {
    toggleMenuBar(menu) {
      if (menu === "lounge") {
        if (this.$store.getters.isLight && this.menuBar) {
          this.$store.dispatch("setMenuBar", false);
          this.menu = 0;
        } else {
          this.$store.dispatch("setMenuBar", true);
          this.$store.dispatch("switchBoardType", "L");
        }
      } else if (menu === "topic") {
        if (this.$store.getters.isLight || !this.menuBar) {
          this.$store.dispatch("setMenuBar", true);
          this.$store.dispatch("switchBoardType", "T");
        } else {
          this.$store.dispatch("setMenuBar", false);
          this.menu = this.$store.getters.isLight ? 0 : 1;
        }
      }
    }
  }
};
</script>

<style>
#menuBarTabs {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.menu {
  height: 150px;
  background-color: lightgrey;
}
@media (max-width: 600px) {
  .menu {
    height: 35px;
    overflow: auto;
  }
}
.loungeTab {
  background-color: white;
}
.topicTab {
  background-color: #424242;
}
.topicTab a {
  color: white;
}
.tapSpacer {
  background-image: -webkit-linear-gradient(45deg, white 92%, #424242 8%);
  background-image: linear-gradient(45deg, white 92%, #424242 8%);
  margin: -1px;
}
.tapSpacer.dark {
  background-image: -webkit-linear-gradient(135deg, #424242 92%, white 8%);
  background-image: linear-gradient(135deg, white 8%, #424242 8%);
}
.scrollContainer {
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  overflow-x: auto;
  /* -ms-overflow-style: none;
  overflow: -moz-scrollbars-none; */
  height: 120px;
}
/* .scrollContainer::-webkit-scrollbar {
  width: 0 !important;
} */
.menuColumn {
  margin: auto 20px;
  min-width: 100px;
}
</style>
