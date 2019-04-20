import CmForm from './CmForm'

const components = [
  CmForm
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}