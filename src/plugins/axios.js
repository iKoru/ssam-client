'use strict'

import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import router from '../router'
import qs from 'querystring'
import jwt from 'jwt-decode'
axios.defaults.baseURL = process.env.baseURL || process.env.VUE_APP_API_URL || 'https://node2-koru.c9users.io:8080'

const _axios = axios.create({withCredentials:true, xsrfCookieName:'CSRF-TOKEN', xsrfHeaderName:'CSRF-TOKEN'})

_axios.interceptors.request.use(
  function (config) {
    if (config.headers.silent) {
      delete config.headers.silent
    } else {
      store.dispatch('showSpinner');
    }
    config.headers['CSRF-TOKEN'] = getCookie('CSRF-TOKEN')
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return undefined;
}

function deleteCookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

_axios.interceptors.response.use(
  function (response) {
    store.dispatch('hideSpinner')
    return response
  },
  function (error) {
    store.dispatch('hideSpinner')
    if (error.response && error.response.status === 401) {
      let query = location.search !== '' ? qs.parse(location.search.substring(1)) : {};
      query.redirectTo = location.pathname
      const token = getCookie('token')
      let isRefreshing = true;
      if (token) {
        return _axios({
          method: 'POST',
          url: '/refresh'
        })
          .then(response => { // success to refresh
            store.dispatch('signin', {
              accessToken: response.data.token,
              userId: jwt(response.data.token).userId
            });
            isRefreshing = false;
            return _axios.request(error.config);
          })
          .catch(error2 => { // failed to refresh. redirect to signin page. save original request information only when get request
            if (isRefreshing) {
              deleteCookie('token');
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

Plugin.install = function (Vue) {
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

export default _axios
