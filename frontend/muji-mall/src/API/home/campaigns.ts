// 特集
import { SERVER_ADDRESS } from '@/constants'
import type { StrapiResponse } from '@/types/strapi'
import { useQsStringify } from '@/hooks/commonTool'

const getCampaignsQuery = (sort: string | string[]) => {
  return useQsStringify({
    fields: ['title'],
    populate: {
      cover_img: {
        fields: ['url']
      },
      activity_component: {
        fields: ['component_id', 'component_path']
      }
    },
    pagination: {
      page: 1,
      pageSize: 6
    },
    sort
  })
}
export type CampaignsData = {
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
export const getCampaigns = async (sort: string | string[] = ['createdAt:desc']): Promise<StrapiResponse<CampaignsData>> => {
  const query = getCampaignsQuery(sort)
  return await uni.request({
    url: `${SERVER_ADDRESS}/api/campaigns?${query}`
  }).then(({ data }) => data) as StrapiResponse<CampaignsData>
}
