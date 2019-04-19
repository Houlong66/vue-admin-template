<template>
  <el-container class="app-wrapper">
    <side-bar></side-bar>
    <el-container class="container">
      <el-header class="nav-container">
        <nav-bar></nav-bar>
      </el-header>
      <el-main class="main-container">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {SideBar, NavBar} from './components'

export default {
  name: "Layout",
  components: {
    SideBar,
    NavBar
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
    height: 50px !important;
  }
  .main-container {
    background: #f8f8f8;
  }
}
</style>
