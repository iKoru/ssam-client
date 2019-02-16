import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vue-beautiful-chat'
import './plugins/vuetify'
import './plugins/vue-quill-editor'
import './plugins/moment'
import './plugins/loadImage'
import './plugins/axios'
import './registerServiceWorker'
import './assets/common.styl'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
