<template>
  <div class="mainLayout">
    <main-toolbar class="mainLayout__nav"></main-toolbar>
    <menu-bar :lounges="lounges" :topics="topics"/>
    <menu-drawer v-if="$vuetify.breakpoint.xsOnly" :lounges="lounges" :topics="topics"/>
    <main class="mainLayout__main">
      <main-column-layout>
        <slot></slot>
      </main-column-layout>
      <v-dialog v-for="popup in popups" :key="popup.popupId" hide-overlay v-model="popup.popupActivated" content-class="popup">
        <v-card flat>
          <v-card-title :class="{'justify-center':true, 'pa-0':popup.popupType === 'image'}">
            <a :href="popup.popupHref" class="w-100" target="_blank" v-if="popup.popupType === 'image'">
              <v-img :src="popup.popupContents"></v-img>
            </a>
            <div v-else-if="popup.popupType === 'html'" v-html="popup.popupContents"></div>
            <div v-else-if="popup.popupType === 'text'">{{popup.popupContents}}</div>
          </v-card-title>
          <v-divider/>
          <v-card-actions style="padding:4px 8px">
            <v-subheader @click="dismiss(popup)" class="pt-0 mt-0 dismiss body-1 cursor-pointer">오늘 하루 그만보기</v-subheader>
            <v-spacer/>
            <v-btn small flat class="short" @click="popup.popupActivated = false">닫기</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
  data () {
    return {
      popups: []
    }
  },
  computed: {
    lounges () {
      const lounges = this.$store.getters.boards.filter(x => x.boardType !== 'T' && x.boardType !== 'X' && !x.parentBoardId);
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
    this.$axios
      .get('/popup', { headers: { silent: true } })
      .then(response => {
        let config = localStorage.getItem('popup');
        if (config) {
          try {
            config = JSON.parse(config);
            if (Array.isArray(config)) {
              config = config.filter(x => this.$moment(x.due, 'YYYYMMDD').isSameOrAfter(this.$moment(), 'day'));
              localStorage.setItem('popup', JSON.stringify(config));
              response.data = response.data.filter(x => !config.some(y => y.popupId === x.popupId))
            }
          } catch (error) {
            console.log(error);
          }
        }
        this.popups = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    dismiss (popup) {
      let config = localStorage.getItem('popup');
      if (config) {
        try {
          config = JSON.parse(config);
          if (Array.isArray(config)) {
            config = config.filter(x => this.$moment(x.due, 'YYYYMMDD').isSameOrAfter(this.$moment(), 'day'));
            config.push({ due: this.$moment().format('YMMDD'), popupId: popup.popupId })
            localStorage.setItem('popup', JSON.stringify(config));
            popup.popupActivated = false;
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }
      config = [{ due: this.$moment().format('YMMDD'), popupId: popup.popupId }]
      localStorage.setItem('popup', JSON.stringify(config));
      popup.popupActivated = false;
    }
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
.popup{
  width:auto;
  min-width:300px;
}
.dismiss, .dismiss .v-icon{
  font-size:20px;
}
.dismiss .v-input--selection-controls__input{
  margin-right:0;
}
.dismiss .v-label{
  font-size:14px;
  color:#000;
}
</style>
