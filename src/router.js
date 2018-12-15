import Vue from 'vue'
import Router from 'vue-router'
import requireSignin from './middleware/requireSignin'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/Index'),
      meta: {
        title: '선생님들의 공간'
      }
    },
    {
      path: '',
      name: 'home',
      component: () => import('@/views/Home'),
      beforeEnter: requireSignin,
      children: [{
        path: '/board/:boardId',
        name: 'board',
        component: () => import('@/pages/Board'),
        children: [
          {
            path: '/',
            name: 'boardList',
            component: () => import('@/components/board/BoardList')
          },
          {
            path: 'writeDocument',
            name: 'writeDocument',
            component: () => import('@/components/board/WriteDocument')
          },
          {
            path: ':documentId',
            name: 'viewDocument',
            component: () => import('@/components/board/ViewDocument')
          }
        ]
      }],
      meta: {
        title: '메인'
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/pages/SignupPage'),
      meta: {
        title: '회원가입'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title + ' - pedagy' : 'pedagy'
  next()
})

export default router
