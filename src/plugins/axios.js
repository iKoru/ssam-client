import Vue from 'vue'
import axios from 'axios'
import { eventHub } from './eventhub'

let _axios = axios.create({
    baseURL: 'http://localhost:7000'
});
_axios.interceptors.request.use(
    conf => {
        eventHub.$emit('before-request');
        return conf;
    },
    error => {
        eventHub.$emit('request-error');
        return Promise.reject(error);
    }
);
_axios.interceptors.response.use(
   response => {
       eventHub.$emit('after-response');
       return response;
   },
   error => {
       eventHub.$emit('response-error');
       return Promise.reject(error);
   }
);
Vue.prototype.$axios = _axios
Vue.use(_axios)

export default _axios;