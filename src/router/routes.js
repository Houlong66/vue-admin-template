const NotFound = resolve => require(['@/views/other/404.vue'],resolve)
const Layout = resolve => require(['@/views/layout/index.vue'],resolve)

const routes = [{
    path: '/404',
    component: NotFound,
  },
  {
    path: '/',
    component: Layout
  },
  {
    path: "*",
    redirect: '/404'
  }
]

export default routes