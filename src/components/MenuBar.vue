<template>
  <v-container px-0 py-0 fluid>
    <v-tabs :dark="menu!==undefined?menu===1:!$store.getters.isLight" hide-slider v-model="menu" :mandatory="false" height="32">
      <v-tab :key="0" class="loungeTab" @click="toggleMenuBar('lounge')">라운지</v-tab>
      <v-spacer :class="{tapSpacer:true, dark:menu!==undefined?menu===1:!$store.getters.isLight}"/>
      <v-tab :key="1" class="topicTab" @click="toggleMenuBar('topic')">토픽</v-tab>
      <v-tabs-items v-if="$store.getters.menuBar" touchless :dark="menu!==undefined?menu===1:!$store.getters.isLight">
        <v-tab-item :key="0">
          <v-list>라운지 리스트</v-list>
        </v-tab-item>
        <v-tab-item :key="1">
          <v-list>토픽 리스트</v-list>
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
  methods: {
    toggleMenuBar(menu) {
      console.log(menu);
      if (menu === "lounge") {
        if (this.$store.getters.isLight && this.$store.getters.menuBar) {
          this.$store.dispatch("setMenuBar", false);
        } else {
          this.$store.dispatch("setMenuBar", true);
          this.$store.dispatch("switchBoardType", "L");
        }
      } else if (menu === "topic") {
        if (this.$store.getters.isLight || !this.$store.getters.menuBar) {
          this.$store.dispatch("setMenuBar", true);
          this.$store.dispatch("switchBoardType", "T");
        } else {
          this.$store.dispatch("setMenuBar", false);
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
}
.tapSpacer.dark {
  background-image: -webkit-linear-gradient(135deg, #424242 95%, white 5%);
}
</style>
