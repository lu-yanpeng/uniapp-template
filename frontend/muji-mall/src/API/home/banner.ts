import { SERVER_ADDRESS } from '@/constants'
import type { StrapiResponse } from '@/types/strapi'
import { useQsStringify } from '@/hooks/commonTool'

const getBannerListQuery = useQsStringify({
  fields: ['title'],
  populate: {
    cover_img: {
      fields: ['url']
    },
    activity_component: {
      fields: ['component_id', 'component_path']
    }
  },
  sort: ['sort']
})
export type BannerData = {
  id: number
  attributes: {
    title: string
    desc: string
    cover_img: {
      data: {
        id: number
        attributes: {
          url: string
        }
      }
    }
    activity_component: {
      data: {
        id: number
        attributes: {
          component_id: string
          component_path: string
        }
      }
    }
  }
}[]
export const getBannerList = async (): Promise<StrapiResponse<BannerData>> => {
  return (await uni
    .request({
      url: `${SERVER_ADDRESS}/api/activities?${getBannerListQuery}`
    })
    .then(({ data }) => data)) as StrapiResponse<BannerData>
}
