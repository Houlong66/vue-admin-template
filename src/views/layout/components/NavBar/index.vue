<template>
  <div>
    <el-row class="navbar-container" type="flex" justify="space-between" align="middle">
      <el-col :span="14">
        <el-breadcrumb separator="/">
          <template v-for="(item,index) in breadCrumbs">
            <el-breadcrumb-item
              v-if="isChange"
              :key="index"
              :to="{path: item.to}"
              :class="index===breadCrumbs.length-1?'animated lightSpeedIn fast':''"
            >{{item.text}}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </el-col>
      <el-col :span="10">
        <el-row type="flex" align="middle" justify="end" class="navbar-right-row">
          <header-search></header-search>
          <el-tooltip class="item" effect="dark" content="点赞" placement="bottom" :open-delay="500">
            <cm-star @handleClick="handleLike">
              <svg-icon iconName="good" height="20" width="20"></svg-icon>
            </cm-star>
          </el-tooltip>
          <el-dropdown @command="handleCommand">
            <div class="avatar-box" @mouseenter="isEnter=true" @mouseleave="isEnter=false" :class="isEnterAvatar">
              <img :src="images.avatar">
              <!-- <i class="el-icon-caret-bottom"></i> -->
            </div>
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
import HeaderSearch from '../HeaderSearch'
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
      ],
      isEnter: false,
      isChange: true // 路由切换时的状态记录
    }
  },
  components: {
    HeaderSearch
  },
  watch: {
    "$route": function () {
      this.initBar()
    }
  },
  computed: {
    isEnterAvatar() {
      return this.isEnter? "animated tada": ""
    }
  },
  methods: {
    handleCommand(command) {
      console.log(command)
    },
    initBar() {
      // 切换成false让组件重渲染
      this.isChange = false
      this.breadCrumbs = [
        {
          text: "首页",
          to: "/"
        }
      ]
      this.$route.matched.forEach(item => {
        if (item.meta.routeText && item.meta.routeText !== '首页') {
          let tempObj = {
            text: item.meta.routeText,
            to: item.path
          }
          this.breadCrumbs.push(tempObj)
        }
      })
      this.$nextTick(() => {
        this.isChange = true
      })
    },
    handleLike(...data) {
      console.log(data[0])
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
  .navbar-right-row {
    svg {
      margin-left: 12px;
    }
  }
  .el-breadcrumb {
    font-size: 15px;
  }
  .avatar-box {
    display: block;
    color: #606266;
    margin-left: 20px;
    cursor: pointer;
    img {
      height: 35px;
      width: 35px;
      border-radius: 5px;
    }
  }
}
</style>
