import Vue from 'vue'

/**
* 首字符大写
* @param str 字符串
* @example hehe
* @return {string} Hehe
*/
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
* 对符合'xx/xx.vue'组件格式的组件取组件名
* @param str fileName
* @example abc/def/CmTable.vue
* @return {string} CmTable
*/
function validateFileName(str) {
  return /^\S+\.vue$/.test(str) && str.replace(/^\S+\/(\w+)\.vue$/,(rs,$1) => capitalizeFirstLetter($1))
}

const requireComponent = require.context('./', true, /\.vue$/)

// 找到组件文件夹下以.vue命名的文件，如果文件名为index,则取组件中的name属性作为注册组件的名字
requireComponent.keys().forEach(filePath => {
  const componentConfig = requireComponent(filePath)
  const fileName = validateFileName(filePath)
  const componentName = fileName.toLowerCase() === 'index'? capitalizeFirstLetter(componentConfig.default.name) : fileName
  Vue.component(componentName, componentConfig.default || componentConfig)
})