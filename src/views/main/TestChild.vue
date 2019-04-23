<template>
  <div>
    <el-button @click="$router.push({name:'testChild2'})">测试子路由2</el-button>
    <el-input v-model="test"></el-input>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "TestChild",
  data() {
    return {
      test: ""
    }
  }
}
</script>
