// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
// import axios from 'axios'
import './permission'
import ElementUI from 'element-ui'
import router from './router'
import moment from 'moment'
import store from './store'

Vue.use(ElementUI)
// Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.prototype.$moment = moment
moment.locale('zh-cn')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
