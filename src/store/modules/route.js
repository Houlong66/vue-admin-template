const state = {
  // 已访问的路由项列表
  routeTabs: [{
    name: 'Main',
    text: '首页'
  }],
  cachedRoutes: []
}

const mutations = {
  add_route: (state, data) => {
    for (let i = 0; i < state.routeTabs.length; i++) {
      let route = state.routeTabs[i]
      if (route.name === data.name) return
    }
    state.routeTabs.push(data)
  },
  del_route: (state, data) => {
    state.routeTabs.splice(data, 1)
  },
  add_cached: (state, data) => {
    if (state.cachedRoutes.includes(data.name)) return
    if (data.meta.keepAlive) {
      state.cachedRoutes.push(data.name)
    }
  },
  del_cached: (state, data) => {
    for (let i = 0; i < state.cachedRoutes.length; i++) {
      let cached = state.cachedRoutes[i]
      if (cached === data) {
        state.cachedRoutes.splice(i, 1)
        break
      }
    }
  }
}

const actions = {}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}