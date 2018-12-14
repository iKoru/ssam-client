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
    }
  },
  getters: {
    accessToken (state) {
      return state.accessToken
    },
    userId (state) {
      return state.userId
    },
    isLight (state) {
      return state.boardType !== 'T'
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
    }
  }
})
