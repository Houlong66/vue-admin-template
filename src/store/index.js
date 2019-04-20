import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import route from './modules/route'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    route
  }
})
