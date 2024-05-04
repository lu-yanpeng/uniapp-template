import { SERVER_ADDRESS } from '@/constants'
import type { StrapiResponse } from '@/types/strapi'
import { useQsStringify } from '@/hooks/commonTool'

const getBannerListQuery = useQsStringify({
  fields: ['title'],
  populate: {
    cover_img: {
      fields: ['url']
    },
    component_id: {
      fields: ['component_id', 'component_name']
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
    component_id: {
      data: {
        id: number
        attributes: {
          component_id: string
          component_name: string
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
