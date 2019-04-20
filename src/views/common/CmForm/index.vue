<template>
  <div class="cm-form">
    <el-form ref="form" :model="formModel" :label-width="formModel.labelWidth+'px'">
      <div
        v-for="(formItem,index) in formModel.formList"
        class="row-item"
        :key="index"
        v-show="formItem.show"
      >
        <el-form-item
          :show-message="!formItem.hiddenMsg"
          :rules="formItem.disabled?[]:formItem.rules"
          :label="formItem.label"
          :prop="'formList.'+index+'.model'"
        >
          <el-input
            v-if="formItem.itemType==='input'"
            :type="formItem.type"
            :maxlength="formItem.maxlength"
            :minlength="formItem.minlength"
            v-model="formItem.model"
            :placeholder="formItem.placeholder"
            :disabled="formItem.disabled"
            :auto-complete="formItem.autoComplete"
            :max="formItem.max"
            :min="formItem.min"
            :step="formItem.step"
            :name="formItem.name"
            :resize="formItem.resize"
            :autofocus="formItem.autofocus"
            :form="formItem.form"
            :rows="formItem.rows"
            :autosize="formItem.autosize"
            :size="formItem.size"
            :readonly="formItem.readonly"
            :prefix-icon="formItem.prefixIcon"
            :suffix-icon="formItem.suffixIcon"
            @blur="typeof formItem.blur === 'function'?formItem.blur($event): function(){}"
            @focus="typeof formItem.focus === 'function'?formItem.focus($event): function(){}"
            @change="typeof formItem.change === 'function'?formItem.change($event): function(){}"
          ></el-input>
          <el-select
            :multiple="formItem.multiple"
            :clearable="formItem.clearable"
            :size="formItem.size"
            :multiple-limit="formItem.multipleLimit"
            :name="formItem.name"
            :placeholder="formItem.placeholder"
            :allow-create="formItem.allowCreate"
            :disabled="formItem.disabled"
            :filter-method="formItem.filterMethod"
            :filterable="formItem.filterable"
            :loading-text="formItem.loadingText"
            :no-data-text="formItem.noDataText"
            :popper-class="formItem.popperClass"
            :no-match-text="formItem.noMatchText"
            :loading="formItem.loading"
            :remote="formItem.remote"
            :remote-method="formItem.remoteMethod"
            v-model="formItem.model"
            v-if="formItem.itemType === 'select'"
            @change="selectChange.call(null,formItem.change,$event)"
            @visible-change="typeof formItem.visibleChange === 'function'?formItem.visibleChange($event): function(){}"
            @remove-tag="typeof formItem.removeTag === 'function'?formItem.removeTag($event): function(){}"
          >
            <el-option
              v-for="item in formItem.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
          <el-radio-group
            v-if="formItem.itemType === 'radioGroup'"
            v-model="formItem.model"
            :disabled="formItem.disabled"
            :size="formItem.size"
            :fill="formItem.fill"
            :text-color="formItem.textColor"
            @change="typeof formItem.change === 'function'?formItem.change($event): function(){}"
          >
            <div v-if="formItem.button">
              <el-radio-button
                :disabled="radio.disabled"
                v-for="(radio, index) in formItem.radios"
                :key="index"
                :label="radio.label"
              >{{radio.value}}</el-radio-button>
            </div>
            <div v-else>
              <el-radio
                v-show="!formItem.button"
                :disabled="radio.disabled"
                v-for="(radio, index) in formItem.radios"
                :key="index"
                :label="radio.label"
              >{{radio.value}}</el-radio>
            </div>
          </el-radio-group>
          <el-checkbox-group
            v-if="formItem.itemType === 'checkboxGroup'"
            v-model="formItem.model"
            :size="formItem.size"
            :fill="formItem.fill"
            :text-color="formItem.textColor"
            :min="formItem.min"
            :max="formItem.max"
            @change="typeof formItem.change === 'function'?formItem.change($event): function(){}"
          >
            <el-checkbox
              :true-label="checkbox.trueLabel"
              :false-label="checkbox.falseLabel"
              :name="checkbox.name"
              :disabled="checkbox.disabled"
              :checked="checkbox.checked"
              :indeterminate="checkbox.indeterminate"
              v-for="(checkbox, index) in formItem.checkboxs"
              :key="index"
              :label="checkbox.label"
            >{{checkbox.text}}</el-checkbox>
          </el-checkbox-group>
          <el-date-picker
            v-if="formItem.itemType==='datePicker'"
            v-model="formItem.model"
            :align="formItem.align"
            :type="formItem.type"
            :placeholder="formItem.placeholder"
            :picker-options="formItem.pickerOptions"
            :value-format="formItem.valueFormat"
          ></el-date-picker>
          <el-switch
            v-if="formItem.itemType==='switch'"
            v-model="formItem.model"
            :active-color="formItem.activeColor"
            :inactive-color="formItem.inactiveColor"
            :active-text="formItem.activeText"
            :inactive-text="formItem.inactiveText"
          ></el-switch>
        </el-form-item>
      </div>
      <el-form-item v-if="buttonOption.showSubmit||buttonOption.showReset">
        <el-button @click="reset()" v-show="buttonOption.showReset">重置</el-button>
        <el-button
          type="primary"
          @click="clickSubmit()"
          v-show="buttonOption.showSubmit"
        >{{buttonOption.submitText}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CmForm',
  props: {
    formList: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: Number,
      default: 150
    },
    buttonOption: {
      type: Object,
      default: () => { return {} }
    }
  },
  data() {
    this.turnData(this.formList)
    return {
      formModel: {
        labelWidth: this.labelWidth,
        formList: this.formList,
      }
    }
  },
  watch: {
    formList: function (newV) {
      this.formModel.formList = newV
      this.turnData(this.formModel.formList)
    },
    labelWidth: function (newV) {
      this.formModel.labelWidth = newV
    }
  },
  methods: {
    // 补充formList的默认值
    turnData(list) {
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        if (item.show === undefined) {
          item.show = true
        }
        if (item.disabled === undefined) {
          item.disabled = false
        }
      }
    },
    // 获取form model
    getFormModel() {
      let workObj = {}
      for (let i = 0; i < this.$refs['form'].model.formList.length; i++) {
        let obj = this.$refs['form'].model.formList[i]
        workObj[obj.prop] = obj.model
      }
      return workObj
    },
    // 点击确认按钮
    clickSubmit() {
      this.$refs['form'].validate(val => {
        if (val) {
          this.$emit('clickSubmit', this.getFormModel())
        }
      })
    },
    // 重置表单
    reset() {
      this.$refs.form.resetFields()
    },
    // 当一个表单域从enable 变为disabled时 enabled错误信息不显示
    hiddenMsg() {
      for (let i = 0; i < this.formList.length; i++) {
        if (this.formList[i].disabled) {
          this.formList[i].hiddenMsg = true
        } else {
          this.formList[i].hiddenMsg = false
        }
      }
    },
    // 设置权限控制
    setAuth() {
      this.formList.map(item => {
        if (typeof item.dataAuth === 'function') {
          item.dataAuth()
        }
      })
    },
    // 选择不同的选项
    selectChange(fun, val) {
      if (typeof fun === 'function') {
        fun(val)
      }
      this.setAuth()
      this.hiddenMsg()
    },
  }
}
</script>

<style lang="scss" scoped>
.row-item {
  text-align: start;
}
.cm-form {
  padding: 0 5%;
  text-align: center;
}
</style>
