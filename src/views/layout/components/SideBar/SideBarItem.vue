<template>
 <!-- 没有声明children -->
  <el-menu-item v-if="!route.children" :index="route.meta.routeText" :key="index">
    <div @click="handleClick(route)">
      <i :class="route.meta.routeIcon"></i>
      <span slot="title">{{route.meta.routeText}}</span>
    </div>
  </el-menu-item>
  <el-submenu  v-else-if="route.children.length>1" :key="index" :index="`${index}`">
    <template slot="title">
      <i :class="route.meta.routeIcon"></i>
      <span>{{route.meta.routeText}}</span>
    </template>
      <side-bar-item
        v-for="(subRoute,i) in route.children"
        :key="i"
        :index="subRoute.meta.routeText"
        :route='subRoute'
      >
      </side-bar-item>
  </el-submenu>
  <!-- 声明了children -->
  <el-menu-item v-else :index="route.children[0].meta.routeText" :key="index">
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
    index: {
      type: [Number,String]
    }
  },
  methods: {
    handleClick(item) {
      if (this.common.isMobile) {
        this.$store.commit('set_show_sidebar', false)
      }
      this.$router.push({ name: item.name })
    }
  }
}
</script>