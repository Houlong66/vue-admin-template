<template>
  <div>
    <el-row class="navbar-container" type="flex" justify="space-between" align="middle">
      <el-col :span="6">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
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
              <img :src="images.avatar"><i class="el-icon-caret-bottom"></i>
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
      }
    }
  },
  methods: {
    handleCommand(command) {
      console.log(command)
    }
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
