<template>
  <div class="padding:20px;backgroud:red">
    <router-view></router-view>
    test 1
  </div>
</template>
<script>
export default {
  name: 'TestChild1',
  data() {
    return {
      test: ''
    }
  }
}
</script>