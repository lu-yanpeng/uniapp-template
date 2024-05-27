<script setup lang="ts">
import CommonProductList from '@/components/product-list/index.vue'
import type { Order } from './types'
import { onMounted, ref, watch } from 'vue'
import type { Products } from '@/components/product-list/types'
import { getProductList as apiGetProductList } from '@/API/products'
import { SERVER_ADDRESS } from '@/constants'

const props = withDefaults(
  defineProps<{
    orderBy: Order
  }>(),
  {}
)

const productsData = ref<Products>([])
const getProductsData = async (page: number, filters?: string) => {
  productsData.value = []
  const { data } = await apiGetProductList(page, 20, currentActive.value.split(','), filters)

  data.map(({ attributes: { spu }, id }) => {
    productsData.value.push({
      id,
      title: spu.title,
      sales: spu.sales,
      coverSrc: SERVER_ADDRESS + spu.cover.data.attributes.url,
      min_list_price: spu.min_list_price,
      max_list_price: spu.max_list_price
    })
  })
}
onMounted(async () => {
  await getProductsData(1)
})

// 根据它的值对请求数据进行排序，还会激活对应的项目样式，比如按销量排序，按价格排序
const currentActive = ref<Order>(props.orderBy)
// 价格是正序还是倒序
const priceOrder = ref<'asc' | 'desc' | null>(null)
const orderByPrice = () => {
  if (currentActive.value === 'spu.min_list_price') {
    currentActive.value = 'spu.max_list_price:desc'
    priceOrder.value = 'desc'
  } else {
    currentActive.value = 'spu.min_list_price'
    priceOrder.value = 'asc'
  }
}
// 点击时，按照排序请求商品数据
const orderByItem = (sort: Order) => {
  currentActive.value = sort
  priceOrder.value = null
}
watch(
  () => currentActive.value,
  async () => {
    await getProductsData(1)
  }
)

defineExpose({
  currentActive,
  getProductsData
})
</script>

<template>
<!-- 调用组件的时候需要设置一个高度，否则scroll-view组件的会因为没有高度而失效 -->
<!-- 参考src/pages/home/components/page-wrap/pages/product-list/index.vue -->
  <view class="grid [grid-template-rows:auto_1fr]">
    <view
      class="flex justify-around [border-top:1px_solid_#f2f2f2] [border-bottom:1px_solid_#f2f2f2] text-[#0b333c]"
    >
      <view
        @click="orderByItem('spu.sales:desc,createdAt:desc')"
        class="px-5 py-3 text-sm"
        :class="{ 'current-active-style': currentActive === 'spu.sales:desc,createdAt:desc' }"
      >综合</view
      >
      <view
        @click="orderByItem('spu.sales:desc')"
        class="px-5 py-3 text-sm"
        :class="{ 'current-active-style': currentActive === 'spu.sales:desc' }"
      >销量</view
      >
      <view
        @click="orderByItem('createdAt:desc')"
        class="px-5 py-3 text-sm"
        :class="{ 'current-active-style': currentActive === 'createdAt:desc' }"
      >上新</view
      >
      <view
        @click="orderByPrice"
        class="px-5 py-3 text-sm sort sort-image"
        :class="{
          'current-active-style':
            currentActive === 'spu.min_list_price' || currentActive === 'spu.max_list_price:desc',
          'sort-asc-image': priceOrder === 'asc',
          'sort-desc-image': priceOrder === 'desc'
        }"
      >价格</view
      >
    </view>

    <scroll-view class="overflow-y-scroll h-full" :scroll-y="true" :show-scrollbar="false">
      <common-product-list class="py-4" :products="productsData" />
    </scroll-view>
  </view>
</template>

<style scoped>
.current-active-style {
  color: #7f0019;
}
.sort {
  background-size: 0.5625rem 1.125rem;
  background-position-x: 90%;
  background-position-y: center;
  background-repeat: no-repeat;
}
.sort.sort-image {
  background-image: url('./img/sort.png');
}
.sort.sort-asc-image {
  background-image: url('./img/sort-asc.png');
}
.sort.sort-desc-image {
  background-image: url('./img/sort-desc.png');
}
</style>
