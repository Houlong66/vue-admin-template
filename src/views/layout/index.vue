<template>
  <el-container class="app-wrapper">
    <side-bar></side-bar>
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

export default {
  name: "Layout",
  components: {
    SideBar,
    NavBar,
    TabBar
  },
  computed: {
    key() {
      return this.$route.fullPath
    },
    cachedViews() {
      return this.$store.state.route.cachedRoutes
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
</style>
