import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import localStore from 'storejs'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

import sideBarRoutes from './sideBarRoutes'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

let routes = [{
  path: '/404',
  name: 'NotFound',
  component: _import('other/404'),
},
{
  path: '/login',
  name: 'Login',
  component: _import('login/index')
},
{
  path: '*',
  redirect: '/404'
}
]
routes = routes.concat(sideBarRoutes)

const router = new Router({
  // mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

if (localStore.get('?token') && store) {
  store.commit('set_token', localStore.get('token'))
}

// 不添加到navBar的路由项
const excludeNames = ['Login', 'NotFound']

// 路由拦截
router.beforeEach((to, from, next) => {
  nProgress.start()
  // 添加TabBar的项
  if (!excludeNames.includes(to.name)) {
    let tempObj = {
      name: to.name,
      text: to.meta.routeText
    }
    store.commit('add_route', tempObj)
    store.commit('add_cached', to)
  }
  // 如果是登录页面且已登录就直接去首页
  if (to.name === 'Login' && store.getters.token) {
    next({
      path: '/'
    })
    return
  }
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.getters.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  nProgress.done()
})

export default router