import store from '../store'
import router from '../router'
import checkSignin from './checkSignin'
export default (to, from, next) => {
  const result = checkSignin(to, from, router.app, store);
  if(typeof result === 'boolean' && result){
    console.log(to, 'aaaa');
    next();
  }else if(typeof result === 'string'){
    console.log(to, 'aaaa');
    next(result);
  }
}
