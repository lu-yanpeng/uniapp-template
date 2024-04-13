import { onLoad } from '@dcloudio/uni-app'
import { SERVER_ADDRESS } from '@/constants'
import { computed, ref } from 'vue'

export const useImgSrc = (directoryName: string) => {
  /*
  * directoryName: deta-space数据库下的表名，到这个目录下找图片
  * */

  onLoad(async () => {
    try {
      type Response = {
        data: {
          data: {
            data: string[]
            total: number
          }
          msg: string
          status: number
        }
        [k: string]: any
      }
      const response = await uni.request({
        url: `${SERVER_ADDRESS}/drive/list`,
        data: {
          name: directoryName
        }
      })
      // @ts-ignore
      fileNameList.value = (response as Response).data.data.data
    } catch (e) {
      console.log('异常')
    }
  })

  const fileNameList = ref<string[]>([])
  // 每一个元素都是一个imgSrc地址，对应directoryName目录下的图片
  const imgSrc = computed(() => {
    const __imgObj: Record<string, string> = {}
    fileNameList.value.map((name) => {
      __imgObj[name] = `${SERVER_ADDRESS}/static/${directoryName}/${name}`
    })

    return __imgObj
  })

  return {
    imgSrc
  }
}
