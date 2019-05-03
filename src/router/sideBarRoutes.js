const _import = require('./_import_' + process.env.NODE_ENV)

const routes = [{
  path: '/',
  redirect: 'main',
  name: '',
  meta: {
    requireAuth: true
  },
  component: _import('layout/index'),
  children: [{
    path: '/main',
    name: 'Main',
    meta: {
      routeText: '首页',
      routeIcon: 'el-icon-goods',
      showSideBar: true
    },
    component: _import('main/TestMain')
  }]
},
{
  path: '/test_form',
  component: _import('layout/index'),
  meta: {
    requireAuth: true
  },
  children: [{
    path: 'index',
    name: 'TestForm',
    meta: {
      routeText: '测试表单',
      routeIcon: 'el-icon-location',
      showSideBar: true,
      keepAlive: true
    },
    component: _import('main/TestForm')
  }]
},
{
  path: '/test_table',
  component: _import('layout/index'),
  meta: {
    requireAuth: true
  },
  children: [{
    path: 'index',
    name: 'TestTable',
    meta: {
      routeText: '测试表格',
      routeIcon: 'el-icon-location',
      showSideBar: true,
      keepAlive: true
    },
    component: _import('main/TestTable'),
  }]
},
{
  path: '/test_father',
  meta: {
    routeText: '测试父路由',
    routeIcon: 'el-icon-location',
    requireAuth: true
  },
  redirect: {
    name: 'TestChild'
  },
  component: _import('layout/index'),
  children: [{
    path: 'test_child',
    name: 'TestChild',
    meta: {
      routeText: '测试子路由',
      showSideBar: true,
      keepAlive: true
    },
    component: _import('main/TestChild'),
    children: [{
      path: 'test_child2',
      name: 'TestChild2',
      meta: {
        routeText: '测试子路由2'
      },
      component: _import('main/TestChild2')
    }]
  },
  {
    path: 'test_child1',
    name: 'TestChild1',
    meta: {
      routeText: '测试子路由1',
      showSideBar: true
    },
    component: _import('main/TestChild1')
  }
  ]
}
]

export default routes