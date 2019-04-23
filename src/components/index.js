import CmForm from './CmForm'
import CmTable from './CmTable'
import CmStar from './CmStar'

const components = [
  CmForm,
  CmTable,
  CmStar
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}