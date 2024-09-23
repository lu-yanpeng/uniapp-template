import { SERVER_ADDRESS } from '@/constants'
import type { StrapiResponse } from '@/types/strapi'
import { useQsStringify } from '@/hooks/commonTool'

const getProductQuery = useQsStringify({
  fields: [],
  populate: {
    spu: {
      fields: ['title', 'sales', 'min_list_price', 'max_list_price'],
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
      fields: ['*']
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
  id: number
  attributes: {
    spu: {
      title: string
      sales: string
      min_list_price: number
      max_list_price: number
      cover: {
        data: {
          attributes: {
            url: string
          }
        }
      }
    }
    sku: {
      sku: {
        id: number
        size: string
        color: string
        inventory: number
        price: number
      }[]
      color: {
        id: number
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
      gender: string
      code: string
      ref: string
      season: string
      material: string
      producer: string
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
// 获取商品主图
export const getProduct = async (id: string): Promise<StrapiResponse<Product>> => {
  return (await uni
    .request({
      url: `${SERVER_ADDRESS}/api/products/${id}?${getProductQuery}`
    })
    .then(({ data }) => data)) as StrapiResponse<Product>
}

type PriceDesc = {
  attributes: {
    img: string
  }
}
// 获取详情图底部的价格说明和退货换说明，每个商品的说明都相同，都是两个图片
export const getPriceDesc = async (): Promise<StrapiResponse<PriceDesc>> => {
  return (await uni
    .request({
      url: `${SERVER_ADDRESS}/api/price-desc?fields[0]=img`
    })
    .then(({ data }) => data)) as StrapiResponse<PriceDesc>
}

const getProductListQuery = (
  page: number,
  pageSize: number,
  sort: string | string[],
  filters?: string
) => {
  const query: Record<string, any> = {
    fields: ['updatedAt'],
    populate: {
      spu: {
        fields: ['title', 'sales', 'min_list_price', 'max_list_price'],
        populate: {
          cover: {
            fields: ['url']
          }
        }
      }
    },
    pagination: {
      page,
      pageSize
    },
    sort
  }

  if (filters) {
    query['filters'] = {
      $or: [
        {
          spu: {
            title: {
              // 商品名包含
              $containsi: filters
            }
          }
        },
        {
          params: {
            ref: {
              // 货号全等
              $eqi: filters
            }
          }
        }
      ]
    }
  }

  return useQsStringify(query)
}
export type ProductList = {
  id: number
  attributes: {
    spu: {
      title: string
      sales: number
      min_list_price: number
      max_list_price: number
      cover: {
        data: {
          attributes: {
            url: string
          }
        } | null
      }
    }
  }
}[]
export const getProductList = async (
  page: number = 1,
  pageSize: number = 8,
  sort: string | string[] = '',
  filters?: string
) => {
  const query = getProductListQuery(page, pageSize, sort, filters)
  return (await uni
    .request({
      url: `${SERVER_ADDRESS}/api/products?${query}`
    })
    .then(({ data }) => data)) as StrapiResponse<ProductList>
}
