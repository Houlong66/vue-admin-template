<template>
 <!-- 没有声明children -->
  <el-menu-item v-if="!route.children" :index="route.meta.routeText" >
    <div @click="handleClick(route)">
      <i :class="route.meta.routeIcon"></i>
      <span slot="title">{{route.meta.routeText}}</span>
    </div>
  </el-menu-item>
  <!-- 声明了children -->
  <el-submenu  v-else-if="route.children.length>1" :index="route.meta.routeText">
    <template slot="title">
      <i :class="route.meta.routeIcon"></i>
      <span>{{route.meta.routeText}}</span>
    </template>
      <side-bar-item
        v-for="(subRoute,i) in route.children"
        :key="i"
        :route='subRoute'
      >
      </side-bar-item>
  </el-submenu>
  <!-- children只有一个 -->
  <el-menu-item v-else :index="route.children[0].meta.routeText" >
    <div @click="handleClick(route.children[0])">
      <i :class="route.children[0].meta.routeIcon"></i>
      <span slot="title">{{route.children[0].meta.routeText}}</span>
    </div>
  </el-menu-item>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name:'SideBarItem',
  data() {
    return {}
  },
  computed: {
    ...mapState(['common'])
  },
  props: {
    route: {
      type: Object
    },
  },
  methods: {
    handleClick(item) {
      // 防止点击当前页面路由自己的时候报错
      if(item.name===this.$route.name) return
      
      if (this.common.isMobile) {
        this.$store.commit('set_show_sidebar', false)
      }
      this.$router.push({ name: item.name })
    }
  }
}
</script>