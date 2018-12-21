/* global localStorage */
import store from '../store.js'
import router from '../router'
export default (to, from, next) => {
  if (store.getters.accessToken) {
    const token = store.getters.accessToken
    router.app.$axios({
      method: 'POST',
      url: '/refresh',
      headers: { 'x-auth': token }
    })
      .then(response => {
        localStorage.setItem('accessToken', response.data.token);
        router.app.$axios.defaults.headers.common['x-auth'] = response.data.token;
        return next('/');
      })
      .catch(() => {
        localStorage.removeItem('accessToken');
        return next();
      });
  } else {
    next()
  }
}
