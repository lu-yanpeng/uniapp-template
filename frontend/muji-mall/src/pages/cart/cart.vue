<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import SignIn from '@/components/goto-sign-in/index.vue'
import CartProductList from './components/cart-product-list.vue'
import { getCarts, type Carts } from '@/API/cart'
import ChooseSize from '@/components/choose-size/index.vue'

const cartList = ref<Carts[]>([])
onShow(async () => {
  const { data, meta } = await getCarts()
  cartList.value = data
})

const show = ref(false)
const currentOpenCartData = ref<{
  count: number
  sizeIndex: number
  colorIndex: number
  product: Carts['attributes']['product']['data'] | null
}>({
  count: 0,
  sizeIndex: -1,
  colorIndex: -1,
  product: null
})
const onChooseSize = (args: {
  count: number
  sizeIndex: number
  colorIndex: number
  product: Carts['attributes']['product']['data']
}) => {
  show.value = true
  currentOpenCartData.value = args
}
</script>

<template>
  <sign-in>
    <view class="bg-[#f2f2f2] h-full grid [grid-template-rows:1fr_50px]">
      <view class="overflow-y-auto">
        <template v-if="cartList.length">
          <cart-product-list
            v-for="cart in cartList"
            :key="cart.id"
            :product="cart.attributes.product.data"
            :size-index="cart.attributes.size"
            :color-index="cart.attributes.color"
            :count="cart.attributes.quantity"
            @choose-size="onChooseSize"
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
      <view
        class="bg-white h-[50px] [border-width:0.8px_0_0] border-[#ccc] border-solid px-4 flex items-center justify-between"
      >
        <view class="text-[#7f0019]">
          <text class="text-xs text-[#1f1f21] mr-[4px]">合计</text>
          <text class="text-[10px]">¥</text><text class="text-[18px]">0</text>
        </view>
        <view
          class="rounded-full bg-black text-white text-[13px] px-[34px] py-[10px] flex justify-center"
          >结算</view
        >
      </view>

      <choose-size
        v-model:show="show"
        :data="currentOpenCartData.product?.attributes"
        :count="currentOpenCartData.count"
        :size-index="currentOpenCartData.sizeIndex"
        :color-index="currentOpenCartData.colorIndex"
      />
    </view>
  </sign-in>
</template>
