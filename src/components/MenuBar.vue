<template>
  <v-container px-0 py-0 :mb-3="$route.path !== '/'" fluid id="menubarContainer">
    <v-layout row id="menuBar" class="position-relative" :wrap="$vuetify.breakpoint.xsOnly">
      <v-flex sm2 :class="{'loungeTab scrollContainer overflow-hidden position-relative':true, 'hide-menuBar':!menuBar}" order-sm1 xs6 order-xs1>
        <v-flex class="position-absolute menuBarTab">
          <v-tabs light hide-slider v-model="menu" :mandatory="false" height="32">
            <v-tab :key="0" class="loungeTab flex" @click.stop="toggleMenuBar('lounge')">라운지</v-tab>
          </v-tabs>
        </v-flex>
        <v-layout row class="menuBarContents" :style="{'margin-top':menuBar?0:'32px'}" v-if="$vuetify.breakpoint.smAndUp">
          <v-flex class="menuColumn position-relative">
            <v-layout column>
              <template v-if="lounges.length > 2">
                <v-flex v-for="n in 3" :key="n" class="ellipsis">
                  <router-link :to="'/'+lounges[n-1].boardId" v-if="lounges[n-1].boardId !== null">{{lounges[n-1].boardName || '&nbsp;'}}</router-link>
                  <span v-else class="cursor-default">&nbsp;</span>
                </v-flex>
              </template>
              <template v-else-if="lounges.length === 0">
                <v-flex class="cursor-default">&nbsp;</v-flex>
                <v-flex class="cursor-default">&nbsp;</v-flex>
                <v-flex class="cursor-default">&nbsp;</v-flex>
              </template>
              <template v-else-if="lounges.length === 1">
                <v-flex class="ellipsis">
                  <router-link :to="'/'+lounges[0].boardId">{{lounges[0].boardName}}</router-link>
                </v-flex>
                <v-flex class="cursor-default">&nbsp;</v-flex>
                <v-flex class="cursor-default">&nbsp;</v-flex>
              </template>
              <template v-else>
                <v-flex class="ellipsis">
                  <router-link :to="'/'+lounges[0].boardId">{{lounges[0].boardName}}</router-link>
                </v-flex>
                <v-flex class="ellipsis">
                  <router-link :to="'/'+lounges[1].boardId" v-if="lounges[1].boardId">{{lounges[1].boardName}}</router-link>
                  <span v-else class="cursor-default">&nbsp;</span>
                </v-flex>
                <v-flex class="cursor-default">&nbsp;</v-flex>
              </template>
            </v-layout>
            <div class="switchTabIcon switchToTopic cursor-pointer" v-show="menu===1" @click="toggleMenuBar('lounge')">
              <v-icon>navigate_next</v-icon>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex sm2 :class="{'topicTab scrollContainer':true, 'hide-menuBar':!menuBar}" id="topicTabScreen" v-if="$vuetify.breakpoint.smAndUp"></v-flex>
      <v-flex sm2 :class="{'topicTab scrollContainer overflow-hidden':true, 'hide-menuBar':!menuBar}" order-sm3 v-show="menu===0 && $vuetify.breakpoint.smAndUp">
        <v-layout row class="menuBarContents">
          <v-flex class="menuColumn position-relative" id="topicFixedColumn">
            <div class="switchTabIcon switchToLounge cursor-pointer" @click="toggleMenuBar('topic')">
              <v-icon class="white--text">navigate_before</v-icon>
            </div>
            <div class="ml-2">
              <template v-if="topics.length > 2">
                <v-flex v-for="n in 3" :key="n" class="ellipsis">
                  <router-link :to="'/'+topics[n-1].boardId">{{topics[n-1].boardName}}</router-link>
                </v-flex>
              </template>
              <template v-else>
                <template v-if="topics.length === 0">
                  <v-flex class="cursor-default">&nbsp;</v-flex>
                  <v-flex class="cursor-default">&nbsp;</v-flex>
                  <v-flex class="cursor-default">&nbsp;</v-flex>
                </template>
                <template v-else-if="topics.length === 1">
                  <v-flex class="ellipsis">
                    <router-link :to="'/'+topics[0].boardId">{{topics[0].boardName}}</router-link>
                  </v-flex>
                  <v-flex class="cursor-default">&nbsp;</v-flex>
                  <v-flex class="cursor-default">&nbsp;</v-flex>
                </template>
                <template v-else>
                  <v-flex class="ellipsis">
                    <router-link :to="'/'+topics[0].boardId">{{topics[0].boardName}}</router-link>
                  </v-flex>
                  <v-flex class="ellipsis">
                    <router-link :to="'/'+topics[1].boardId">{{topics[1].boardName}}</router-link>
                  </v-flex>
                  <v-flex class="cursor-default">&nbsp;</v-flex>
                </template>
              </template>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex order-sm2 order-xs3>
        <v-tabs-items v-model="menu" :dark="menu!==undefined?menu===1:!$store.getters.isLight" :mandatory="false" touchless>
          <v-tab-item :key="0" :class="{'d-none':!menuBar, 'menuBarContents':true}">
            <template v-show="menu===0">
              <v-flex class="scrollContainer" v-if="$vuetify.breakpoint.smAndUp">
                <template v-if="lounges.length > 5">
                  <v-flex class="menuColumn loungeColumn" sm2 v-for="n in (Math.floor(lounges.length / 3) - 1)" :key="n">
                    <v-layout column>
                      <v-flex class="ellipsis">
                        <router-link :to="'/'+lounges[n*3].boardId" :title="lounges[n*3].boardName">{{lounges[n*3].boardName}}</router-link>
                      </v-flex>
                      <v-flex class="ellipsis">
                        <router-link :to="'/'+lounges[(n*3)+1].boardId" :title="lounges[(n*3)+1].boardName">{{lounges[(n*3)+1].boardName}}</router-link>
                      </v-flex>
                      <v-flex class="ellipsis">
                        <router-link :to="'/'+lounges[(n*3)+2].boardId" :title="lounges[(n*3)+2].boardName">{{lounges[(n*3)+2].boardName}}</router-link>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </template>
                <v-flex class="menuColumn loungeColumn" sm2 v-if="lounges.length % 3 !== 0">
                  <v-layout column>
                    <v-flex v-for="n in (lounges.length % 3)" :key="n" class="ellipsis">
                      <router-link :to="'/'+lounges[lounges.length - (lounges.length % 3) + n - 1].boardId" :title="lounges[lounges.length - (lounges.length % 3) + (n-1)].boardName">{{lounges[lounges.length - (lounges.length % 3) + (n-1)].boardName}}</router-link>
                    </v-flex>
                    <v-flex class="cursor-default">&nbsp;</v-flex>
                    <v-flex class="cursor-default" v-if="lounges.length % 3 === 1">&nbsp;</v-flex>
                  </v-layout>
                </v-flex>
              </v-flex>
              <v-flex class="scrollContainer" v-else>
                <v-flex class="menuColumn loungeColumn ellipsis text-xs-center px-1" xs4 v-for="lounge in lounges.filter(x=>x.boardId)" :key="lounge.boardId">
                  <router-link :to="'/'+lounge.boardId" :title="lounges.boardName">{{lounge.boardName}}</router-link>
                </v-flex>
              </v-flex>
            </template>
          </v-tab-item>
          <v-tab-item :key="1" :class="{'d-none':!menuBar, 'menuBarContents':true, 'secondary':true, 'white--text':true}">
            <template v-show="menu === 1">
              <v-flex class="scrollContainer" v-if="$vuetify.breakpoint.smAndUp">
                <v-flex class="menuColumn topicColumn" sm2 v-for="n in (Math.floor(topics.length / 3))" :key="n">
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
                <v-flex class="menuColumn topicColumn" sm2 v-if="topics.length % 3 !== 0">
                  <v-layout column>
                    <v-flex v-for="n in topics.length % 3" :key="n" class="ellipsis">
                      <router-link :class="{'white--text':true, 'text-darken-1':topics[topics.length - (topics.length %3) + n - 1].notJoined}" :title="topics[topics.length - (topics.length %3) + n - 1].notJoined?'추천 토픽':topics[topics.length - (topics.length %3) + n - 1].boardName" :to="'/'+topics[topics.length - (topics.length %3) + n - 1].boardId">{{(topics[topics.length - (topics.length % 3) + (n-1)]).boardName}}</router-link>
                    </v-flex>
                    <v-flex class="ellipsis">
                      <router-link class="white--text" to="/searchBoard">
                        <v-icon small>search</v-icon>다른 토픽 찾기
                      </router-link>
                    </v-flex>
                    <v-flex class="cursor-default" v-if="topics.length % 3 === 1">&nbsp;</v-flex>
                  </v-layout>
                </v-flex>
                <v-flex class="menuColumn topicColumn" sm2 v-else>
                  <v-layout column>
                    <v-flex class="ellipsis">
                      <router-link class="white--text" to="/searchBoard">
                        <v-icon small>search</v-icon>다른 토픽 찾기
                      </router-link>
                    </v-flex>
                    <v-flex class="cursor-default">&nbsp;</v-flex>
                    <v-flex class="cursor-default">&nbsp;</v-flex>
                  </v-layout>
                </v-flex>
              </v-flex>
              <v-flex class="scrollContainer" v-else>
                <v-flex class="menuColumn topicColumn text-xs-center ellipsis px-1" xs4 v-for="topic in topics" :key="topic.boardId">
                  <router-link :class="{'white--text':true, 'text-darken-1':topic.notJoined}" :title="topic.notJoined?'추천 토픽':topic.boardName" :to="'/'+topic.boardId">{{topic.boardName}}</router-link>
                </v-flex>
              </v-flex>
            </template>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
      <v-flex xs6 sm2 class="topicTabMenuBar" order-xs2>
        <v-tabs dark hide-slider v-model="menu" :mandatory="false" height="32">
          <v-tab :key="1" class="topicTab flex" @click.stop="toggleMenuBar('topic')">토픽</v-tab>
        </v-tabs>
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
        if (this.menu === 0 && this.menuBar) {
          this.$store.dispatch("setMenuBar", false);
          this.menu = null;
        } else {
          this.$store.dispatch("setMenuBar", true);
          this.$nextTick(() => {
            this.menu = 0;
          });
        }
      } else if (menu === "topic") {
        if (this.menu === 1 && this.menuBar) {
          this.$store.dispatch("setMenuBar", false);
          this.menu = null;
        } else {
          this.$store.dispatch("setMenuBar", true);
          this.$nextTick(() => {
            this.menu = 1;
          });
        }
      }
    }
  }
};
</script>

