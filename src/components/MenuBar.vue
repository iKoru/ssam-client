<template>
  <v-container px-0 py-0 :mb-3="$route.path !== '/'" fluid id="menubarContainer">
    <template v-if="$vuetify.breakpoint.smAndUp">
      <v-layout id="menuBarBackgroundMarker">
        <v-flex sm6 class="primary"></v-flex>
        <v-flex sm6 class="secondary"></v-flex>
      </v-layout>
    </template>
    <v-layout row id="menuBar" class="position-relative" :wrap="$vuetify.breakpoint.xsOnly">
      <v-flex sm2 :class="{'loungeTab scrollContainer overflow-hidden position-relative':true, 'hide-menuBar':!menuBar}" order-sm1 xs6 order-xs1>
        <v-flex class="position-absolute menuBarTab">
          <v-tabs light hide-slider v-model="menu" :mandatory="false" height="32">
            <v-tab :key="0" class="loungeTab primary flex" @click.stop="toggleMenuBar('lounge')">라운지</v-tab>
          </v-tabs>
        </v-flex>
        <v-layout row class="menuBarContents" :style="{'margin-top':menuBar?0:'32px'}" v-if="$vuetify.breakpoint.smAndUp">
          <v-flex class="menuColumn position-relative">
            <v-layout column>
              <template v-if="lounges.length > 2">
                <v-flex v-for="n in 3" :key="n" class="ellipsis">
                  <router-link :to="'/'+lounges[n-1].boardId" v-if="lounges[n-1].boardId !== null" :title="lounges[n-1].boardName" :class="{'opaque':!isTouchable(lounges[n-1])}">{{lounges[n-1].boardName || '&nbsp;'}}</router-link>
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
                  <router-link :to="'/'+lounges[0].boardId" :title="lounges[0].boardName" :class="{'opaque':!isTouchable(lounges[0])}">{{lounges[0].boardName}}</router-link>
                </v-flex>
                <v-flex class="cursor-default">&nbsp;</v-flex>
                <v-flex class="cursor-default">&nbsp;</v-flex>
              </template>
              <template v-else>
                <v-flex class="ellipsis">
                  <router-link :to="'/'+lounges[0].boardId" :title="lounges[0].boardName">{{lounges[0].boardName}}</router-link>
                </v-flex>
                <v-flex class="ellipsis">
                  <router-link :to="'/'+lounges[1].boardId" v-if="lounges[1].boardId" :title="lounges[1].boardName" :class="{'opaque':!isTouchable(lounges[1])}">{{lounges[1].boardName}}</router-link>
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
      <v-flex sm2 :class="{'topicTab scrollContainer overflow-hidden':true, 'hide-menuBar':!menuBar}" order-sm3 v-show="menu===0 && $vuetify.breakpoint.smAndUp">
        <v-layout row class="menuBarContents">
          <v-flex class="menuColumn position-relative" id="topicFixedColumn">
            <div class="switchTabIcon switchToLounge cursor-pointer" @click="toggleMenuBar('topic')">
              <v-icon>navigate_before</v-icon>
            </div>
            <div class="ml-2">
              <template v-if="topics.length > 2">
                <v-flex v-for="n in 3" :key="n">
                  <v-layout>
                    <v-chip v-if="topics[n-1].notJoined" label class="ma-0">추천</v-chip>
                    <v-flex class="ellipsis">
                      <router-link :class="{'text-darken-1':topics[n-1].notJoined, 'opaque':!isTouchable(topics[n-1])}" :title="topics[n-1].notJoined?'추천 토픽':topics[n-1].boardName" :to="'/'+topics[n-1].boardId">{{topics[n-1].boardName}}</router-link>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </template>
              <template v-else>
                <template v-if="topics.length === 0">
                  <v-flex class="cursor-default">&nbsp;</v-flex>
                  <v-flex class="cursor-default">&nbsp;</v-flex>
                  <v-flex class="cursor-default">&nbsp;</v-flex>
                </template>
                <template v-else-if="topics.length === 1">
                  <v-flex>
                    <v-layout>
                      <v-chip v-if="topics[0].notJoined" label class="ma-0">추천</v-chip>
                      <v-flex class="ellipsis">
                        <router-link :class="{'text-darken-1':topics[0].notJoined, 'opaque':!isTouchable(topics[0])}" :title="topics[0].notJoined?'추천 토픽':topics[0].boardName" :to="'/'+topics[0].boardId">{{topics[0].boardName}}</router-link>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex class="cursor-default">&nbsp;</v-flex>
                  <v-flex class="cursor-default">&nbsp;</v-flex>
                </template>
                <template v-else>
                  <v-flex>
                    <v-layout>
                      <v-chip v-if="topics[0].notJoined" label class="ma-0">추천</v-chip>
                      <v-flex class="ellipsis">
                        <router-link :class="{'text-darken-1':topics[0].notJoined, 'opaque':!isTouchable(topics[0])}" :title="topics[0].notJoined?'추천 토픽':topics[0].boardName" :to="'/'+topics[0].boardId">{{topics[0].boardName}}</router-link>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex>
                    <v-layout>
                      <v-chip v-if="topics[1].notJoined" label class="ma-0">추천</v-chip>
                      <v-flex class="ellipsis">
                        <router-link :class="{'text-darken-1':topics[1].notJoined, 'opaque':!isTouchable(topics[1])}" :title="topics[1].notJoined?'추천 토픽':topics[1].boardName" :to="'/'+topics[1].boardId">{{topics[1].boardName}}</router-link>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex class="cursor-default">&nbsp;</v-flex>
                </template>
              </template>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex order-sm2 order-xs3 :xs12="$vuetify.breakpoint.xsOnly">
        <v-tabs-items v-model="menu" :mandatory="false" touchless>
          <v-tab-item :key="0" :class="{'d-none':!menuBar, 'menuBarContents primary':true}">
            <template v-show="menu===0">
              <v-flex class="scrollContainer" v-if="$vuetify.breakpoint.smAndUp">
                <template v-if="lounges.length > 5">
                  <v-flex class="menuColumn loungeColumn" sm2 v-for="n in (Math.floor(lounges.length / 3) - 1)" :key="n">
                    <v-layout column>
                      <v-flex class="ellipsis">
                        <router-link :to="'/'+lounges[n*3].boardId" :title="lounges[n*3].boardName" :class="{'opaque':!isTouchable(lounges[n*3])}">{{lounges[n*3].boardName}}</router-link>
                      </v-flex>
                      <v-flex class="ellipsis">
                        <router-link :to="'/'+lounges[(n*3)+1].boardId" :title="lounges[(n*3)+1].boardName" :class="{'opaque':!isTouchable(lounges[(n*3)+1])}">{{lounges[(n*3)+1].boardName}}</router-link>
                      </v-flex>
                      <v-flex class="ellipsis">
                        <router-link :to="'/'+lounges[(n*3)+2].boardId" :title="lounges[(n*3)+2].boardName" :class="{'opaque':!isTouchable(lounges[(n*3)+2])}">{{lounges[(n*3)+2].boardName}}</router-link>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </template>
                <v-flex class="menuColumn loungeColumn" sm2 v-if="lounges.length % 3 !== 0">
                  <v-layout column>
                    <v-flex v-for="n in (lounges.length % 3)" :key="n" class="ellipsis">
                      <router-link :to="'/'+lounges[lounges.length - (lounges.length % 3) + n - 1].boardId" :title="lounges[lounges.length - (lounges.length % 3) + (n-1)].boardName" :class="{'opaque':!isTouchable(lounges[lounges.length - (lounges.length % 3) + (n-1)])}">{{lounges[lounges.length - (lounges.length % 3) + (n-1)].boardName}}</router-link>
                    </v-flex>
                    <v-flex class="cursor-default">&nbsp;</v-flex>
                    <v-flex class="cursor-default" v-if="lounges.length % 3 === 1">&nbsp;</v-flex>
                  </v-layout>
                </v-flex>
              </v-flex>
              <v-flex class="scrollContainer" v-else>
                <v-flex class="menuColumn loungeColumn ellipsis text-xs-center px-1" xs4 v-for="lounge in lounges.filter(x=>x.boardId)" :key="lounge.boardId">
                  <router-link :to="'/'+lounge.boardId" :title="lounges.boardName" :class="{'opaque':!isTouchable(lounge)}">{{lounge.boardName}}</router-link>
                </v-flex>
              </v-flex>
            </template>
          </v-tab-item>
          <v-tab-item :key="1" :class="{'d-none':!menuBar, 'menuBarContents':true, 'secondary':true, 'white--text':true}">
            <template v-show="menu === 1">
              <v-flex class="scrollContainer" v-if="$vuetify.breakpoint.smAndUp">
                <v-flex class="menuColumn topicColumn" sm2 v-for="n in (Math.floor(topics.length / 3))" :key="n">
                  <v-layout column>
                    <v-flex>
                      <v-layout>
                        <v-chip v-if="topics[(n-1)*3].notJoined" label>추천</v-chip>
                        <v-flex class="ellipsis">
                          <router-link :class="{'d-inline-block':true, 'text-darken-1':topics[(n-1)*3].notJoined, 'opaque':!isTouchable(topics[(n-1)*3])}" :title="topics[(n-1)*3].notJoined?'추천 토픽':topics[(n-1)*3].boardName" :to="'/'+topics[(n-1)*3].boardId">
                            {{topics[(n-1)*3].boardName}}
                          </router-link>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex>
                      <v-layout>
                        <v-chip v-if="topics[((n-1)*3)+1].notJoined" label>추천</v-chip>
                        <v-flex class="ellipsis">
                          <router-link :class="{'d-inline-block':true, 'text-darken-1':topics[((n-1)*3) + 1].notJoined, 'opaque':!isTouchable(topics[(n-1)*3 + 1])}" :title="topics[((n-1)*3) + 1].notJoined?'추천 토픽':topics[((n-1)*3) + 1].boardName" :to="'/'+topics[((n-1)*3)+1].boardId">
                            {{topics[((n-1)*3)+1].boardName}}
                          </router-link>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex>
                      <v-layout>
                        <v-chip v-if="topics[((n-1)*3)+2].notJoined" label>추천</v-chip>
                        <v-flex class="ellipsis">
                          <router-link :class="{'d-inline-block':true, 'text-darken-1':topics[((n-1)*3) + 2].notJoined, 'opaque':!isTouchable(topics[(n-1)*3 + 2])}" :title="topics[((n-1)*3) + 2].notJoined?'추천 토픽':topics[((n-1)*3) + 2].boardName" :to="'/'+topics[((n-1)*3)+2].boardId">
                            {{topics[((n-1)*3)+2].boardName}}
                          </router-link>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex class="menuColumn topicColumn" sm2 v-if="topics.length % 3 !== 0">
                  <v-layout column>
                    <v-flex v-for="n in topics.length % 3" :key="n">
                      <v-layout>
                        <v-chip v-if="topics[topics.length - (topics.length % 3) + (n-1)].notJoined" label>추천</v-chip>
                        <v-flex class="ellipsis">
                          <router-link :class="{'d-inline-block':true, 'text-darken-1':topics[topics.length - (topics.length %3) + n - 1].notJoined, 'opaque':!isTouchable(topics[topics.length - (topics.length %3) + n - 1])}" :title="topics[topics.length - (topics.length %3) + n - 1].notJoined?'추천 토픽':topics[topics.length - (topics.length %3) + n - 1].boardName" :to="'/'+topics[topics.length - (topics.length %3) + n - 1].boardId">
                            {{(topics[topics.length - (topics.length % 3) + (n-1)]).boardName}}
                          </router-link>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex class="ellipsis">
                      <router-link to="/searchBoard">
                        <v-icon small>search</v-icon>다른 토픽 찾기
                      </router-link>
                    </v-flex>
                    <v-flex class="cursor-default" v-if="topics.length % 3 === 1">&nbsp;</v-flex>
                  </v-layout>
                </v-flex>
                <v-flex class="menuColumn topicColumn" sm2 v-else>
                  <v-layout column>
                    <v-flex class="ellipsis">
                      <router-link to="/searchBoard">
                        <v-icon small>search</v-icon>다른 토픽 찾기
                      </router-link>
                    </v-flex>
                    <v-flex class="cursor-default">&nbsp;</v-flex>
                    <v-flex class="cursor-default">&nbsp;</v-flex>
                  </v-layout>
                </v-flex>
              </v-flex>
              <v-flex class="scrollContainer" v-else>
                <v-flex class="menuColumn topicColumn text-xs-center px-1" xs4 v-for="topic in topics" :key="topic.boardId">
                  <v-layout>
                    <v-chip v-if="topic.notJoined" label>추천</v-chip>
                    <v-flex class="ellipsis">
                      <router-link :class="{'d-inline-block':true, 'text-darken-1':topic.notJoined, 'opaque':!isTouchable(topic)}" :title="topic.notJoined?'추천 토픽':topic.boardName" :to="'/'+topic.boardId">
                        {{topic.boardName}}
                      </router-link>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-flex>
            </template>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
      <v-flex xs6 sm2 class="topicTabMenuBar" order-xs2>
        <v-tabs hide-slider v-model="menu" :mandatory="false" height="32">
          <v-tab :key="1" class="topicTab flex secondary" @click.stop="toggleMenuBar('topic')">토픽</v-tab>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'MenuBar',
  props: ['lounges', 'topics'],
  data () {
    return {
      menu: 0
    };
  },
  computed: {
    menuBar () {
      return this.$store.getters.menuBar;
    },
    isLight () {
      return this.$store.getters.isLight;
    }
  },
  methods: {
    toggleMenuBar (menu) {
      if (menu === 'lounge') {
        if (this.menu === 0 && this.menuBar) {
          this.$store.dispatch('setMenuBar', false);
          this.menu = null;
        } else {
          this.$store.dispatch('setMenuBar', true);
          this.$nextTick(() => {
            this.menu = 0;
          });
        }
      } else if (menu === 'topic') {
        if (this.menu === 1 && this.menuBar) {
          this.$store.dispatch('setMenuBar', false);
          this.menu = null;
        } else {
          this.$store.dispatch('setMenuBar', true);
          this.$nextTick(() => {
            this.menu = 1;
          });
        }
      }
    },
    isTouchable (board) {
      try {
        return board.statusAuth.read.includes(this.$store.getters.profile.auth)
      } catch (error) {
        try {
          return this.$store.getters.boards.find(x => x.boardId === board.boardId).statusAuth.read.includes(this.$store.getters.profile.auth)
        } catch (error2) {
          return false
        }
      }
    }
  },
  watch: {
    isLight (val) {
      this.menu = val ? 0 : 1;
    }
  }
};
</script>
