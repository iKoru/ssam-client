import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store.js'
import qs from 'querystring'
Vue.use(Router)
const requireAuth = () => (to, from, next) => {
  console.log(to,from)
  if (!store.state.accessToken) return next('/index?'+qs.stringify({redirectTo:to.path}))
  next()
}
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/Index')
    },
    {
      path: '',
      name: 'home',
      component: () => import('@/views/Home'),
      beforeEnter: requireAuth(),
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
      component: () => import('@/pages/SignupPage')
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   // console.log(to, from)
//   const publicPages = ['/index', '/error'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = store.getters.accessToken;
//   console.log(loggedIn)
//   if (authRequired && !loggedIn) {
//     console.log('login')
//     next('/index');
//   } else next('/home');
// })

export default router