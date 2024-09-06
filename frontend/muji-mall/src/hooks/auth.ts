import { onLoad } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'

export const isAuth = () => {
  const userStore = useUserStore()

  onLoad(() => {
    if (userStore.userInfo === null) {
      uni.navigateTo({
        url: '/pages/login/login'
      })
    }
  })
}
