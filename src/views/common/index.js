import CmForm from './CmForm'
import CmTable from './CmTable'

const components = [
  CmForm,
  CmTable
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}