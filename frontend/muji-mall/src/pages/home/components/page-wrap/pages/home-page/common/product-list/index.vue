<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AsideTitle from '@/components/aside-title/index.vue'
import { getProductList } from '@/API/products'
import { SERVER_ADDRESS } from '@/constants'

const props = withDefaults(
  defineProps<{
    leftText: string
    sort?: string | string[]
  }>(),
  {
    leftText: '商品列表',
    sort: ''
  }
)

const products = ref<
  {
    id: number
    title: string
    sales: number
    price: string
    coverSrc: string
  }[]
>([])
onMounted(async () => {
  const { data } = await getProductList(1, 8, props.sort)

  data.map(({ attributes, id }) => {
    // 计算商品价格，有些商品不同尺码价格不同，有些所有尺码都是一个价
    const priceSet: Set<number> = new Set()
    let price = ''
    attributes.sku.sku.map((_) => priceSet.add(_.price))
    const values = [...priceSet]
    if (priceSet.size > 1) {
      price = `${Math.min(...values)}~${Math.max(...values)}`
    } else {
      price = `${Math.max(...values)}`
    }

    products.value.push({
      id,
      title: attributes.spu.title,
      sales: attributes.spu.sales,
      price,
      coverSrc: SERVER_ADDRESS + attributes.spu.cover.data.attributes.url
    })
  })
})

const gotoProductDetails = (id: number) => {
  uni.navigateTo({
    url: `/pages/product/product?id=${id}`
  })
}
</script>

<template>
  <view>
    <aside-title :left-text="leftText" />

    <view
      class="grid [grid-template-columns:repeat(auto-fill,minmax(10.125rem,1fr))] justify-items-center"
    >
      <view v-if="!Object.keys(products).length" class="flex flex-wrap justify-around">
        <view class="mb-3" v-for="i in 6" :key="i">
          <wd-skeleton
            theme="image"
            animation="gradient "
            :row-col="[
              {
                width: '10.125rem',
                height: '10.125rem'
              }
            ]"
          />
        </view>
      </view>

      <view
        v-for="(value, key) in products"
        :key="key"
        @click="gotoProductDetails(value.id)"
        class="pb-1.5 w-[10.125rem]"
      >
        <view class="h-[10.125rem] card-border">
          <image class="w-full h-full" :src="value.coverSrc" mode="aspectFill" :lazy-load="true" />
        </view>

        <view>
          <view class="mt-1.5">
            <text class="text-xs font-bold line-clamp-2">{{ value.title }}</text>
          </view>

          <view class="flex justify-between text-xs">
            <text class="text-[#7f0019]">￥{{ value.price }}</text>

            <view class="flex gap-0.5 text-[0.6875rem] text-[#999]">
              <text>月销量</text>
              <text>{{ value.sales }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
