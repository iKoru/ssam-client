import store from '../store'
import router from '../router'
let check;
export default async () => {
  if (!check) {
    if (store.getters.accessToken) {
      check = setTimeout(() => {
        if (store.getters.accessToken) {
          router.app.$axios
            .get('/notification')
            .then(response => {
              store.dispatch('addNotifications', response.data);
              check = null;
            })
            .catch(error => {
              check = null;
              console.log(error);
            });
        }
      }, 1000 * 60 * 5);
    }
  }
}
