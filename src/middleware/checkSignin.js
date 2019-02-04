/* global localStorage */
import qs from 'querystring'
import jwt from 'jwt-decode'
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
export default async (to, from, app, store) => {
  const token = getCookie('token')
  if (!token) {
    let response;
    alert('토큰이 없습니다. 리프레시합니다.');
    try {
      response = await app.$axios({
        method: 'POST',
        url: '/refresh'
      })
    } catch (error) {
      deleteCookie('token')
      return (to.path === '/' ? '/index?' : '/signin?') + qs.stringify({ redirectTo: to.path })
    }
    alert(response);
    app.$store.dispatch('setUserId', jwt(response.data.token).userId);
    const redirectTo = response.data.redirectTo;
    if (response.data.imminent || response.data.needEmail) {
      store.dispatch('updateAuthInformation', { imminent: response.data.imminent, needEmail: response.data.needEmail })
    }
    try {
      response = await app.$axios.get('/user')
    } catch (err) {
      store.dispatch('showSnackbar', { text: err.response ? err.response.data.message : '서버와 연결하지 못했습니다. 인터넷 환경을 확인해주세요.', color: 'error' });
      return true;
    }
    store.dispatch('profile', response.data);
    if (redirectTo) {
      if (redirectTo === '/auth' && getCookie('authRequirement') && getCookie('authRequirement') >= app.$moment().format('YMMDD')) {
        return true;
      } else {
        return redirectTo + '?' + qs.stringify({ redirectTo: to.path }); // preserve original redirect options
      }
    } else {
      return true;
    }
  } else {
    //return (to.path === '/' ? '/index?' : '/signin?') + qs.stringify({ redirectTo: to.path })
    return true;
  }
}
