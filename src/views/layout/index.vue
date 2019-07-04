<template>
  <el-container class="app-wrapper">
    <side-bar v-show="common.showSidebar" :class="{'mobile-sidebar':true, 'animated fadeInLeft faster':common.isMobile}"></side-bar>
    <div class="left-container" v-show="common.showSidebar" @click="handleShowSidebar"></div>
    <el-container class="container">
      <el-header class="nav-container">
        <nav-bar></nav-bar>
        <tab-bar></tab-bar>
      </el-header>
      <el-main class="main-container">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view :key="key"></router-view>
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { SideBar, NavBar, TabBar } from './components'
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  components: {
    SideBar,
    NavBar,
    TabBar
  },
  data() {
    return {
      isMobile: false
    }
  },
  computed: {
    ...mapState(['common']),
    key() {
      return this.$route.fullPath
    },
    cachedViews() {
      return this.$store.state.route.cachedRoutes
    },
  },
  methods: {
    handleShowSidebar() {
      this.$store.commit('set_show_sidebar', !this.common.showSidebar)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.container {
  background: #ffffff;
  .nav-container {
    padding: 0;
    height: 85px !important;
  }
  .main-container {
    background: #f8f8f8;
  }
}
@media screen and (max-width: 768px) {
  .mobile-sidebar {
    position: fixed;
    left: 0;
    z-index: 2003;
  }
  .left-container {
    position: fixed;
    right: 0;
    width: calc(100% - 200px);
    height: 100%;
    z-index: 2003;
    background: #fff;
    opacity: 0.5;
  }
}
</style>
