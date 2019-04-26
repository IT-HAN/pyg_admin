<template>
    <div class="login_container">
        <!--  登录框  -->
        <div class="box">
            <el-form :model="form" :rules="rules" ref="form">
                <img src="../assets/imgs/logo.png" alt="">
                <el-form-item prop="username">
                    <el-input  placeholder="请输入用户名" prefix-icon="iconfont icon-account-pin-box-line" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" prefix-icon="iconfont icon-icons-" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit()">登录</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 18, message: '密码长度6-18个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate(async valid => {
        // 发送登录请求
        if (valid) {
          // 通过async await获取响应的结果
          const {data: {data, meta}} = await this.$http.post('login', this.form)
          if (meta.status !== 200) return this.$message.error(meta.msg || '登录失败')
          //  登录成功保存token  使用sessionStorage
          sessionStorage.setItem('token', data.token)
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>

<style scoped>
    .login_container{
        background: linear-gradient(45deg,#FFD3DB,#A5CFF2);
        height: 100%;
    }
    .login_container .box{
        width: 400px;
        height: 250px;
        background: linear-gradient(45deg,lightcyan,mistyrose);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-60%);
        padding: 0 20px;
        box-sizing: border-box;
    }
    .login_container .box img{
        width: 200px;
        display: block;
        margin: 10px auto;
    }
</style>
