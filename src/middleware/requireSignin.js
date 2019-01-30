import store from '../store'
import router from '../router'
import checkSignin from './checkSignin'
export default async (to, from, next) => {
  const result = await checkSignin(to, from, router.app, store);
  if (typeof result === 'boolean' && result) {
    next();
  } else {
    next(result);
  }
}
