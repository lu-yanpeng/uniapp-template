<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import AsideTitle from '@/components/aside-title/index.vue'
import { getProductList } from '@/API/products'
import { SERVER_ADDRESS } from '@/constants'
import type { Order } from '@/pages/product/types'
import CommonProductList from '@/components/product-list/index.vue'
import type { Products } from '@/components/product-list/types'

const props = withDefaults(
  defineProps<{
    leftText: string
    sort: Order
  }>(),
  {
    leftText: '商品列表',
    sort: 'createdAt:desc'
  }
)

const products = ref<Products>([])
const orderBy = computed(() => props.sort.split(','))
onMounted(async () => {
  const { data } = await getProductList(1, 8, orderBy.value)

  data.map(({ attributes: { spu }, id }) => {
    products.value.push({
      id,
      title: spu.title,
      sales: spu.sales,
      coverSrc: SERVER_ADDRESS + spu.cover.data.attributes.url,
      min_list_price: spu.min_list_price,
      max_list_price: spu.max_list_price
    })
  })
})

const showMore = () => {
  uni.navigateTo({
    url: `/pages/product/product?orderBy=${orderBy.value}`
  })
}
</script>

<template>
  <view>
    <aside-title :left-text="leftText" @more="showMore" />

    <common-product-list :products="products" />
  </view>
</template>
