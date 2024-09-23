import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as apiLogin, verifyMe as apiVerifyMe } from '@/API/user'

export const useUserStore = defineStore('user', () => {
  const USER_KEY = 'muji-mall-user'
  type UserInfo = {
    id: number
    username: string
    email: string
    jwt: string
  }
  const userInfo = ref<UserInfo | null>(null)
  userInfo.value = JSON.parse(localStorage.getItem(USER_KEY) as string) as UserInfo

  const login = async (_userInfo: { username: string; password: string }) => {
    try {
      const result = await apiLogin(_userInfo)
      if ('jwt' in result) {
        const { user } = result
        userInfo.value = {
          id: user.id,
          username: user.username,
          email: user.email,
          jwt: result.jwt
        }
        localStorage.setItem(USER_KEY, JSON.stringify(userInfo.value))
        return true
      }
      return false
    } catch (e) {
      console.error('意外错误')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem(USER_KEY)
    userInfo.value = null
  }

  const verifyMe = async () => {
    try {
      if (!userInfo.value) {
        logout()
        return false
      }
      const result = await apiVerifyMe(userInfo.value.jwt)
      if (!('id' in result)) {
        logout()
        return false
      }
      return true
    } catch (e) {
      logout()
      console.log('登录失败 me')
      return false
    }
  }

  return {
    login,
    logout,
    userInfo,
    verifyMe
  }
})
