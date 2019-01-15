import Vue from 'vue'
import Router from 'vue-router'
import requireSignin from './middleware/requireSignin'
import requireAuth from './middleware/requireAuth'
import visitorOnly from './middleware/visitorOnly'
import checkNotification from './middleware/checkNotification'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/Index'),
      beforeEnter: visitorOnly,
      meta: {
        title: '선생님들의 노다지'
      }
    },
    {
      path: '',
      name: 'main',
      component: () => import('@/views/Main'),
      beforeEnter: requireSignin,
      meta: {
        title: '메인'
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/views/Auth'),
      beforeEnter: requireSignin,
      meta: {
        title: '교사 인증'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
      mets: {
        title: 'pedagy 소개'
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/Signup'),
      beforeEnter: visitorOnly,
      meta: {
        title: '회원가입'
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/Signin'),
      beforeEnter: visitorOnly,
      meta: {
        title: '로그인'
      }
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: () => import('@/views/ResetPassword'),
      beforeEnter: visitorOnly,
      meta: {
        title: '비밀번호 찾기'
      }
    },
    {
      path: '/myPage',
      name: 'myPage',
      component: () => import('@/views/MyPage'),
      beforeEnter: requireSignin,
      meta: {
        title: '마이페이지'
      }
    },
    {
      path: '/myCommunity',
      name: 'myCommunity',
      component: () => import('@/views/MyCommunity'),
      beforeEnter: requireSignin,
      meta: {
        title: '내 커뮤니티'
      },
      children: [
        { path: '/myBoard', name: 'MyBoard', component: () => import('@/components/MyBoard'), meta: { title: '내 게시판' } },
        { path: '/myDocument', name: 'MyDocument', component: () => import('@/components/MyDocument'), meta: { title: '내가 쓴 글' } },
        { path: '/myComment', name: 'MyComment', component: () => import('@/components/MyComment'), meta: { title: '내 댓글' } },
        { path: '/myScrap', name: 'MyScrap', component: () => import('@/components/MyScrap'), meta: { title: '내 스크랩' } }
      ]
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('@/views/Message'),
      beforeEnter: requireSignin,
      meta: {
        title: '메시지'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/Search'),
      beforeEnter: requireSignin,
      meta: {
        title: '검색'
      },
      children: [
        { path: '/searchBoard', name: 'SearchBoard', component: () => import('@/components/SearchBoard'), meta: { title: '게시판 검색' } },
        { path: '/searchDocument', name: 'SearchDocument', component: () => import('@/components/SearchDocument'), meta: { title: '게시물 검색' } }
      ]
    },
    {
      path: '/error',
      component: () => import('@/views/Error'),
      props: (route) => ({ error: route.query.error }),
      meta: {
        title: '에러'
      }
    },
    { // should be placed at the last of array
      path: '/:boardId', // eslint-disable-line no-useless-escape
      component: () => import('@/views/Board'),
      beforeEnter: requireAuth,
      children: [
        {
          path: '',
          name: 'boardList',
          component: () => import('@/components/board/BoardList')
        },
        {
          path: 'write',
          name: 'writeDocument',
          component: () => import('@/components/board/WriteDocument')
        },
        {
          path: 'edit/:documentId(\\d+)',
          name: 'editDocument',
          component: () => import('@/components/board/EditDocument')
        },
        {
          path: ':documentId(\\d+)',
          name: 'viewDocument',
          component: () => import('@/components/board/ViewDocument')
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title + ' - Pedagy' : 'Pedagy'
  next()
})
router.afterEach(checkNotification)
export default router
