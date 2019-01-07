import store from '../store'
import router from '../router'
import checkSignin from './checkSignin'
export default (to, from, next) => {
  const result = checkSignin(to, from, router.app, store);
  if(typeof result === 'boolean' && result){
    next();
  }else if(typeof result === 'string'){
    next(result);
  }
}
