<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import SignIn from '@/components/goto-sign-in/index.vue'
import CartProductList from './components/cart-product-list.vue'
import { getCarts, type Carts, updateCart, getProductByCart } from '@/API/cart'
import ChooseSize from '@/components/choose-size/index.vue'
import { useToast } from 'wot-design-uni'
import LoadingComps from '@/components/loading/index.vue'
import { useUserStore } from '@/store/user'

const toast = useToast()
const userStore = useUserStore()
watch(() => userStore.userInfo, (userInfo) => {
  if (userInfo === null) {
    cartList.value = []
    selectedSet.value.clear()
  }
})

const cartList = ref<Carts[]>([])
const updateCartsList = async () => {
  const { data, meta } = await getCarts()
  cartList.value = data
}
onShow(async () => {
  await updateCartsList()
})

const show = ref(false)
const currentOpenCartData = ref<{
  count: number
  sizeIndex: number
  colorIndex: number
  product: Carts['attributes']['product']['data'] | null
  cartId: number
}>({
  count: 0,
  sizeIndex: -1,
  colorIndex: -1,
  product: null,
  cartId: -1
})
const onChooseSize = (
  args: {
    count: number
    sizeIndex: number
    colorIndex: number
    product: Carts['attributes']['product']['data']
  },
  cartId: number
) => {
  show.value = true
  currentOpenCartData.value = {
    ...args,
    cartId
  }
}

const changeCart = async (
  args: {
    color: number
    size: number
    count: number
    cartId: number
  },
  resolve: (v: boolean) => void
) => {
  loading.value = true
  try {
    await updateCart(args.cartId, {
      quantity: args.count,
      size: args.size,
      color: args.color
    })
    resolve(true)
    await updateCartsList()
  } catch (e) {
    resolve(false)
    toast.warning('未知错误')
  } finally {
    loading.value = false
  }
}

const loading = ref(false)
const onModifyTotal = async (cartId: number, total: number) => {
  loading.value = true
  try {
    await updateCart(cartId, {
      quantity: total
    })
    // 更新购物车列表，如果不更新，打开选择颜色界面还会保留上次的颜色
    await updateCartsList()
    await updateSelectedProduct()
  } catch (e) {
    toast.warning('未知错误')
  } finally {
    loading.value = false
  }
}

const setup = ref(false)

const CART_SELECTED = userStore.CART_SELECTED_KEY
const selectedSet = ref<Set<number>>(new Set())
const updateSelectedProduct = async () => {
  loading.value = true
  try {
    const { data } = await getProductByCart(Array.from(selectedSet.value.values()))
    const result: typeof selectedProduct.value = []
    data.forEach(({ attributes, id: cartId }) => {
      const count = attributes.quantity
      const size = attributes.size
      let price: number = 0
      for (const sku of attributes.product.data.attributes.sku.sku) {
        if (sku.id === size) {
          price = sku.price
          break
        }
      }
      result.push({
        cartId,
        price,
        count
      })
    })
    selectedProduct.value = result
  } catch (e) {
    toast.error('未知错误')
  } finally {
    loading.value = false
  }
}
onMounted(async () => {
  if (localStorage.getItem(CART_SELECTED)) {
    selectedSet.value = new Set(JSON.parse(localStorage.getItem(CART_SELECTED) as string))
    await updateSelectedProduct()
  }
})

// 保存当前用户已勾选的商品id到本地
const onSelect = async (cartId: number, state: boolean) => {
  if (state) {
    selectedSet.value.add(cartId)
    await updateSelectedProduct()
  } else {
    selectedSet.value.delete(cartId)
    const index = selectedProduct.value.findIndex((product) => cartId === product.cartId)
    selectedProduct.value.splice(index, 1)
  }
  localStorage.setItem(CART_SELECTED, JSON.stringify(Array.from(selectedSet.value.values())))
}

// 已勾选商品对应的价格和数量
const selectedProduct = ref<{
  cartId: number
  price: number
  count: number
}[]>([])
const productTotal = computed<number>(() => {
  let __total = 0
  selectedProduct.value.forEach((product) => {
    __total += product.price * product.count
  })
  return __total
})
</script>

<template>
  <sign-in>
    <view class="bg-[#f2f2f2] h-full grid [grid-template-rows:44px_1fr_50px]">
      <view class="text-center h-[44px] flex justify-center items-center relative">
        <text class="text-base font-bold">购物车</text>
        <view
          class="absolute text-sm translate-y-px [right:18px] text-[#7f0019]"
          @click="setup = !setup"
        >
          <text v-show="!setup">管理</text>
          <text v-show="setup">完成</text>
        </view>
      </view>
      <view class="overflow-y-auto">
        <template v-if="cartList.length">
          <cart-product-list
            v-for="cart in cartList"
            :key="cart.id"
            :selected="selectedSet.has(cart.id)"
            :product="cart.attributes.product.data"
            :size-index="cart.attributes.size"
            :color-index="cart.attributes.color"
            :count="cart.attributes.quantity"
            @choose-size="(args) => onChooseSize(args, cart.id)"
            @modify-total="(total) => onModifyTotal(cart.id, total)"
            @select="(state) => onSelect(cart.id, state)"
          />
        </template>

        <view
          v-else
          class="fixed top-[45%] left-1/2 [transform:translate(-50%,-50%)] flex items-center text-[#585858] text-sm"
        >
          <view class="w-[21px] h-[1px] bg-[#585858]"></view>
          <view class="mx-2.5">暂无商品</view>
          <view class="w-[21px] h-[1px] bg-[#585858]"></view>
        </view>
      </view>
      <view class="bg-white h-[50px] [border-width:0.8px_0_0] border-[#ccc] border-solid px-4">
        <view v-show="!setup" class="h-full flex items-center justify-between">
          <view class="text-[#7f0019]">
            <text class="text-xs text-[#1f1f21] mr-[4px]">合计</text>
            <text class="text-[10px]">¥</text><text class="text-[18px]">{{ productTotal }}</text>
          </view>
          <view
            class="rounded-full bg-black text-white text-[13px] px-[34px] py-[10px] flex justify-center"
            >结算</view
          >
        </view>

        <view v-show="setup" class="h-full flex items-center justify-end">
          <view
            class="rounded-full text-[13px] px-[34px] py-[10px] flex justify-center [border:1px_solid_#7f0019] text-[#7f0019]"
            >删除</view
          >
        </view>
      </view>

      <choose-size
        v-model:show="show"
        :data="currentOpenCartData.product?.attributes"
        :count="currentOpenCartData.count"
        :size-index="currentOpenCartData.sizeIndex"
        :color-index="currentOpenCartData.colorIndex"
        :cart-id="currentOpenCartData.cartId"
        @submit="changeCart"
      />

      <loading-comps :show="loading" :z-index="1001" />
    </view>
  </sign-in>
</template>
