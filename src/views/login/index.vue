<template>
  <el-row class="login-wrapper" type="flex" justify="center" align="middle">
    <div class="login">
      <el-form :model="formLogin" label-position="left">
        <el-form-item class="title">
          <span>Vue管理后台模板</span>
        </el-form-item>
        <el-form-item>
          <el-input ref="account" v-model="formLogin.loginName" placeholder="账号" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formLogin.password" placeholder="密码" type="password" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="login" :disabled="!formLogin.loginName || !formLogin.password">登陆</el-button>
        </el-row>
      </el-form>
    </div>
    <!-- <p class="bottom-text">艾瑞咨询集团</p> -->
  </el-row>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      formLogin: {
        password: '',
        loginName: ''
      },
      isMobile: false
    }
  },
  mounted() {
    this.isMobile = this.$native().android || this.$native().iPhone
    this.$refs.account.focus()
  },
  methods: {
    login() {
      let tempData = {
        name: this.formLogin.loginName,
        password: this.formLogin.password
      }
      this.$store
        .dispatch('login', tempData)
        .then(() => {
          this.$message.success('登录成功')
          this.$router.replace({ path: '/' })
        })
        .catch(err => {
          this.$message.error(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  height: 100%;
  @media screen and (max-width: 768px) {
    .login {
      width: 85%;
    }
  }
  @media screen and (min-width: 768px) {
    .login {
      width: 500px;
    }
  }
  .login {
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    padding: 2% 4%;
    box-sizing: border-box;
    .title {
      text-align: center;
      color: #333;
      /deep/ .el-form-item__content {
        font-size: 20px;
      }
    }
    .el-button {
      width: 50%;
    }
  }
}
.bottom-text {
  position: absolute;
  bottom: 5%;
  color: #eee;
  font-size: 12px;
}
</style>