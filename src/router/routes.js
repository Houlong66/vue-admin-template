const NotFound = resolve => require(['@/views/other/404.vue'], resolve)
const Layout = resolve => require(['@/views/layout/index.vue'], resolve)
const TestForm = resolve => require(['@/views/main/TestForm.vue'], resolve)
const TestTable = resolve => require(['@/views/main/TestTable.vue'], resolve)
const TestChild = resolve => require(['@/views/main/TestChild.vue'], resolve)
const TestChild1 = resolve => require(['@/views/main/TestChild1.vue'], resolve)
const TestFather = resolve => require(['@/views/main/TestFather.vue'], resolve)

const routes = [{
    path: '/404',
    component: NotFound,
  },
  {
    path: '/',
    name: "main",
    component: Layout,
    children: [{
        path: '/test_form',
        name: 'testForm',
        meta: {
          routeText: "测试表单",
          routeIcon: "el-icon-location"
        },
        component: TestForm
      },
      {
        path: '/test_table',
        name: 'testTable',
        meta: {
          routeText: "测试表格",
          routeIcon: "el-icon-location"
        },
        component: TestTable,
      },
      {
        path: '/test_father',
        name: 'testFater',
        meta: {
          routeText: "测试父路由",
          routeIcon: "el-icon-location"
        },
        component: TestFather,
        children: [{
            path: 'test_child',
            name: "testChild",
            meta: {
              routeText: "测试子路由"
            },
            component: TestChild
          },
          {
            path: 'test_child1',
            name: "testChild1",
            meta: {
              routeText: "测试子路由1"
            },
            component: TestChild1
          }
        ]
      }
    ]
  },
  // {
  //   path: "*",
  //   redirect: '/404'
  // }
]

export default routes