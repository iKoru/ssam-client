import qs from 'querystring'
import jwt from 'jwt-decode'
import store from '../store.js'
import router from '../router'
export default (to, from, next) => {
  if (!store.state.accessToken) {
    const token = localStorage.getItem('accessToken')
    if (token) {
      router.app.$axios({
        method: 'POST',
        url: '/refresh',
        headers: { 'x-auth': token }
      })
        .then(response => {
          localStorage.setItem('accessToken', response.data.token);
          router.app.$axios.defaults.headers.common['x-auth'] = response.data.token;
          router.app.$store.dispatch('signin', {
            accessToken: response.data.token,
            userId: jwt(response.data.token).userId
          });
          return next();
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          return next('/index?' + qs.stringify({ redirectTo: to.path }))
        });
    } else {
      return next('/index?' + qs.stringify({ redirectTo: to.path }))
    }
  } else {
    next()
  }
}
