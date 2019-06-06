import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import route from './modules/route'
import common from './modules/common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    route,
    common
  }
})
