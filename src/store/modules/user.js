import {
  login
} from '@/api/login'
/* eslint-disable */
import { removeLocalStroage, setLocalStroage } from '../../helpers/utils'
import router from '../../router'

const state = {
}

const getters = {
  // isLogin: () => (getLocalStroage('login') === '1'),
  // userPermission: () => getLocalStroage('alohaPermission')
}

const mutations = {
  SET_TOKEN: (state, token) => {
      state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
  },
  SET_NAME: (state, name) => {
      state.name = name
  },
  SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
      state.roles = roles
  }
}

function handleLogin(res) {
  const { permissions = 1, username } = res
  setLocalStroage('login', '1')
  setLocalStroage('permission', permissions)
  setLocalStroage('username', username)
}

function handleLogout() {
  removeLocalStroage('login')
  removeLocalStroage('permission')
  removeLocalStroage('email')
}

const actions = {
  // user login
  login({
      commit
  }, userInfo) {
      const {
          username,
          password
      } = userInfo
      return login({
          username,
          password
      }).then(res => {
          // 存入localstroage中
          // 放入权限和email
          handleLogin(res)
          return res
      }, error => {
          // 失败逻辑
          // 清空localstroage信
          setLocalStroage('login', 0)
          return Promise.reject(error)
      })
  },

  // // user logout
  // logout({
  //     commit,
  //     state,
  //     dispatch
  // }) {
  //     return logout().then(res => {
  //         // handleLogout()
  //         dispatch('remove_login_info')
  //         router.push('/login')
  //         return res
  //     }, error => {
  //         return Promise.reject(error)
  //     })
  // },

  remove_login_info({
      commit,
      state,
      dispatch
  }) {
      handleLogout()
      return Promise.resolve()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}