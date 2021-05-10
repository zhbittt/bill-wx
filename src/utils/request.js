import axios from 'axios'
import store from '@/store'
import { Dialog } from 'vant'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.API_BASE_URL, // api的base_url
  timeout: 60000 // 请求超时时间
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// request拦截器
service.interceptors.request.use(config => {
  console.log(store.getters, store.getters.token)
  if (store.getters.token) {
    config.headers.Authorization = `Token ${store.getters.token}`
  } else {
    delete config.headers.common.Authorization
  }
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response.status === 401) {
      Dialog.confirm({
        message: '登录超时，可以取消继续留在该页面，或者重新登录',
        confirmButtonText: '重新登录',
        cancelButtonText: '取消'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    return Promise.reject(error)
  }
)

export default service
