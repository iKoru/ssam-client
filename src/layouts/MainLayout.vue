<template>
  <div class="mainLayout">
    <main-toolbar class="mainLayout__nav"></main-toolbar>
    <menu-bar :lounges="lounges" :topics="topics"/>
    <menu-drawer :lounges="lounges" :topics="topics"/>
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
    lounges() {
      return this.$store.getters.boards.filter(x=>x.boardType === 'L')
    },
    topics(){
      const userBoards = this.$store.getters.userBoards;
      const boards = this.$store.getters.boards;
      return userBoards.filter(x => x.boardType === "T")
      .concat(boards.filter(x=>x.boardType === 'T' && x.allGroupAuth !== 'NONE' && !userBoards.some(y=>y.boardId === x.boardId)).slice(0, 10).map(x=>({...x, notJoined:true})))
    }
  },
  created() {
    this.$axios
      .get("/board/list", {headers:{silent:true}})
      .then(response => {
        this.$store.dispatch("setBoards", response.data);
      })
      .catch(error => {
        this.$store.dispatch("showSnackbar", {text: `${error.response ? error.response.data.message : "게시판 목록을 불러오지 못했습니다."}`, color: "error"});
      });
    this.$axios
      .get("/user/board", {headers:{silent:true}})
      .then(response => {
        this.$store.dispatch("setUserBoards", response.data);
      })
      .catch(error => {
        this.$store.dispatch("showSnackbar", {text: `${error.response ? error.response.data.message : "구독한 토픽 목록을 불러오지 못했습니다."}`, color: "error"});
      });
  },
  mounted(){
    console.log(this.lounges);
    console.log(this.topics);
  }
};
</script>
<style>
.mainLayout {
  background-color: white;
  min-height: 100vh;
}
.mainLayout__main {
  max-width: 1904px;
  margin-bottom: 53px;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 960px) {
  .mainLayout__main {
    margin-bottom: 80px;
  }
}
</style>