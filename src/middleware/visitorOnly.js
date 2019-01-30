import router from '../router'
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
export default (to, from, next) => {
  if (getCookie('token')) {
    router.app.$axios({
      method: 'POST',
      url: '/refresh'
    })
      .then(response => {
        return next('/');
      })
      .catch(() => {
        deleteCookie('token');
        return next();
      });
  } else {
    next()
  }
}
