import { SERVER_ADDRESS } from '@/constants'
import type { StrapiResponse } from '@/types/strapi'
import { useQsStringify } from '@/hooks/commonTool'

const getCategoryListQuery = useQsStringify({
  fields: ['title'],
  populate: {
    child: {
      fields: ['title'],
      populate: {
        cover: {
          fields: ['url']
        }
      }
    }
  }
})
type CategoryList = {
  attributes: {
    title: string
    child: {
      data: {
        attributes: {
          title: string
          cover: {
            data: {
              attributes: {
                url: string
              }
            }
          }
        }
      }[]
    }
  }
}[]
export const getCategoryList = async () => {
  return (await uni
    .request({
      url: `${SERVER_ADDRESS}/api/category-1s?${getCategoryListQuery}`
    })
    .then(({ data }) => data)) as StrapiResponse<CategoryList>
}
