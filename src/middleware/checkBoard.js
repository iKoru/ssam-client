import store from '../store'
import router from '../router'
import checkSignin from './checkSignin'
export default async (to, from, next) => {
  console.log('middleware!!!')
  const result = await checkSignin(to, from, router.app, store);
  if (typeof result === 'boolean' && result) {
    console.log(to, 'aaaa');
    next();
  } else if (typeof result === 'string') {
    console.log(to, 'aaaa');
    next(result);
  } else {
    console.log(result);
    next(result);
  }
}
