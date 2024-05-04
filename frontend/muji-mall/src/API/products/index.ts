import { SERVER_ADDRESS } from '@/constants'
import type { StrapiResponse } from '@/types/strapi'
import { useQsStringify } from '@/hooks/commonTool'

const getProductQuery = useQsStringify({
  fields: [],
  populate: {
    spu: {
      fields: ['title', 'sales'],
      populate: {
        cover: {
          fields: ['url']
        }
      }
    },
    sku: {
      populate: {
        sku: {
          fields: '*'
        },
        color: {
          populate: {
            cover: {
              fields: ['url']
            }
          }
        }
      }
    },
    params: {
      populate: {
        other: {
          fields: '*'
        }
      }
    },
    banner: {
      populate: {
        images: {
          populate: {
            img: {
              fields: ['url']
            }
          }
        }
      }
    }
  }
})
export type Product = {
  attributes: {
    spu: {
      title: string
      sales: string
      cover: {
        data: {
          attributes: {
            url: string
          }
        }[]
      }
    }
    sku: {
      sku: {
        size: string
        color: string
        inventory: number
        price: number
      }[]
      color: {
        uid: string
        name: string
        cover: {
          data: {
            attributes: {
              url: string
            }
          }
        }
      }[]
    }
    params: {
      other: {
        key: string
        value: string
      }[]
    }
    banner: {
      images: {
        img: {
          data: {
            attributes: {
              url: string
            }
          }[]
        }
      }[]
    }
    detail: string
  }
}
export const getProduct = async (id: string): Promise<StrapiResponse<Product>> => {
  return await uni.request({
    url: `${SERVER_ADDRESS}/api/products/${id}?${getProductQuery}`
  }).then(({ data }) => data) as StrapiResponse<Product>
}
