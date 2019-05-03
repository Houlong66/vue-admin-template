<template>
  <div>
    <el-row>
      <el-col :span="12">
        <cm-form
          ref="cmForm"
          :formList="formList"
          :buttonOption="buttonOption"
          @clickSubmit="clickSubmit"
          class="test"
        ></cm-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'TestForm',
  data() {
    return {
      formList: [
        {
          itemType: 'input',
          model: '',
          label: '测试输入框',
          placeholder: '请输入',
          prop: 'testInput',
          rules: [
            { required: true, message: '不能为空' }
          ]
        },
        {
          itemType: 'select',
          model: '',
          label: '测试选择框',
          placeholder: '请选择',
          prop: 'testSelect',
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          rules: [
            { required: true, message: '不能为空' }
          ],
        },
        {
          itemType: 'radioGroup',
          model: '',
          label: '测试选择项',
          size: 'mini',
          prop: 'testRadio',
          radios: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          dataAuth: () => {
            if (this.formList[1].model === '选项2') {
              this.formList[2].disabled = true
            } else {
              this.formList[2].disabled = false
            }
          }
        },
        {
          itemType: 'checkboxGroup',
          model: [],
          label: '测试多选框',
          prop: 'testCheckbox',
          checkboxs: [
            {
              label: '1',
              text: '321'
            },
            {
              label: '4',
              text: 'true',
            }
          ],
          dataAuth: () => {
            if (this.formList[1].model === '选项2') {
              this.formList[3].show = false
            } else {
              this.formList[3].show = true
            }
          }
        },
        {
          itemType: 'datePicker',
          label: '测试日期选择器',
          prop: 'testDate',
          model: '',
          valueFormat: 'yyyy-MM-dd',
          placeholder: '输入'
        },
        {
          itemType: 'switch',
          label: '测试开关',
          prop: 'testSwitch',
          model: ''
        }
      ],
      buttonOption: {
        showSubmit: true,
        showReset: true,
        submitText: '提交'
      }
    }
  },
  methods: {
    clickSubmit(...data) {
      console.log(data[0])
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
