import qs from 'querystring'
function getCookie (cname) {
  let name = cname + '=';
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
  return '';
}
export default async (to, from, app, store) => {
  const token = app.$store.getters.token
  if (!token) {
    let response;
    try {
      response = await app.$axios({
        method: 'POST',
        url: '/refresh'
      })
    } catch (error) {
      return (to.path === '/' ? '/index' : ('/signin?' + qs.stringify({ redirectTo: to.path })))
    }
    app.$store.dispatch('setToken', true);
    app.$store.dispatch('setUserId', response.data.userId);
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
    return true;
  }
}
