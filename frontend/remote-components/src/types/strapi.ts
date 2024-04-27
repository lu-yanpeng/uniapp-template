export type StrapiResponse<Body extends Record<string, any>> = {
  data: Body[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
  error?: Record<string, any>
}
