import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    userId: null,
    boardType: 'L', // L : lounge, archive || T : topic,
    profile: {},
    snackbar: {
      color: null,
      text: null,
      isShowing: false,
      waiting: []
    },
    spinner: false,
    menuDrawer: false,
    boards: []
  },
  getters: {
    accessToken ({ accessToken }) {
      return accessToken
    },
    userId ({ userId }) {
      return userId
    },
    loungeNickName ({ profile }) {
      return profile ? profile.loungeNickName : '';
    },
    topicNickName ({ profile }) {
      return profile ? profile.topicNickName : '';
    },
    status ({ profile }) {
      return profile ? profile.status : 'NORMAL';
    },
    isLight ({ boardType }) {
      return boardType !== 'T'
    },
    snackbar ({ snackbar }) {
      return { color: snackbar.color, text: snackbar.text }
    },
    isShowingSnackbar ({ snackbar }) {
      return snackbar.isShowing
    },
    snackbarQueue ({ snackbar }) {
      return snackbar.waiting
    },
    spinner ({ spinner }) {
      return spinner
    },
    menuDrawer ({ menuDrawer }) {
      return menuDrawer
    },
    boards ({ boards }) {
      return boards
    }
  },
  mutations: {
    SIGNIN (state, { accessToken, userId }) {
      state.accessToken = accessToken
      state.userId = userId
    },
    SIGNOUT (state) {
      state.accessToken = null
    },
    UPDATE_PROFILE (state, profile) {
      state.profile = profile
    },
    SWITCH_BOARD_TYPE (state, { boardType }) {
      state.boardType = boardType
    },
    SHOW_SNACKBAR (state, { text, color }) {
      state.snackbar.text = text;
      state.snackbar.color = color || 'info'
      state.snackbar.isShowing = true;
    },
    QUEUE_SNACKBAR (state, target) {
      state.snackbar.waiting.push(target);
    },
    DEQUEUE_SNACKBAR (state) {
      const wait = state.snackbar.waiting.shift();
      if (wait && wait.text) {
        state.snackbar.text = wait.text;
        state.snackbar.color = wait.color || 'info'
        state.snackbar.isShowing = true;
      }
    },
    CLOSE_SNACKBAR (state) {
      state.snackbar.isShowing = false;
    },
    SHOW_SPINNER (state) {
      state.spinner = true
    },
    HIDE_SPINNER (state) {
      state.spinner = false
    },
    TOGGLE_MENUDRAWER (state) {
      state.menuDrawer = !state.menuDrawer
    },
    SET_BOARDS (state, boards) {
      state.boards = boards
    }
  },
  actions: {
    signin ({ commit }, { accessToken, userId }) {
      Vue.axios.defaults.headers.common['x-auth'] = accessToken
      commit('SIGNIN', { accessToken, userId })
    },
    signout ({ commit }) {
      localStorage.removeItem('accessToken')
      Vue.axios.defaults.headers.common['x-auth'] = null
      commit('SIGNOUT')
    },
    profile ({ commit }, profile) {
      commit('UPDATE_PROFILE', profile)
    },
    switchBoardType ({ commit }, { boardType }) {
      commit('SWITCH_BOARD_TYPE', { boardType })
    },
    showSnackbar ({ getters, commit }, { text, color }) {
      if (!getters.isShowingSnackbar) {
        commit('SHOW_SNACKBAR', { text: text, color: color || 'info' })
      } else {
        commit('QUEUE_SNACKBAR', { text: text, color: color });
      }
    },
    showNextSnackbar ({ getters, commit }) {
      if (getters.snackbarQueue.length > 0) {
        commit('DEQUEUE_SNACKBAR');
      }
    },
    closeSnackbar ({ commit }) {
      commit('CLOSE_SNACKBAR')
    },
    showSpinner ({ commit }) {
      commit('SHOW_SPINNER')
    },
    hideSpinner ({ commit }) {
      commit('HIDE_SPINNER')
    },
    toggleMenuDrawer ({ commit }) {
      commit('TOGGLE_MENUDRAWER')
    },
    setBoards ({ commit }, boards) {
      if (Array.isArray(boards)) {
        commit('SET_BOARDS', boards)
      } else {
        commit('SET_BOARDS', [])
      }
    }
  }
})
