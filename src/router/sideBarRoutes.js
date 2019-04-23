const Layout = resolve => require(['@/views/layout/index.vue'], resolve)
const TestForm = resolve => require(['@/views/main/TestForm.vue'], resolve)
const TestTable = resolve => require(['@/views/main/TestTable.vue'], resolve)
const TestChild = resolve => require(['@/views/main/TestChild.vue'], resolve)
const TestChild1 = resolve => require(['@/views/main/TestChild1.vue'], resolve)
const TestChild2 = resolve => require(['@/views/main/TestChild2.vue'], resolve)
const TestMain = resolve => require(['@/views/main/TestMain.vue'], resolve)

const routes = [{
    path: '/',
    redirect: 'main',
    name: "",
    component: Layout,
    children: [{
      path: '/main',
      name: "Main",
      meta: {
        routeText: "首页",
        routeIcon: "el-icon-goods",
        showSideBar: true
      },
      component: TestMain
    }]
  },
  {
    path: "/test_form",
    component: Layout,
    children: [{
      path: 'index',
      name: 'TestForm',
      meta: {
        routeText: "测试表单",
        routeIcon: "el-icon-location",
        showSideBar: true,
        keepAlive: true
      },
      component: TestForm
    }]
  },
  {
    path: "/test_table",
    component: Layout,
    children: [{
      path: 'index',
      name: 'TestTable',
      meta: {
        routeText: "测试表格",
        routeIcon: "el-icon-location",
        showSideBar: true,
        keepAlive: true
      },
      component: TestTable,
    }]
  },
  {
    path: '/test_father',
    meta: {
      routeText: "测试父路由",
      routeIcon: "el-icon-location"
    },
    redirect: {
      name: 'TestChild'
    },
    component: Layout,
    children: [{
        path: 'test_child',
        name: "TestChild",
        meta: {
          routeText: "测试子路由",
          showSideBar: true,
          keepAlive: true
        },
        component: TestChild,
        children: [{
          path: 'test_child2',
          name: "TestChild2",
          meta: {
            routeText: "测试子路由2"
          },
          component: TestChild2
        }]
      },
      {
        path: 'test_child1',
        name: "TestChild1",
        meta: {
          routeText: "测试子路由1",
          showSideBar: true
        },
        component: TestChild1
      }
    ]
  }
]

export default routes