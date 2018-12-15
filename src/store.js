import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
    userId: null,
    boardType: 'L', // L : lounge, archive || T : topic,
    loungeNickName: null,
    topicNickName: null,
    status: 'NORMAL',
    profile: {
      picturePath: null
    },
    snackbar: {
      color: null,
      text: null,
      isShowing: false,
      waiting: []
    }

  },
  getters: {
    accessToken ({ accessToken }) {
      return accessToken
    },
    userId ({ userId }) {
      return userId
    },
    loungeNickName ({ loungeNickName }) {
      return loungeNickName
    },
    topicNickName ({ topicNickName }) {
      return topicNickName
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
      if (wait.text) {
        state.snackbar.text = wait.text;
        state.snackbar.color = wait.color || 'info'
        state.snackbar.isShowing = true;
      }
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
    }
  }
})
