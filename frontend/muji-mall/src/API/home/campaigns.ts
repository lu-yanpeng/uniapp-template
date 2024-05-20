// 特集
import { SERVER_ADDRESS } from '@/constants'
import type { StrapiResponse } from '@/types/strapi'
import { useQsStringify } from '@/hooks/commonTool'

const getCampaignsQuery = useQsStringify({
  fields: ['title'],
  populate: {
    cover_img: {
      fields: ['url']
    },
    campaign_component: {
      fields: ['component_id', 'component_path']
    }
  },
  pagination: {
    page: 1,
    pageSize: 6
  }
})
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
    campaign_component: {
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
export const getCampaigns = async (): Promise<StrapiResponse<CampaignsData>> => {
  return await uni.request({
    url: `${SERVER_ADDRESS}/api/campaigns?${getCampaignsQuery}`
  }).then(({ data }) => data) as StrapiResponse<CampaignsData>
}
