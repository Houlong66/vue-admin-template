<template>
  <div class="tab-container">
    <template v-for="(item,index) in route.routeTabs">
      <div :key="index" v-if="isChosen(item.name)" class="tab chosen">
        <span class="tab-text">{{item.text}}</span>
        <span @click="handleClose(index)" class="closable" v-if="isClosable(item.name)">x</span>
      </div>
      <div :key="index" v-else class="tab" @click="handleClick(item)">
        <span class="tab-text">{{item.text}}</span>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TabBar',
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['route'])
  },
  created() {
    this.initBar()
  },
  methods: {
    initBar() {
      // 如果初次访问的是首页，就不用添加项
      if (this.$route.name === 'Main' || !this.$route.meta.showSideBar) return
      let tempObj = {
        name: this.$route.name,
        text: this.$route.meta.routeText
      }
      this.$store.commit('add_route', tempObj)
      this.$store.commit('add_cached', this.$route)
    },
    isChosen(item) {
      return item === this.$route.name
    },
    isClosable(item) {
      // 首页项不能删
      return this.isChosen(item) && item !== 'Main'
    },
    handleClick(item) {
      this.$router.push({ name: item.name })
    },
    handleClose(index) {
      this.$store.commit('del_cached', this.route.routeTabs[index].name)
      this.$store.commit('del_route', index)
      // 如果删除该项后，就访问它的前一项
      this.$router.push({ name: this.route.routeTabs[index - 1].name })
    }
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px){
  .tab-container {
    padding-left: 5px;
  }
}
@media screen and (min-width: 768px){
  .tab-container {
    padding-left: 20px;
  }
}
.tab-container::-webkit-scrollbar {
  height: 3px;
  background-color: #fff;
}
.tab-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
}
.tab-container {
  height: 35px;
  border-top: 2px solid #f8f8f8;
  line-height: 30px;
  overflow-y: hidden;
  overflow-x: scroll;
  white-space: nowrap;
  .tab {
    cursor: pointer;
    display: inline-block;
    border: 1px solid #999999;
    height: 25px;
    line-height: 25px;
    padding: 0 8px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    font-size: 12px;
    margin-right: 10px;
    .tab-text {
      display: inline-block;
      height: 25px;
    }
  }
  .chosen {
    background-color: #42b983;
    border-color: #42b983;
    color: #fff;
  }
  .chosen:before {
    content: "•";
    padding-right: 5px;
    color: #fff;
  }
  .closable {
    padding-left: 5px;
  }
}
</style>
