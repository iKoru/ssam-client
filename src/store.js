import Vue from 'vue'
import Vuex from 'vuex'
import _axios from './plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN (state, {token}) {
      state.token = token
    },
    LOGOUT (state) {
      state.token = null
    }
  },
  
  actions: {
    SET_TOKEN ({commit}, {token, setAutoLogin}) {
      _axios.defaults.headers.common['x-auth'] = token
      if(setAutoLogin) {
        window.localStorage.token = token
        // token expires?
      }
      commit('SET_TOKEN', {token})
      // return axios.post(`${resourceHost}/login`, {email, password})
      // .then(({data}) => commit('LOGIN', data))
    },
    LOGOUT ({commit}) {
      commit('LOGOUT')
    }
  }
})
