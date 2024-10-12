import { SERVER_ADDRESS } from '@/constants'

type Success = {
  jwt: string
  user: {
    id: number
    username: string
    email: string
  }
}
type Fail = {
  data: any
  error: {
    status: number
    name: string
    message: string
  }
}
export const login = async (userInfo: { username: string; password: string }) => {
  return (await uni
    .request({
      method: 'POST',
      url: `${SERVER_ADDRESS}/api/auth/local`,
      data: {
        identifier: userInfo.username,
        password: userInfo.password
      }
    })
    .then(({ data }) => data)) as Success | Fail
}

export const verifyMe = async (jwt: string) => {
  return (await uni
    .request({
      url: `${SERVER_ADDRESS}/api/users/me`,
      header: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(({ data }) => data)) as Success['user'] | Fail
}
