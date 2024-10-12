import { SERVER_ADDRESS } from '@/constants'
import { useUserStore } from '@/store/user'
import { useQsStringify } from '@/hooks/commonTool'
import type { StrapiResponse } from '@/types/strapi'

const userStore = useUserStore()
export const addCart = async (params: {
  quantity: number
  user: number
  product: number
  color: number
  size: number
}) => {
  return uni.request({
    method: 'POST',
    url: `${SERVER_ADDRESS}/api/carts`,
    data: {
      data: {
        quantity: params.quantity,
        color: params.color,
        size: params.size,
        user: {
          set: [params.user]
        },
        product: {
          set: [params.product]
        }
      }
    },
    header: {
      Authorization: `Bearer ${userStore.userInfo?.jwt}`
    }
  })
}

const getCartsQuery = (page: number = 1) => {
  return useQsStringify({
    filters: {
      user: {
        $eq: userStore.userInfo?.id
      }
    },
    pagination: {
      page
    },
    populate: {
      product: {
        fields: ['id'],
        populate: {
          spu: {
            fields: ['*'],
            populate: {
              cover: {
                fields: ['url']
              }
            }
          },
          sku: {
            populate: {
              sku: {
                fields: ['id', 'size', 'price']
              },
              color: {
                fields: ['id', 'name'],
                populate: {
                  cover: {
                    fields: ['url']
                  }
                }
              }
            }
          }
        }
      }
    }
  })
}
export type Carts = {
  id: number
  attributes: {
    color: number
    size: number
    quantity: number
    product: {
      data: {
        id: number
        attributes: {
          spu: {
            id: number
            title: string
          }
          sku: {
            color: {
              id: number
              name: string
              cover: {
                data: {
                  attributes: {
                    url: string
                  }
                }
              }
            }[],
            sku: {
              id: number
              size: string
              price: number
            }[]
          }
        }
      }
    }
  }
}
export const getCarts = async (page: number = 1) => {
  return (await uni.request({
    method: 'GET',
    url: `${SERVER_ADDRESS}/api/carts?${getCartsQuery(page)}`,
    header: {
      Authorization: `Bearer ${userStore.userInfo?.jwt}`
    }
  }).then(({ data }) => data)) as StrapiResponse<Carts[]>
}

export const updateCart = async (cartId: number, params: {
  quantity?: number
  color?: number
  size?: number
}) => {
  return (await uni.request({
    method: 'PUT',
    url: `${SERVER_ADDRESS}/api/carts/${cartId}`,
    data: {
      data: {
        quantity: params.quantity,
        color: params.color,
        size: params.size
      }
    },
    header: {
      Authorization: `Bearer ${userStore.userInfo?.jwt}`
    }
  }).then(({ data }) => data)) as StrapiResponse<Carts[]>
}

const filterProduct = (cartsId: number[]) => {
  return useQsStringify({
    filters: {
      id: {
        $in: cartsId
      }
    },
    populate: {
      product: {
        fields: ['id'],
        populate: {
          sku: {
            populate: {
              sku: {
                fields: ['id', 'size', 'price'],
              },
            }
          }
        }
      }
    }
  })
}
type ProductPrice = {
  id: number
  attributes: {
    color: number
    size: number
    quantity: number
    product: {
      data: {
        id: number
        attributes: {
          sku: {
            sku: {
              id: number
              size: string
              price: number
            }[]
          }
        }
      }
    }
  }
}
export const getProductByCart = async (cartsId: number[]) => {
  return (await uni.request({
    method: 'GET',
    url: `${SERVER_ADDRESS}/api/carts?${filterProduct(cartsId)}`,
    header: {
      Authorization: `Bearer ${userStore.userInfo?.jwt}`
    }
  }).then(({ data }) => data)) as StrapiResponse<ProductPrice[]>
}


const delManyQuery = (cartsId: number[]) => {
  return useQsStringify({
    id: cartsId
  })
}
export const delCarts = async (cartsId: number[]) => {
  return (await uni.request({
    method: 'DELETE',
    url: `${SERVER_ADDRESS}/api/carts/del-many?${delManyQuery(cartsId)}`,
    header: {
      Authorization: `Bearer ${userStore.userInfo?.jwt}`
    }
  }).then(({ data }) => data)) as { del: number[] }
}
