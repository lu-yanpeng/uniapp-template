import { SERVER_ADDRESS } from '@/constants'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
export const addCart = async (params: {
  quantity: number
  user: number
  product: number
  color: number
  size: number
}) => {
  return uni.request({
    method: 'POST',
    url: `${SERVER_ADDRESS}/api/carts`,
    data: {
      data: {
        quantity: params.quantity,
        color: params.color,
        size: params.size,
        user: {
          set: [params.user]
        },
        product: {
          set: [params.product]
        }
      }
    },
    header: {
      Authorization: `Bearer ${userStore.userInfo?.jwt}`
    }
  })
}
