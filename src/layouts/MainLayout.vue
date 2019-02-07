<template>
  <div class="mainLayout">
    <main-toolbar class="mainLayout__nav"></main-toolbar>
    <menu-bar :lounges="lounges" :topics="topics"/>
    <menu-drawer v-if="$vuetify.breakpoint.xsOnly" :lounges="lounges" :topics="topics"/>
    <main class="mainLayout__main">
      <main-column-layout>
        <slot></slot>
      </main-column-layout>
    </main>
    <main-footer class="mainLayout__footer"></main-footer>
  </div>
</template>
<script>
import MainToolbar from '../components/MainToolbar';
import MainFooter from '../components/MainFooter';
import MenuDrawer from '../components/MenuDrawer';
import MenuBar from '../components/MenuBar';
import MainColumnLayout from './MainColumnLayout';
export default {
  components: {
    MainToolbar,
    MainFooter,
    MenuDrawer,
    MenuBar,
    MainColumnLayout
  },
  computed: {
    lounges () {
      const lounges = this.$store.getters.boards.filter(x => x.boardType !== 'T' && x.boardType !== 'X' && !x.parentBoardId);
      // lounges.splice(0, 0, {boardName: "라운지 베스트", boardId: "loungeBest"});
      lounges.splice(2, 0, { boardName: null, boardId: null });
      return lounges;
    },
    topics () {
      const userBoards = this.$store.getters.userBoards;
      const boards = this.$store.getters.boards;
      const topics = userBoards
        .filter(x => x.boardType === 'T')
        .concat(
          boards
            .filter(x => x.boardType === 'T' && x.allGroupAuth !== 'NONE' && !userBoards.some(y => y.boardId === x.boardId) && x.boardId !== 'topicBest')
            .slice(0, 10)
            .map(x => ({ ...x, notJoined: true }))
        );
      if (boards.some(x => x.boardId === 'topicBest')) {
        topics.splice(0, 0, boards.find(x => x.boardId === 'topicBest'));
      }
      return topics;
    }
  },
  created () {
    this.$axios
      .get('/user', { headers: { silent: true } })
      .then(response => {
        this.$store.dispatch('profile', response.data);
      })
      .catch(error => {
        console.log(error);
        this.$store.dispatch('showSnackbar', { text: error && error.response ? error.response.data.message : '서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.', color: 'error' });
      });
    this.$axios
      .get('/board/list', { headers: { silent: true } })
      .then(response => {
        this.$store.dispatch('setBoards', response.data);
      })
      .catch(error => {
        this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '게시판 목록을 불러오지 못했습니다.'}`, color: 'error' });
      });
    this.$axios
      .get('/user/board', { headers: { silent: true } })
      .then(response => {
        this.$store.dispatch('setUserBoards', response.data);
      })
      .catch(error => {
        this.$store.dispatch('showSnackbar', { text: `${error.response ? error.response.data.message : '구독한 토픽 목록을 불러오지 못했습니다.'}`, color: 'error' });
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
