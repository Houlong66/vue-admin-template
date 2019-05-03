<template>
  <div :class="{'show':show}" class="header-search">
    <svg-icon
      iconName="search"
      width="20"
      height="20"
      class="search-icon"
      @click.native.stop="handleClick"
    ></svg-icon>
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option
        v-for="(item,index) in options"
        :key="index"
        :value="item"
        :label="item.title.join(' > ')"
      />
    </el-select>
  </div>
</template>

<script>
import routes from '@/router/sideBarRoutes'
export default {
  name: 'HeaderSearch',
  data() {
    return {
      search: '',
      options: [], // 选项
      allOptions: [], // 全部选项
      routes: [], // 路由
      show: false
    }
  },
  watch: {
    show(val) {
      if (val) {
        document.body.addEventListener('click', this.close)
      } else {
        document.body.removeEventListener('click', this.close)
      }
    }
  },
  mounted() {
    this.routes = routes
    this.initOptions()
  },
  methods: {
    initOptions() {
      this.routes.forEach(route => {
        route.children = route.children.filter(item => item.meta.showSideBar)
        if (route.children.length > 0) {
          if (route.children.length > 1) {
            route.children.forEach(item => {
              this.allOptions.push(item)
              this.allOptions[this.allOptions.length - 1].title = [route.meta.routeText, item.meta.routeText]
            })
          } else {
            this.allOptions.push(route.children[0])
            this.allOptions[this.allOptions.length - 1].title = [route.children[0].meta.routeText]
          }
        }
      })
    },
    querySearch(query) {
      this.options = this.allOptions.filter(item => item.title[item.title.length - 1].includes(query))
    },
    change(val) {
      let tempObj = {
        name: val.name,
        text: val.meta.routeText
      }
      this.$store.commit('add_route', tempObj)
      this.$store.commit('add_cached', val)
      this.$router.push({ name: val.name })
      this.search = ''
      this.options = []
      this.$nextTick(() => {
        this.show = false
      })
    },
    handleClick() {
      this.show = !this.show
      if (this.show) {
        this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
      }
    },
    close() {
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
      this.options = []
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 20px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    /deep/ .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
