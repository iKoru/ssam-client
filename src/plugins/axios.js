'use strict'

import Vue from 'vue'
import axios from 'axios'
import { eventHub } from './eventhub'
// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || 'https://node2-koru.c9users.io:8080'
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
    eventHub.$emit('before-request')
    return config
  },
  function (error) {
    // Do something with request error
    eventHub.$emit('request-error')
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    eventHub.$emit('after-response')
    return response
  },
  function (error) {
    // Do something with response error
    console.log(error.response)
    if (error.response.status === 401) {

    }
    eventHub.$emit('response-error', error.response.status)
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
