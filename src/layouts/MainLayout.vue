<template>
  <div class="mainLayout">
    <main-toolbar class="mainLayout__nav"></main-toolbar>
    <component :is="$vuetify.breakpoint.smAndUp?'menu-bar':'menu-drawer'" :lounges="lounges" :topics="topics"/>
    <main class="mainLayout__main">
      <main-column-layout>
        <slot></slot>
      </main-column-layout>
    </main>
    <main-footer class="mainLayout__footer"></main-footer>
  </div>
</template>
<script>
import MainToolbar from "../components/MainToolbar";
import MainFooter from "../components/MainFooter";
import MenuDrawer from "../components/MenuDrawer";
import MenuBar from "../components/MenuBar";
import MainColumnLayout from "./MainColumnLayout";
export default {
  components: {
    MainToolbar,
    MainFooter,
    MenuDrawer,
    MenuBar,
    MainColumnLayout
  },
  computed: {
    lounges() {
      const lounges = this.$store.getters.boards.filter(x => x.boardType !== "T" && x.boardType !== 'X' && !x.parentBoardId);
      lounges.splice(0, 0, {boardName: "라운지 베스트", boardId: "loungeBest"});
      return lounges;
    },
    topics() {
      const userBoards = this.$store.getters.userBoards;
      const boards = this.$store.getters.boards;
      const topics = userBoards
        .filter(x => x.boardType === "T")
        .concat(
          boards
            .filter(x => x.boardType === "T" && x.allGroupAuth !== "NONE" && !userBoards.some(y => y.boardId === x.boardId))
            .slice(0, 10)
            .map(x => ({...x, notJoined: true}))
        );
      topics.splice(0, 0, {boardName: "핫 토픽", boardId: "topicBest"});
      return topics;
    }
  },
  created() {
    this.$axios
      .get("/user", {headers: {silent: true}})
      .then(response => {
        this.$store.dispatch("profile", response.data);
      })
      .catch(err => {
        console.log(err);
        this.$store.dispatch("showSnackbar", {text: err && err.response ? err.response.data.message : "서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.", color: "error"});
      });
    this.$axios
      .get("/board/list", {headers: {silent: true}})
      .then(response => {
        this.$store.dispatch("setBoards", response.data);
      })
      .catch(error => {
        this.$store.dispatch("showSnackbar", {text: `${error.response ? error.response.data.message : "게시판 목록을 불러오지 못했습니다."}`, color: "error"});
      });
    this.$axios
      .get("/user/board", {headers: {silent: true}})
      .then(response => {
        this.$store.dispatch("setUserBoards", response.data);
      })
      .catch(error => {
        this.$store.dispatch("showSnackbar", {text: `${error.response ? error.response.data.message : "구독한 토픽 목록을 불러오지 못했습니다."}`, color: "error"});
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
  max-width: 1200px;
  margin-bottom: 53px;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 960px) {
  .mainLayout__main {
    margin-bottom: 80px;
  }
}
.mainLayout__nav {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
</style>