<template>
  <div>
    <div class="head"><h3>个人信息</h3></div>
    <div>
      <van-cell-group>
        <van-cell title="用户名" :value="username"/>
      </van-cell-group>
    </div>
    <div class="content">
      <van-grid :column-num="2" clickable>
        <van-grid-item icon="home-o" text="登录" @click="Login"/>
        <van-grid-item icon="search" text="退出" @click="Logout"/>
      </van-grid>
      <van-grid :column-num="2" clickable>
        <van-grid-item icon="home-o" text="个人账单" to="/bills"/>
        <van-grid-item icon="search" text="账单记录" to="/bill/list"/>
      </van-grid>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Cell, CellGroup, Button, Tabbar, TabbarItem, Grid, GridItem} from 'vant'

import { getUser } from '@/utils/auth'

Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Grid)
Vue.use(GridItem)

export default {
  name: 'home',
  data () {
    return {
      username: ''
    }
  },
  mounted () {
    this.initUserInfo()
  },
  methods: {
    initUserInfo () {
      this.username = getUser()
    },
    Login () {
      this.$store.dispatch('FedLogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
      this.$router.push({path: '/login'})
    },
    Logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style scoped>
  .head {
    width: 100%;
    padding-left: 15px;
    color: #455a64;;
  }
</style>
