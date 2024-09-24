import { SERVER_ADDRESS } from '@/constants'
import type { StrapiResponse } from '@/types/strapi'
import { useQsStringify } from '@/hooks/commonTool'

const getVideoQuery = useQsStringify({
  fields: ['createdAt'],
  populate: {
    video: {
      fields: ['url']
    },
    poster: {
      fields: ['url']
    }
  }
})
type Video = {
  attributes: {
    poster: {
      data: {
        attributes: {
          url: string
        }
      }
    }
    video: {
      data: {
        attributes: {
          url: string
        }
      }
    }
  }
}
export const getVideo = async () => {
  return (await uni
    .request({
      url: `${SERVER_ADDRESS}/api/video/?${getVideoQuery}`
    })
    .then(({ data }) => data)) as StrapiResponse<Video>
}
