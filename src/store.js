import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null,
    boardType: 'L', // L : lounge, archive || T : topic,
    profile: {},
    snackbarList: [],
    spinner: false,
    menuDrawer: false,
    menuBar: true,
    boards: [],
    userBoards: [],
    notifications: [],
    recents: null,
    auth: {},
    columnType: 'SHOW_ALWAYS',
    scrapGroups: null,
    reportTypes: null,
    groups: null
  },
  getters: {
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
    boardType({boardType}){
      return boardType
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
    menuBar ({ menuBar }) {
      return menuBar
    },
    boards ({ boards }) {
      return boards
    },
    userBoards ({ userBoards }) {
      return userBoards
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
      return notifications.length === 0 ? 0 : notifications[0].totalCount
    },
    columnType ({ columnType }) {
      return columnType
    },
    recents ({ recents }) {
      return recents
    },
    scrapGroups ({ scrapGroups }) {
      return scrapGroups
    },
    reportTypes ({ reportTypes }) {
      return reportTypes
    },
    groups ({ groups }) {
      return groups
    }
  },
  mutations: {
    SET_USER_ID (state, userId){
      state.userId = userId 
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
    SWITCH_BOARD_TYPE (state, boardType) {
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
    SET_MENUBAR (state, menuBar) {
      state.menuBar = menuBar
    },
    SET_BOARDS (state, boards) {
      state.boards = boards
    },
    ADD_BOARD (state, board) {
      state.boards.push(board)
    },
    SET_USERBOARDS (state, userBoards) {
      state.userBoards = userBoards
    },
    ADD_USERBOARD (state, userBoard) {
      state.userBoards.push(userBoard);
    },
    REMOVE_USERBOARD (state, boardId) {
      if (state.userBoards.some(x => x.boardId === boardId)) {
        state.userBoards.splice(state.userBoards.findIndex(x => x.boardId === boardId), 1)
      }
    },
    MARK_NOTIFICATION (state, notificationId) {
      if (state.notifications.some(x => x.notificationId === notificationId)) {
        state.notifications = state.notifications.filter(x => x.notificationId !== notificationId)
        state.notifications.forEach(x => {
          x.totalCount--;
        })
      }
    },
    ADD_NOTIFICATIONS (state, notifications) {
      notifications.forEach(x => {
        if (!state.notifications.some(y => y.notificationId === x.notificationId)) {
          state.notifications.push(x)
        } else {
          state.notifications.splice(state.notifications.findIndex(y => y.notificationId === x.notificationId), 1, x);
        }
      })
    },
    SET_COLUMN_TYPE (state, columnType) {
      state.columnType = columnType
    },
    SET_RECENTS (state, recents) {
      state.recents = recents
    },
    SET_SCRAP_GROUPS (state, scrapGroups) {
      state.scrapGroups = scrapGroups;
    },
    SET_REPORT_TYPES (state, reportTypes) {
      state.reportTypes = reportTypes
    },
    SET_GROUPS (state, groups) {
      state.groups = groups
    }
  },
  actions: {
    setUserId({commit}, userId){
      commit('SET_USER_ID', userId)
    },
    updateAuthInformation ({ commit }, update) {
      commit('UPDATE_AUTH_INFORMATION', update);
    },
    profile ({ commit }, profile) {
      commit('PROFILE', profile)
    },
    updateProfile ({ commit }, profile) {
      commit('UPDATE_PROFILE', profile)
    },
    switchBoardType ({ commit }, boardType) {
      commit('SWITCH_BOARD_TYPE', boardType)
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
    setMenuBar ({ commit }, menuBar) {
      commit('SET_MENUBAR', menuBar)
    },
    setBoards ({ commit }, boards) {
      if (Array.isArray(boards)) {
        commit('SET_BOARDS', boards)
      } else {
        commit('SET_BOARDS', [])
      }
    },
    addBoard ({ commit }, board) {
      commit('ADD_BOARD', board)
    },
    setUserBoards ({ commit }, userBoards) {
      if (Array.isArray(userBoards)) {
        commit('SET_USERBOARDS', userBoards)
      } else {
        commit('SET_USERBOARDS', [])
      }
    },
    addUserBoard ({ commit }, userBoard) {
      commit('ADD_USERBOARD', userBoard)
    },
    removeUserBoard ({ commit }, boardId) {
      commit('REMOVE_USERBOARD', boardId)
    },
    markNotification ({ commit }, notificationId) {
      commit('MARK_NOTIFICATION', notificationId)
    },
    addNotifications ({ commit }, notifications) {
      commit('ADD_NOTIFICATIONS', notifications)
    },
    setColumnType ({ commit }, columnType) {
      commit('SET_COLUMN_TYPE', columnType)
    },
    setRecents ({ commit }, recents) {
      commit('SET_RECENTS', recents)
    },
    setScrapGroups ({ commit }, scrapGroups) {
      commit('SET_SCRAP_GROUPS', scrapGroups)
    },
    setReportTypes ({ commit }, reportTypes) {
      commit('SET_REPORT_TYPES', reportTypes)
    },
    setGroups ({ commit }, groups) {
      commit('SET_GROUPS', groups)
    }
  }
})
