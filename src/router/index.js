import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 * @constantRouterMap xx
 * @type {*[]}
 */
export const constantRouterMap = [
  {path: '/', name: 'home', component: () => import('../views/home/home.vue'), hidden: true},
  {path: '/login', component: () => import('../views/login/index.vue'), hidden: true},
  {path: '/bills', component: () => import('../views/bill/index.vue'), hidden: true},
  {path: '/bill/list', component: () => import('../views/bill/list.vue'), hidden: true},
  {path: '/bill/create', component: () => import('../views/bill/create.vue'), hidden: true}
]

export default new Router({
  // mode: 'history', // 后端支持可开
  routes: constantRouterMap
})
