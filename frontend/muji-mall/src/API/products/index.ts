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
        }
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

const getProductListQuery = (page: number, pageSize: number, sort: string | string[]) => {
  return useQsStringify({
    fields: ['updatedAt'],
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
            fields: ['price']
          }
        }
      }
    },
    pagination: {
      page,
      pageSize
    },
    sort
  })
}
export type ProductList = {
  id: number
  attributes: {
    spu: {
      title: string
      sales: number
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
        price: number
      }[]
    }
  }
}[]
export const getProductList = async (
  page: number = 1,
  pageSize: number = 8,
  sort: string | string[] = ''
) => {
  const query = getProductListQuery(page, pageSize, sort)
  return (await uni
    .request({
      url: `${SERVER_ADDRESS}/api/products?${query}`
    })
    .then(({ data }) => data)) as StrapiResponse<ProductList>
}
