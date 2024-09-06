import { defineStore } from 'pinia'
import { login as apiLogin } from '@/API/user'

export const useUserStore = defineStore('user', () => {
  const USER_KEY = 'muji-mall-user'
  const login = async (userInfo: { username: string; password: string }) => {
    try {
      const result = await apiLogin(userInfo)
      if ('jwt' in result) {
        const { user } = result
        localStorage.setItem(
          USER_KEY,
          JSON.stringify({
            id: user.id,
            username: user.username,
            email: user.email,
            jwt: result.jwt
          })
        )
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
  }

  return {
    login,
    logout
  }
})
