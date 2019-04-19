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
        :default-active="$route.name"
        router
      >
        <div v-for="(route,index) in sideBarRoutes" :key="index">
          <el-submenu v-if="route.children" :index="route.name" :route="{'name':route.name}">
            <template slot="title">
              <i :class="route.meta.routeIcon"></i>
              <span>{{route.meta.routeText}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(subRoute,i) in route.children"
                :key="i"
                :index="subRoute.name"
                :route="{'name':subRoute.name}"
              >
                <i :class="subRoute.meta.routeIcon"></i>
                <span slot="title">{{subRoute.meta.routeText}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-else :index="route.name" :route="{'name':route.name}">
            <i :class="route.meta.routeIcon"></i>
            <span slot="title">{{route.meta.routeText}}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
import routes from '@/router/routes'
export default {
  name: "SideBar",
  data() {
    return {
      isCollapse: false,
      tabWidth: 160,
      intelval: null,
      sideBarRoutes: [],
      path: ""
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
    },
  },
  created() {
    this.sideBarRoutes = routes.find(item => item.name === 'main').children
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
.el-menu--collapse .el-submenu .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>