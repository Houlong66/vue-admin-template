<template>
  <el-aside :width="tabWidth+'px'">
    <div>
      <div :class="{'isClossTab':true,'ellipsis':!isCollapse}">
        <img :src="logo" width="18" class="logo">
        <span v-if="showTitle">Vue管理后台模板</span>
      </div>
      <el-menu
        class="menu el-menu-vertical-demo"
        ref="elMenu"
        :collapse="isCollapse"
        background-color="#304155"
        text-color="#C1CFD9"
        active-text-color="#409EFF"
        :default-active="$route.meta.routeText"
      >
        <template v-for="(route,index) in sideBarRoutes">
          <el-submenu :key="index" v-if="route.children.length>1" :index="`${index}`">
            <template slot="title">
              <i :class="route.meta.routeIcon"></i>
              <span>{{route.meta.routeText}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(subRoute,i) in route.children"
                :key="i"
                :index="subRoute.meta.routeText"
              >
                <div @click="handleClick(subRoute)">
                  <i :class="subRoute.meta.routeIcon"></i>
                  <span slot="title">{{subRoute.meta.routeText}}</span>
                </div>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-else :index="route.children[0].meta.routeText" :key="index">
            <div @click="handleClick(route.children[0])">
              <i :class="route.children[0].meta.routeIcon"></i>
              <span slot="title">{{route.children[0].meta.routeText}}</span>
            </div>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="closeIcon" @click="isClossTabFun">
      <el-button type="text" :icon="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></el-button>
    </div>
  </el-aside>
</template>

<script>
import routes from '@/router/sideBarRoutes'
import { mapState } from 'vuex'
export default {
  name: "SideBar",
  data() {
    return {
      isCollapse: false,
      tabWidth: 200,
      intelval: null,
      sideBarRoutes: [],
      logo: require('../../../../assets/logo.png'),
      showTitle: true
    };
  },
  computed: {
    ...mapState(['route'])
  },
  methods: {
    isClossTabFun() {
      clearInterval(this.intelval);
      if (!this.isCollapse) {
        this.intelval = setInterval(() => {
          if (this.tabWidth <= 64) {
            clearInterval(this.intelval);
            this.showTitle = false
          }
          this.tabWidth -= 1.8;
        }, 1);
      } else {
        this.intelval = setInterval(() => {
          if (this.tabWidth >= 200) {
            clearInterval(this.intelval);
            this.showTitle = true
          }
          this.tabWidth += 1.8;
        }, 1);
      }
      this.isCollapse = !this.isCollapse;
    },
    initBar() {
      // this.$refs.elMenu.activeIndex = this.$route.meta.routeText
      routes.forEach((item, index) => {
        // 只显示要展示的子路由
        if (item.children) {
          routes[index].children = item.children.filter(route => route.meta.showSideBar)
        }
      })
      this.sideBarRoutes = routes
    },
    handleClick(item) {
      let tempObj = {
        name: item.name,
        text: item.meta.routeText
      }
      this.$store.commit('add_route', tempObj)
      this.$store.commit('add_cached', item)
      this.$router.push({ name: item.name })
    }
  },
  mounted() {
    this.initBar()
  }
};
</script>

<style scoped lang="scss">
$header-height: 60px;
$background-color: #304155;
$color: #fff;

aside {
  position: relative;
  overflow: hidden;
  height: 100%;
  background-color: $background-color;
  color: $color;

  .isClossTab {
    width: 100%;
    padding: 0 20px;
    height: $header-height;
    font-size: 14px;
    line-height: $header-height;
    font-weight: normal;
    border-right: 1px solid #807c7c;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    .logo {
      position: relative;
      top: 3px;
      margin-right: 10px;
    }
  }
  .ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .closeIcon {
    position: absolute;
    bottom: 3%;
    left: 50%;
    transform: translate(-50%, 0);
    button {
      width: 160px;
      font-size: 25px;
      color: #c1cfd9;
    }
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
.el-submenu__title [class^="el-icon-"],
.el-menu-item [class^="el-icon-"] {
  width: auto !important;
  margin-right: 10px !important;
}
</style>