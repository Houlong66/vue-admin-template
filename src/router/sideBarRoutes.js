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
    name: 'TestChild1'
  },
  component: _import('layout/index'),
  children: [
    {
      path: 'test_child1',
      name: 'TestChild1',
      meta: {
        routeText: '测试子路由1',
        showSideBar: true,
        keepAlive: true
      },
      component: _import('main/nested/TestChild1'),
      children: [
        {
          path: 'test_child11',
          name: 'TestChild11',
          meta: {
            routeText: '测试子路由11'
          },
          component: _import('main/nested/TestChild11'),
          children: [
            {
              path: 'test_child111',
              name: 'TestChild111',
              meta: {
                routeText: '测试子路由111',
                showSideBar: true
              },
              component: _import('main/nested/TestChild111')
            },
            {
              path: 'test_child112',
              name: 'TestChild112',
              meta: {
                routeText: '测试子路由112',
                showSideBar: true
              },
              component: _import('main/nested/TestChild112')
            }
          ]
        },
        {
          path: 'test_child12',
          name: 'TestChild12',
          meta: {
            routeText: '测试子路由12'
          },
          component: _import('main/nested/TestChild12')
        }]
    },
    {
      path: 'test_child2',
      name: 'TestChild2',
      meta: {
        routeText: '测试子路由2',
        showSideBar: true
      },
      component: _import('main/nested/TestChild2')
    }
  ]
}
]

export default routes