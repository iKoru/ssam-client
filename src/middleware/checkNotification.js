import store from '../store'
import router from '../router'
let check;
export default async () => {
  if (!check && store.getters.userId) {
    check = setTimeout(() => {
      check = null
    }, 1000 * 60 * 5);
    router.app.$axios
      .get('/notification', { headers: { silent: true } })
      .then(response => {
        store.dispatch('addNotifications', response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
