import { stringify } from 'qs'
import { SERVER_ADDRESS } from '@/constants'
import type { StrapiResponse } from '@/types/strapi'

export const useQsStringify = (query: Record<string, any>) => {
  return stringify(query, { encodeValuesOnly: true })
}

const query = useQsStringify({
  fields: ['component_id', 'component_path']
})
type CompsPath = {
  id: number
  attributes: {
    component_id: string
    component_path: string
  }
}
export const useGetCompsPath = async (): Promise<StrapiResponse<CompsPath>> => {
  return await uni
    .request({
      url: `${SERVER_ADDRESS}/api/activity-components?${query}`
    })
    .then(({ data }) => data)
}
