<template>
  <div>
    <el-button @click="$router.push('/test_father/test_child1')">测试子路由1</el-button>
    <el-input v-model="test"></el-input>
  </div>
</template>

<script>
export default {
  name: "testChild",
  data() {
    return {
      test: ""
    }
  }
}
</script>
