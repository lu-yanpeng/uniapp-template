export type Order =
  | 'spu.sales:desc,createdAt:desc'
  | 'spu.sales:desc'
  | 'createdAt:desc'
  | 'spu.min_list_price'
  | 'spu.max_list_price:desc'