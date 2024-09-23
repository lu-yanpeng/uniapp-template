<script setup lang="ts">
import { ref } from 'vue'
import { getProduct, type Product } from '@/API/products'
import ChooseSize from '@/components/choose-size/index.vue'
import { SERVER_ADDRESS } from '@/constants'

const count = ref(0)
const loading = ref(false)
const show = ref(false)

const size = ref('')
const sizeIndex = ref(-1)
const price = ref(0)
const color = ref('')
const colorIndex = ref(-1)
const cover = ref('')

const productData = ref<Product['attributes'] | null>(null)
const openChoice = async () => {
  try {
    loading.value = true
    const { data } = await getProduct('1')
    productData.value = data.attributes
    show.value = true
  } finally {
    loading.value = false
  }
}

const onSubmit = (args: {
  color: number
  size: number
  count: number
}) => {
  const sku = productData.value?.sku
  if (!sku) {
    return
  }
  count.value = args.count

  for (const __sku of sku.sku) {
    if (__sku.id === args.size) {
      price.value = __sku.price
      size.value = __sku.size
      sizeIndex.value = __sku.id
      break
    }
  }
  for (const __col of sku.color) {
    if (__col.id === args.color) {
      color.value = __col.name
      colorIndex.value = __col.id
      cover.value = SERVER_ADDRESS + __col.cover.data.attributes.url
      break
    }
  }
}
</script>

<template>
  <view class="flex justify-center items-center px-[17px] py-[18px] bg-white">
    <wd-checkbox :model-value="true" checked-color="#7f0019" size="large"></wd-checkbox>
    <image class="w-[110px] h-[110px] bg-amber-600 mr-3" :src="cover" />
    <view class="flex-1 self-start">
      <view class="text-xs text-[#1f1f21] line-clamp-2">男士 水洗 粗棉线 一字领 九分袖 T恤</view>
      <view class="flex justify-between items-center my-2">
        <text class="text-[#7f0019] text-xs">¥{{ price }}</text>
        <wd-input-number v-model="count" disable-input />
      </view>
      <view
        class="bg-[#f2f2f2] px-[6px] py-[4px] w-fit flex items-center rounded-full"
        @click="openChoice"
      >
        <text class="text-xs text-[#999] line-clamp-2">{{ color }}；{{ size }}</text>
        <image
          class="flex-none w-[8px] h-[5px] ml-[6px] [transform:translateY(2px)]"
          src="@/pages/cart/img/dg.png"
        />
      </view>
    </view>

    <wd-overlay :show="loading">
      <view class="wrapper">
        <wd-loading :size="40" />
      </view>
    </wd-overlay>

    <choose-size
      v-model:show="show"
      :data="productData"
      :count="count"
      :size-index="sizeIndex"
      :color-index="colorIndex"
      @submit="onSubmit"
    />
  </view>
</template>

<style scoped lang="less">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
