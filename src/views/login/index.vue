<template>
  <div class="login-container">
    <div class="top">
      <div class="top-left"></div>
      <div class="top-mid">
        <van-image
          round
          width="8rem"
          height="8rem"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="top-right"></div>
    </div>
    <van-form>
      <van-field
        v-model="loginForm.username"
        name="用户名"
        size="large"
        left-icon="contact"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
        class="field_x"
      />
      <van-field
        v-model="loginForm.password"
        type="password"
        name="密码"
        size="large"
        left-icon="lock"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
        class="field_x"
      />
      <div style="margin-top: 30px">
        <van-button round block type="info" @click="onSubmit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { Form, Field, Button, Image as VanImage } from 'vant'

Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(VanImage)

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('Login', this.loginForm).then(resp => {
        this.$router.push({path: '/'})
      }).catch(() => {})
      // Login(this.username, this.password).then(({data}) => {
      //   this.$store.commit('SET_TOKEN', data.token)
      //   this.$store.commit('SET_USET', this.username)
      //   this.$router.push({ path: '/bills' })
      // })
    }
  }
}
</script>

<style rel="stylesheet/scss" scoped>
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #2d3a4b;
    }
  .field_x {
    margin-top: 5px;
    background-color: #fff;
    border-radius: 30px;
  }
  .top {
    margin: 100px 0 30px 0;
  }
  .top-left {
    width: 28%;
    display: inline-block;
  }
  .top-mid {
    width: 40%;
    display: inline-block;
    text-align: center;
  }
  .top-right {
    width: 28%;
    display: inline-block;
  }
</style>
