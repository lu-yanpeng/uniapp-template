import { stringify } from 'qs'

export const useQsStringify = (query: Record<string, any>) => {
  return stringify(query, { encodeValuesOnly: true })
}
