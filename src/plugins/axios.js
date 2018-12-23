'use strict'

import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import router from '../router'
import qs from 'querystring'
import jwt from 'jwt-decode'
// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = process.env.baseURL || process.env.VUE_APP_API_URL || 'https://node2-koru.c9users.io:8080'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (config.headers.silent) {
      delete config.headers.silent
    } else {
      store.dispatch('showSpinner');
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    store.dispatch('hideSpinner')
    return response
  },
  function (error) {
    // Do something with response error
    store.dispatch('hideSpinner')
    if (error.response && error.response.status === 401) {
      let query = location.search !== '' ? qs.parse(location.search.substring(1)) : {};
      query.redirectTo = location.pathname
      const token = localStorage.getItem('accessToken')
      let isRefreshing = true;
      if (token) {
        return _axios({
          method: 'POST',
          url: '/refresh',
          headers: { 'x-auth': token }
        })
          .then(response => { // success to refresh
            if (token === response.data.token) {
              localStorage.removeItem('accessToken');
              store.dispatch('showSnackbar', { text: '세션이 만료되었습니다.', color: 'error' })
              return router.push('/signin?' + qs.stringify(query));
            } else {
              localStorage.setItem('accessToken', response.data.token);
              _axios.defaults.headers.common['x-auth'] = response.data.token;
              store.dispatch('signin', {
                accessToken: response.data.token,
                userId: jwt(response.data.token).userId
              });
              error.config.headers['x-auth'] = response.data.token;
              isRefreshing = false;
              return _axios.request(error.config);
            }
          })
          .catch(error2 => { // failed to refresh. redirect to signin page. save original request information only when get request
            if (isRefreshing) {
              localStorage.removeItem('accessToken');
              store.dispatch('showSnackbar', { text: '세션이 만료되었습니다.', color: 'error' })
              return router.push('/signin?' + qs.stringify(query))
            } else {
              return Promise.reject(error2)
            }
          });
      } else { // there is no access token saved. redirect to signin page. save original request information only when get request
        store.dispatch('showSnackbar', { text: '세션이 만료되었습니다.', color: 'error' })
        return router.push('/signin?' + qs.stringify(query))
      }
    }
    return Promise.reject(error)
  }
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

// export default Plugin;
export default _axios
