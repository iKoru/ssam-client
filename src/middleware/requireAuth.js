import store from '../store'
import router from '../router'
import checkSignin from './checkSignin'
export default async (to, from, next) => {
  const result = await checkSignin(to, from, router.app, store);
  next()
  if (result === true) {
    if (store.getters.profile.auth === 'AUTHORIZED') {
      next();
    } else {
      next();
    }
  } else {
    next(result);
  }
}
