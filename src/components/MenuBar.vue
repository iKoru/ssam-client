<template>
  <v-container px-0 py-0 fluid id="menubarContainer">
    <v-tabs :dark="menu!==null?menu===1:!$store.getters.isLight" hide-slider v-model="menu" :mandatory="false" height="32" class="menubar">
      <v-tab :key="0" class="loungeTab menubarTab flex sm2 xl1" @click="toggleMenuBar('lounge')">라운지</v-tab>
      <v-spacer :class="{tapSpacer:true, dark:menu!==null?menu===1:!$store.getters.isLight}"/>
      <v-tab :key="1" class="topicTab menubarTab flex sm2 xl1" @click="toggleMenuBar('topic')">토픽</v-tab>
    </v-tabs>
    <v-layout row :class="{'d-none':!menuBar, 'menubar':true}">
      <v-flex sm2 xl1 v-show="menu === 1" class="scrollContainer overflow-hidden" order-sm1 @click="toggleMenuBar('lounge')">
        <v-flex class="menuColumn position-relative">
          <v-layout column>
            <template v-if="lounges.length > 2">
              <v-flex v-for="n in 3" :key="n" class="ellipsis">
                <router-link :to="lounges[n-1].boardId">{{lounges[n-1].boardName}}</router-link>
              </v-flex>
            </template>
            <template v-else>
              <template v-if="lounges.length === 0">
                <v-flex>nbsp;</v-flex>
                <v-flex>nbsp;</v-flex>
                <v-flex>nbsp;</v-flex>
              </template>
              <template v-else-if="lounges.length === 1">
                <v-flex class="ellipsis">
                  <router-link :to="lounges[0].boardId">{{lounges[0].boardName}}</router-link>
                </v-flex>
                <v-flex>nbsp;</v-flex>
                <v-flex>nbsp;</v-flex>
              </template>
              <template v-else>
                <v-flex class="ellipsis">
                  <router-link :to="lounges[0].boardId">{{lounges[0].boardName}}</router-link>
                </v-flex>
                <v-flex class="ellipsis">
                  <router-link :to="lounges[1].boardId">{{lounges[1].boardName}}</router-link>
                </v-flex>
                <v-flex>nbsp;</v-flex>
              </template>
            </template>
            <div class="switchTabIcon switchToTopic cursor-pointer">
              <v-icon>navigate_next</v-icon>
            </div>
          </v-layout>
        </v-flex>
      </v-flex>
      <v-flex sm2 xl1 v-show="menu === 0" class="topicTab scrollContainer overflow-hidden" order-sm3 @click="toggleMenuBar('topic')">
        <v-flex class="my-auto menuColumn position-relative">
          <v-layout column class="ml-2">
            <div class="switchTabIcon switchToLounge cursor-pointer">
              <v-icon class="white--text">navigate_before</v-icon>
            </div>
            <template v-if="topics.length > 2">
              <v-flex v-for="n in 3" :key="n" class="ellipsis">
                <router-link :to="topics[n-1].boardId">{{topics[n-1].boardName}}</router-link>
              </v-flex>
            </template>
            <template v-else>
              <template v-if="topics.length === 0">
                <v-flex>nbsp;</v-flex>
                <v-flex>nbsp;</v-flex>
                <v-flex>nbsp;</v-flex>
              </template>
              <template v-else-if="topics.length === 1">
                <v-flex class="ellipsis">
                  <router-link :to="topics[0].boardId">{{topics[0].boardName}}</router-link>
                </v-flex>
                <v-flex>nbsp;</v-flex>
                <v-flex>nbsp;</v-flex>
              </template>
              <template v-else>
                <v-flex class="ellipsis">
                  <router-link :to="topics[0].boardId">{{topics[0].boardName}}</router-link>
                </v-flex>
                <v-flex class="ellipsis">
                  <router-link :to="topics[1].boardId">{{topics[1].boardName}}</router-link>
                </v-flex>
                <v-flex>nbsp;</v-flex>
              </template>
            </template>
          </v-layout>
        </v-flex>
      </v-flex>
      <v-flex order-sm2>
        <v-tabs-items v-model="menu" :dark="menu!==undefined?menu===1:!$store.getters.isLight" :mandatory="false">
          <v-tab-item :key="0">
            <v-flex class="scrollContainer">
              <v-flex class="menuColumn" sm2 xl1 v-for="n in Math.floor(lounges.length / 3)" :key="n">
                <v-layout column>
                  <v-flex class="ellipsis">
                    <router-link :to="'/'+lounges[(n-1)*3].boardId" :title="lounges[(n-1)*3].boardName">{{lounges[(n-1)*3].boardName}}</router-link>
                  </v-flex>
                  <v-flex class="ellipsis">
                    <router-link :to="'/'+lounges[((n-1)*3)+1].boardId" :title="lounges[((n-1)*3)+1].boardName">{{lounges[((n-1)*3)+1].boardName}}</router-link>
                  </v-flex>
                  <v-flex class="ellipsis">
                    <router-link :to="'/'+lounges[((n-1)*3)+2].boardId" :title="lounges[((n-1)*3)+2].boardName">{{lounges[((n-1)*3)+2].boardName}}</router-link>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex class="menuColumn" sm2 xl1 v-if="lounges.length % 3 !== 0">
                <v-layout column>
                  <v-flex v-for="n in (lounges.length % 3)" :key="n" class="ellipsis">
                    <router-link :to="'/'+lounges[lounges.length - (lounges.length % 3) + n - 1].boardId" :title="lounges[lounges.length - (lounges.length % 3) + (n-1)].boardName">{{lounges[lounges.length - (lounges.length % 3) + (n-1)].boardName}}</router-link>
                  </v-flex>
                  <v-flex>&nbsp;</v-flex>
                  <v-flex v-if="topics.length % 3 === 1">&nbsp;</v-flex>
                </v-layout>
              </v-flex>
            </v-flex>
          </v-tab-item>
          <v-tab-item :key="1" class="secondary white--text">
            <v-flex class="scrollContainer">
              <v-flex class="menuColumn" sm2 xl1 v-for="n in (Math.floor(topics.length / 3))" :key="n">
                <v-layout column>
                  <v-flex class="ellipsis">
                    <router-link :class="{'white--text':true, 'text-darken-1':topics[(n-1)*3].notJoined}" :title="topics[(n-1)*3].notJoined?'추천 토픽':topics[(n-1)*3].boardName" :to="'/'+topics[(n-1)*3].boardId">{{topics[(n-1)*3].boardName}}</router-link>
                  </v-flex>
                  <v-flex class="ellipsis">
                    <router-link :class="{'white--text':true, 'text-darken-1':topics[((n-1)*3) + 1].notJoined}" :title="topics[((n-1)*3) + 1].notJoined?'추천 토픽':topics[((n-1)*3) + 1].boardName" :to="'/'+topics[((n-1)*3)+1].boardId">{{topics[((n-1)*3)+1].boardName}}</router-link>
                  </v-flex>
                  <v-flex class="ellipsis">
                    <router-link :class="{'white--text':true, 'text-darken-1':topics[((n-1)*3) + 2].notJoined}" :title="topics[((n-1)*3) + 2].notJoined?'추천 토픽':topics[((n-1)*3) + 2].boardName" :to="'/'+topics[((n-1)*3)+2].boardId">{{topics[((n-1)*3)+2].boardName}}</router-link>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex class="menuColumn" sm2 xl1 v-if="topics.length % 3 !== 0">
                <v-layout column>
                  <v-flex v-for="n in topics.length % 3" :key="n" class="ellipsis">
                    <router-link :class="{'white--text':true, 'text-darken-1':topics[topics.length - (topics.length %3) + n - 1].notJoined}" :title="topics[topics.length - (topics.length %3) + n - 1].notJoined?'추천 토픽':topics[topics.length - (topics.length %3) + n - 1].boardName" :to="'/'+topics[topics.length - (topics.length %3) + n - 1].boardId">{{(topics[topics.length - (topics.length % 3) + (n-1)]).boardName}}</router-link>
                  </v-flex>
                  <v-flex class="ellipsis">
                    <router-link class="white--text" to="/searchBoard">
                      <v-icon small>search</v-icon>다른 토픽 찾기
                    </router-link>
                  </v-flex>
                  <v-flex v-if="topics.length % 3 === 1">&nbsp;</v-flex>
                </v-layout>
              </v-flex>
              <v-flex class="menuColumn" sm2 xl1 v-else>
                <v-layout column>
                  <v-flex class="ellipsis">
                    <router-link class="white--text" to="/searchBoard">
                      <v-icon small>search</v-icon>다른 토픽 찾기
                    </router-link>
                  </v-flex>
                  <v-flex>&nbsp;</v-flex>
                  <v-flex>&nbsp;</v-flex>
                </v-layout>
              </v-flex>
            </v-flex>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "MenuBar",
  props: ["lounges", "topics"],
  data() {
    return {
      menu: null
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
        if (this.menu === 0 && this.menuBar) {
          this.$store.dispatch("setMenuBar", false);
          this.menu = null;
        } else {
          this.$store.dispatch("setMenuBar", true);
          this.menu = 0;
        }
      } else if (menu === "topic") {
        if (this.menu === 1 && this.menuBar) {
          this.$store.dispatch("setMenuBar", false);
          this.menu = null;
        } else {
          this.$store.dispatch("setMenuBar", true);
          this.menu = 1;
        }
      }
    }
  }
};
</script>

<style>
.menubar {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
#menubarContainer {
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
.menubarTab a {
  position: absolute !important;
  width: 100%;
}
.loungeTab {
  background-color: white;
}
.topicTab {
  background-color: #424242;
  margin-left: auto;
}
.topicTab a,
.topicTab .flex {
  color: white;
}
.topicTab .v-tabs__item {
  opacity: 1;
}
.tapSpacer {
  /* background-color: white; */
  background: linear-gradient(to right, white 50%, #424242 50%);
  background-size: 200% 100%;
  background-position: left bottom;
  transition: background-position 0.3s cubic-bezier(0.27, 0.3, 0.53, 0.91);
  margin-right: -1px;
}
.tapSpacer.dark {
  background-position: right bottom;
  /* background-color: #424242; */
  /* transition: background-color 1000ms linear; */
}
.switchTabIcon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.switchTabIcon.switchToTopic {
  right: -20px;
}
.switchTabIcon.switchToLounge {
  left: -20px;
}
.scrollContainer {
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  overflow-x: auto;
  height: 120px;
}
.scrollContainer.overflow-hidden {
  overflow-x: hidden;
}
.menuColumn {
  margin: auto 20px;
  min-width: 100px;
}
</style>
