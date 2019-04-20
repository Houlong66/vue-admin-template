<template>
  <div>
    <el-row class="navbar-container" type="flex" justify="space-between" align="middle">
      <el-col :span="15">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="(item,index) in breadCrumbs"
            :key="index"
            :to="{path: item.to}"
          >{{item.text}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="6">
        <el-row type="flex" align="middle" justify="end">
          <el-tooltip class="item" effect="dark" content="提示" placement="bottom">
            <el-button icon="el-icon-location-outline" circle size="medium"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="提示" placement="bottom">
            <el-button icon="el-icon-search" circle size="medium"></el-button>
          </el-tooltip>
          <el-dropdown @command="handleCommand" trigger="click">
            <a class="avatar-box" href="javascript:void(0)">
              <img :src="images.avatar">
              <i class="el-icon-caret-bottom"></i>
            </a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: {
        'avatar': require('../../../../assets/avatar.jpg')
      },
      breadCrumbs: [
        {
          text: "首页",
          to: "/"
        }
      ]
    }
  },
  watch: {
    "$route": function () {
      this.initBar()
    }
  },
  methods: {
    handleCommand(command) {
      console.log(command)
    },
    initBar() {
      this.breadCrumbs = [
        {
          text: "首页",
          to: "/"
        }
      ]
      this.$route.matched.forEach(item => {
        if (item.meta.routeText&&item.meta.routeText!=='首页') {
          let tempObj = {
            text: item.meta.routeText,
            to: item.path
          }
          this.breadCrumbs.push(tempObj)
        }
      })
    }
  },
  created() {
    this.initBar()
  }
}
</script>

<style lang="scss" scoped>
$navBarHeight: 50px;
.navbar-container {
  height: $navBarHeight;
  padding-left: 20px;
  padding-right: 40px;
  .el-breadcrumb {
    font-size: 15px;
  }
  .avatar-box {
    display: block;
    color: #606266;
    margin-left: 20px;
    img {
      height: 40px;
      width: 40px;
      border-radius: 5px;
      margin-right: 5px;
    }
  }
}
</style>
