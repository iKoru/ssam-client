import router from '../router'

export default (to, from, next) => {
  if (router.app.$store.getters.token) {
    router.app.$axios({
      method: 'POST',
      url: '/refresh'
    })
      .then(response => {
        return next('/');
      })
      .catch(() => {
        router.app.$store.dispatch('setToken', false)
        return next();
      });
  } else {
    next()
  }
}
