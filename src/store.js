import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    userId: null,
    boardType: 'L', // L : lounge, archive || T : topic,
    profile: {},
    auth: {},
    snackbarList: [],
    spinner: false,
    menuDrawer: false,
    boards: [],
    notifications: []
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
    nextSnackbar ({ snackbarList }) {
      return snackbarList.length > 0 ? snackbarList[0] : null;
    },
    spinner ({ spinner }) {
      return spinner
    },
    menuDrawer ({ menuDrawer }) {
      return menuDrawer
    },
    boards ({ boards }) {
      return boards
    },
    profile ({ profile }) {
      return profile
    },
    auth ({ auth }) {
      return auth
    },
    notifications ({ notifications }) {
      return notifications
    },
    totalNotifications ({ notifications }) {
      console.log(notifications);
      return notifications.length === 0 ? 0 : notifications[0].totalCount
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
    PROFILE (state, profile) {
      state.profile = profile
    },
    UPDATE_PROFILE (state, profile) {
      Object.keys(profile).forEach(x => {
        state.profile[x] = profile[x];
      })
    },
    UPDATE_AUTH_INFORMATION (state, auth) {
      state.auth = auth;
    },
    SWITCH_BOARD_TYPE (state, { boardType }) {
      state.boardType = boardType
    },
    QUEUE_SNACKBAR (state, target) {
      state.snackbarList.push(target);
    },
    DEQUEUE_SNACKBAR (state) {
      if (state.snackbarList.length > 0) {
        state.snackbarList.shift();
      }
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
    },
    MARK_NOTIFICATION (state, notificationId) {
      if (state.notifications.some(x => x.notificationId === notificationId)) {
        state.notifications = state.notifications.filter(x => x.notificationId !== notificationId)
        state.notifications.forEach(x => {
          x.totalCount--;
        })
      }
    },
    ADD_NOTIFICATIONS(state, notifications){
      state.notifications = state.notifications.concat(notifications)
    }
  },
  actions: {
    signin ({ commit }, { accessToken, userId }) {
      Vue.axios.defaults.headers.common['x-auth'] = accessToken
      commit('SIGNIN', { accessToken, userId })
    },
    updateAuthInformation ({ commit }, update) {
      commit('UPDATE_AUTH_INFORMATION', update);
    },
    signout ({ commit }) {
      localStorage.removeItem('accessToken')
      Vue.axios.defaults.headers.common['x-auth'] = null
      commit('SIGNOUT')
    },
    profile ({ commit }, profile) {
      commit('PROFILE', profile)
    },
    updateProfile ({ commit }, profile) {
      commit('UPDATE_PROFILE', profile)
    },
    switchBoardType ({ commit }, { boardType }) {
      commit('SWITCH_BOARD_TYPE', { boardType })
    },
    showSnackbar ({ commit }, target) {
      commit('QUEUE_SNACKBAR', target);
    },
    dequeueSnackbar ({ commit }) {
      commit('DEQUEUE_SNACKBAR');
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
    },
    markNotification ({ commit }, notificationId) {
      commit('MARK_NOTIFICATION', notificationId)
    },
    addNotifications ({commit}, notifications){
      commit('ADD_NOTIFICATIONS', notifications)
    }
  }
})
