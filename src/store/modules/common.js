import base from '@/utils/base'

const state = {
  isMobile: base.native().android || base.native().iPhone,
  showSidebar: !(base.native().android || base.native().iPhone)
}

const mutations = {
  set_show_sidebar: (state, data) => {
    state.showSidebar = data
  }
}

const actions = {
}

const getters = {
}

export default {
  state,
  actions,
  mutations,
  getters
}