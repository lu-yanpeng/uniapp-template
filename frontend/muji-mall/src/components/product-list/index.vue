<script setup lang="ts">
withDefaults(
  defineProps<{
    products: {
      id: number
      title: string
      sales: number
      coverSrc: string
      min_list_price: number
      max_list_price: number
    }[]
  }>(),
  {
    products: () => []
  }
)

const gotoProductDetails = (id: number) => {
  uni.navigateTo({
    url: `/pages/product/product?id=${id}`
  })
}

const price = (min_list_price: number, max_list_price: number) => {
  if (min_list_price === max_list_price) {
    return `${min_list_price}`
  }
  return `${min_list_price}~${max_list_price}`
}
</script>

<template>
  <view>
    <view
      class="grid [grid-template-columns:repeat(auto-fill,minmax(10.125rem,1fr))] justify-items-center"
    >
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
            <text class="text-[#7f0019]">￥{{ price(value.min_list_price, value.max_list_price) }}</text>

            <view class="flex gap-0.5 text-[0.6875rem] text-[#999]">
              <text>月销量</text>
              <text>{{ value.sales }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view v-if="!Object.keys(products).length" class="text-center">没有更多了</view>
  </view>
</template>