<style>
#menuBar {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  /*margin-top: 1px;*/
}
#menubarContainer {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.menuBarTab {
  max-height: 32px;
  width: 100%;
  top: 0;
}
.menuBarTab a {
  position: absolute !important;
  width: 100%;
}
.loungeTab {
  background-color: white;
}
.topicTab {
  background-color: #424242;
}
.topicTab a,
.topicTab .flex {
  color: white;
}
.v-tabs__div.topicTab {
  width: 100%;
  font-size: 16px;
  font-weight: bold;
}
.v-tabs__div.loungeTab {
  display: block;
  font-size: 16px;
  font-weight: bold;
}
.topicTab .v-tabs__item {
  opacity: 1;
}
.menuColumn.loungeColumn:last-child,
.menuColumn.topicColumn:last-child,
#topicFixedColumn {
  border-right: none;
}
#topicTabScreen {
  position: absolute;
  width: 100%;
  right: 0;
  visibility: visible;
  transition: height 0.3s linear;
}
#topicTabScreen.hide-menuBar {
  visibility: hidden;
}
.menuBarContents {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.switchTabIcon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.switchTabIcon.switchToTopic {
  right: 0;
}
.switchTabIcon.switchToLounge {
  left: 0;
}
.scrollContainer {
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  height: 32px;
}

.scrollContainer.topicTab.hide-menuBar,
.scrollContainer.loungeTab.hide-menuBar {
  height: 32px;
}
.scrollContainer.overflow-hidden {
  overflow-x: hidden;
}
.menuColumn {
  margin: auto 0px;
  padding: 0 20px;
  min-width: 100px;
  border-right: 1px solid #e8e8e8;
}
.menuColumn .flex {
  margin: 2px 0;
}
@media (min-width: 600px) {
  .scrollContainer {
    height: 116px;
  }
  .topicTabMenuBar.flex.sm2 {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 13.88888888889%;
    flex-basis: 13.88888888889%;
  }
  .menuColumn.loungeColumn {
    max-width: 19.233333333333334%;
    flex-basis: 19.233333333333334%;
  }
  .scrollContainer.topicTab,
  .scrollContainer.loungeTab {
    height: 132px;
    max-width: 13.88888888889%;
    flex-basis: 13.88888888889%;
  }
  .menuBarContents {
    padding-top: 16px;
  }
}
</style>
