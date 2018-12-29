<template>
  <v-container px-0 py-0 fluid>
    <v-tabs :dark="menu!==undefined?menu===1:!$store.getters.isLight" hide-slider v-model="menu" :mandatory="false" height="32">
      <v-tab :key="0" class="loungeTab" @click="toggleMenuBar('lounge')">라운지</v-tab>
      <v-spacer :class="{tapSpacer:true, dark:menu!==undefined?menu===1:!$store.getters.isLight}"/>
      <v-tab :key="1" class="topicTab" @click="toggleMenuBar('topic')">토픽</v-tab>
      <v-tabs-items touchless :dark="menu!==undefined?menu===1:!$store.getters.isLight" :class="{'d-none':!menuBar}">
        <v-tab-item :key="0">
          <v-flex class="scrollContainer">
            <v-flex class="menuColumn" xs4 sm2 v-for="n in Math.floor(lounges.length / 3)" :key="n">
              <v-layout column>
                <v-flex>{{lounges[n*3].boardName}}</v-flex>
                <v-flex>{{lounges[(n*3)+1].boardName}}</v-flex>
                <v-flex>{{lounges[(n*3)+2].boardName}}</v-flex>
              </v-layout>
            </v-flex>
            <v-flex class="menuColumn" xs4 sm2 v-if="lounges.length % 3 !== 0">
              <v-layout column>
                <v-flex v-for="n in (lounges.length % 3) - 1" :key="n">{{(lounges[lounges.length - (lounges.length % 3) + n])?(lounges[lounges.length - (lounges.length % 3) + n]).boardName:(lounges[lounges.length - (lounges.length % 3) + n])}}</v-flex>
              </v-layout>
            </v-flex>
          </v-flex>
        </v-tab-item>
        <v-tab-item :key="1">
          <v-flex class="scrollContainer">
            <v-flex class="menuColumn" xs4 sm2 v-for="n in Math.floor(topics.length / 3)" :key="n">
              <v-layout column>
                <v-flex>topics[n*3].boardName</v-flex>
                <v-flex>topics[(n*3)+1].boardName</v-flex>
                <v-flex>topics[(n*3)+2].boardName</v-flex>
              </v-layout>
            </v-flex>
            <v-flex class="menuColumn" xs4 sm2 v-if="topics.length % 3 !== 0">
              <v-layout column>
                <v-flex v-for="n in (topics.length % 3) - 1" :key="n">{{(topics[topics.length - (topics.length % 3) + n])?(topics[topics.length - (topics.length % 3) + n]).boardName:(topics[topics.length - (topics.length % 3) + n])}}</v-flex>
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
  background-color: white;
  background-image: -webkit-linear-gradient(45deg, white 95%, #424242 5%);
  background-image: linear-gradient(45deg, white 95%, #424242 5%);
  transition: background 5s linear;
}
.tapSpacer.dark {
  background-image: -webkit-linear-gradient(135deg, #424242 95%, white 5%);
  background-image: linear-gradient(135deg, white 5%, #424242 5%);
}
.scrollContainer {
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  -webkit-flex-direction: row;
  overflow-y: scroll;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.scrollContainer::-webkit-scrollbar {
  width: 0 !important;
}
.menuColumn {
  margin: 20px;
  min-width: 100px;
}
</style>
