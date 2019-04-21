<template>
  <div class="table-page">
    <!--region table 表格-->
    <cm-table
      :list="list"
      :total="total"
      :maxHeight="maxHeight"
      :options="options"
      :pagination="pagination"
      :columns="columns"
      :operates="operates"
      @handleSizeChange="handleSizeChange"
      @handleIndexChange="handleIndexChange"
      @handleSelectionChange="handleSelectionChange"
    ></cm-table>
    <!--endregion-->
  </div>
</template>
<script>

export default {
  name: 'testTable',
  data() {
    return {
      total: 0,
      list: [
        {
          id: 1,
          title: "测试标题",
          state: 0,
          author: "测试作者",
          phone: "123456789",
          email: "51698@1564.com",
          createDate: "2019-04-21"
        },
        {
          id: 1,
          title: "测试标题",
          state: 1,
          author: "测试作者",
          phone: "123456789",
          email: "51698@1564.com",
          createDate: "2019-04-21"
        }
      ],
      maxHeight: 500,
      columns: [
        {
          prop: 'id',
          label: '编号',
          align: 'center',
          width: 60
        },
        {
          prop: 'title',
          label: '标题',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return h('el-button', {
              props: {type: "text"},
              style: {color: "red"}
            }, params.row.title)
          }
        },
        {
          prop: 'state',
          label: '状态',
          align: 'center',
          width: '160',
          render: (h, params) => {
            return h('el-tag', {
              props: { type: params.row.state === 0 ? 'success' : params.row.state === 1 ? 'info' : 'danger' } // 组件的props
            }, params.row.state === 0 ? '上架' : params.row.state === 1 ? '下架' : '审核中')
          },
          filters: [
            {
              text: "上架",
              value: 0
            },
            {
              text: "下架",
              value: 1
            }
          ],
          sortable: true
        },
        {
          prop: 'author',
          label: '作者',
          align: 'center',
          width: 120
        },
        {
          prop: 'phone',
          label: '联系方式',
          align: 'center',
          width: 160
        },
        {
          prop: 'email',
          label: '邮箱',
          align: 'center',
          width: 240
        },
        {
          prop: 'createDate',
          label: '发布时间',
          align: 'center',
          width: 180
        }
      ], // 需要展示的列
      operates: {
        width: 200,
        fixed: "right",
        list: [
          {
            label: '编辑',
            type: 'warning',
            show: (index, row) => {
              return true
            },
            icon: 'el-icon-edit',
            plain: true,
            disabled: false,
            method: (index, row) => {
              this.handleEdit(index, row)
            }
          },
          {
            label: '删除',
            type: 'danger',
            icon: 'el-icon-delete',
            show: true,
            plain: false,
            disabled: (index, row) => {
              return false
            },
            method: (index, row) => {
              this.handleDel(index, row)
            }
          }
        ]
      }, // 操作按钮组
      pagination: {
        pageIndex: 1,
        pageSize: 20,
      }, // 分页参数
      options: {
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: true // 是否支持列表项选中功能
      } // table 的参数
    }
  },
  methods: {
    // 切换每页显示的数量
    handleSizeChange(pagination) {
      this.pagination = pagination
      console.log(this.pagination)
    },
    // 切换页码
    handleIndexChange(pagination) {
      this.pagination = pagination
      console.log(this.pagination)
    },
    // 选中行
    handleSelectionChange(val) {
      console.log('val:', val)
    },
    // 编辑
    handleEdit(index, row) {
      console.log(' index:', index)
      console.log(' row:', row)
    },
    // 删除
    handleDel(index, row) {
      console.log(' index:', index)
      console.log(' row:', row)
    }
  }
}
</script>