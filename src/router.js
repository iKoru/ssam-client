import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store.js'

Vue.use(Router)
const requireAuth = () => (to, from, next) => {
  if(store.state.token) return next()
  next('/')
}
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/Index')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home'),
      children: [{
        path: '/board/:boardId',
        name: 'board',
        component: () => import('@/components/board/Board'),
        children: [
          {
            path: '',
            name: 'boardList',
            component: () => import('@/components/board/BoardList')
          },
          {
          path: 'writeDocument',
          name: 'writeDocument',
          component: () => import('@/components/board/WriteDocument')
          }
        ]
      }],
      beforeEnter: requireAuth()
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/view',
      name: 'view',
      component: () => import('@/components/board/Viewer')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/pages/SignupPage')
    }
  ]
})
