/* global localStorage */
import qs from 'querystring'
import jwt from 'jwt-decode'

export default async (to, from, app, store) => {
  if (!store.getters.accessToken) {
    const token = localStorage.getItem('accessToken')
    if (token) {
      let response;
      try {
        response = await app.$axios({
          method: 'POST',
          url: '/refresh',
          headers: { 'x-auth': token }
        })
      } catch (error) {
        localStorage.removeItem('accessToken');
        return (to.path === '/' ? '/index?' : '/signin?') + qs.stringify({ redirectTo: to.path })
      }
      localStorage.setItem('accessToken', response.data.token);
      app.$axios.defaults.headers.common['x-auth'] = response.data.token;
      app.$store.dispatch('signin', {
        accessToken: response.data.token,
        userId: jwt(response.data.token).userId
      });
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
        if (redirectTo === '/auth' && localStorage.getItem('authRequirement') && localStorage.getItem('authRequirement') >= app.$moment().format('YYYYMMDD')) {
          return true;
        } else {
          return redirectTo + '?' + qs.stringify({ redirectTo: to.path }); // preserve original redirect options
        }
      } else {
        return true;
      }
    } else {
      return (to.path === '/' ? '/index?' : '/signin?') + qs.stringify({ redirectTo: to.path })
    }
  } else {
    return true;
  }
}
