<template>
  <el-aside :width="tabWidth+'px'">
    <div>
      <div class="isClossTab" @click="isClossTabFun">
        <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
      </div>
      <el-menu
        class="menu el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#304155"
        text-color="#C1CFD9"
        active-text-color="#409EFF"
        default-active="order"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="order">
          <i class="el-icon-location"></i>
          <span slot="title">订单录入</span>
        </el-menu-item>
        <el-menu-item index="manual">
          <i class="el-icon-edit"></i>
          <span slot="title">手工录入</span>
        </el-menu-item>
        <el-menu-item index="query">
          <i class="el-icon-location"></i>
          <span slot="title">订单查询</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      isCollapse: false,
      tabWidth: 160,
      intelval: null,
    };
  },
  methods: {
    isClossTabFun() {
      clearInterval(this.intelval);
      if (!this.isCollapse) {
        this.intelval = setInterval(() => {
          if (this.tabWidth <= 64) clearInterval(this.intelval);
          this.tabWidth -= 4;
        }, 1);
      } else {
        this.intelval = setInterval(() => {
          if (this.tabWidth >= 160) clearInterval(this.intelval);
          this.tabWidth += 4;
        }, 1);
      }
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>

<style scoped lang="scss">
$header-height: 60px;
$background-color: #304155;
$color: #fff;

aside {
  overflow: hidden;
  height: 100%;
  background-color: $background-color;
  color: $color;

  .isClossTab {
    width: 100%;
    height: $header-height;
    cursor: pointer;
    font-size: 25px;
    text-align: center;
    line-height: $header-height;
    font-weight: bold;
    border-right: 1px solid #807c7c;
    box-sizing: border-box;
  }
  .menu {
    width: 100%;
    border-right: 0;
  }
  .el-submenu__title i,
  .el-menu-item i {
    color: #c1cfd9;
  }
  .el-menu-item.is-active i {
    color: inherit !important;
  }
}
</style>