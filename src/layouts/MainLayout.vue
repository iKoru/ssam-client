<template>
  <div class="mainLayout">
    <main-toolbar class="mainLayout__nav"></main-toolbar>
    <menu-bar :boards="$store.getters.boards"/>
    <menu-drawer :boards="$store.getters.boards"/>
    <main class="mainLayout__main">
      <slot></slot>
    </main>
    <main-footer class="mainLayout__footer"></main-footer>
  </div>
</template>
<script>
import MainToolbar from "../components/MainToolbar";
import MainFooter from "../components/MainFooter";
import MenuBar from "../components/MenuBar";
import MenuDrawer from "../components/MenuDrawer";
export default {
  components: {
    MainToolbar,
    MainFooter,
    MenuBar,
    MenuDrawer
  },
  computed: {
    boards() {
      return this.$store.getters.boards;
    }
  },
  created() {
    this.$axios
      .get("/board/list")
      .then(response => {
        this.$store.dispatch("setBoards", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style>
.mainLayout {
  background-color: white;
  min-height: 100vh;
}
.mainLayout__main {
  max-width: 1904x;
}
</style>