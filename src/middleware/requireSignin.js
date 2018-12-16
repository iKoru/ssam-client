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
          const redirectTo = response.data.redirectTo;
          router.app.$axios
            .get('/user')
            .then(response => {
              store.dispatch('profile', response.data);
              if (redirectTo) {
                next(redirectTo + qs.stringify({ redirectTo: to.path })); // preserve original redirect options
              } else {
                next();
              }
            })
            .catch(err => {
              store.dispatch('showSnackbar', { text: err.response.data.message, color: 'error' });
              next()
            });
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