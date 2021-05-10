import * as api from '@/api/base'
import {getToken, setToken, removeToken, getUser, setUser, removeUser} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    user: getUser()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      setToken(token)
      state.token = token
    },
    SET_USER: (state, user) => {
      setUser(user)
      state.user = user
    }
  },
  actions: {
    // 登录
    Login ({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        api.login(username, userInfo.password).then(response => {
          const data = response.data
          console.log('login', data)
          commit('SET_TOKEN', data.token)
          commit('SET_USER', username)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut ({commit, state}) {
      return new Promise((resolve, reject) => {
        api.logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          removeUser()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut ({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_USER', '')
        removeToken()
        removeUser()
        resolve()
      })
    }
  }
}

export default user
