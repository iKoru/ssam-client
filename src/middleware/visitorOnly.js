import router from '../router'

export default (to, from, next) => {
  if (router.app.$store.getters.token) {
    router.app.$axios({
      method: 'POST',
      url: '/refresh'
    })
      .then(response => {
        router.app.$store.dispatch('setToken', true)
        return next('/');
      })
      .catch(() => {
        return next();
      });
  } else {
    next()
  }
}
