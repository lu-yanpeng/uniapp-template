<script setup lang="ts">
import { inject, ref, computed } from 'vue'
import type { Ref } from 'vue'
import { productSymbol } from '@/pages/product/symbol-keys'
import type { Product } from '@/API/products'
import { useAddressStore } from '@/store/address'
import Choice from './choice.vue'
import SetAddressComps from '@/components/set-address/index.vue'
import Popup from '@/components/popup/index.vue'
import PopupProductDetail from './popup__product-detail.vue'
import Recommend from './recommend.vue'
import { SERVER_ADDRESS } from '@/constants'

defineEmits<{
  addCart: []
}>()

const addressStore = useAddressStore()
const productData = inject(productSymbol, null) as Ref<Product['attributes'] | null> | null
const priceRange = computed(() => {
  if (!productData || !productData.value) {
    return ''
  }

  const { min_list_price, max_list_price } = productData.value.spu
  if (min_list_price === max_list_price) {
    return `${min_list_price}`
  } else {
    return `${min_list_price}~${max_list_price}`
  }
})

const show = ref<boolean>(false)

const addressShow = ref<boolean>(false)
</script>

<template>
  <view>
    <!-- 标题 -->
    <view class="py-4 px-[1.125rem]">
      <view class="flex justify-between items-baseline">
        <view class="font-bold">
          <text class="text-sm">¥ </text>
          <text class="text-xl">{{ priceRange }}</text>
        </view>
        <view class="text-[#585858] text-xs">
          <text>月销量{{ productData?.spu.sales }}，</text>
          <text>{{ 0 }}人想买</text>
        </view>
      </view>

      <view class="mt-2.5">
        <text class="text-lg font-bold">{{ productData?.spu?.title }}</text>
      </view>
    </view>
    <!-- 地址 -->
    <view class="py-4" style="border-top: 0.375rem solid #f2f2f2">
      <choice label="发货" class="px-[1.125rem]" @choice="addressShow = true">
        <text class="whitespace-nowrap">配送至：{{ addressStore.prefecture }} | 普通快递￥7</text>
      </choice>
    </view>
    <!-- 尺码 -->
    <view class="py-4" style="border-top: 1px solid #f2f2f2">
      <view class="px-[1.125rem]">
        <choice label="选择" @choice="$emit('addCart')">
          <text>选择尺码 颜色</text>
        </choice>
        <view class="flex pl-[3.125rem] items-center h-10">
          <view class="flex-1 overflow-hidden" @click="$emit('addCart')">
            <scroll-view
              class="flex whitespace-nowrap"
              :scroll-x="true"
              :show-scrollbar="false"
              :enable-flex="true"
            >
              <view
                v-for="(value, key) in productData?.sku.color"
                :key="key"
                class="inline-flex px-1.5"
              >
                <image
                  class="w-[25px] aspect-[1/1] h-full"
                  :src="SERVER_ADDRESS + value.cover.data.attributes.url"
                />
              </view>
            </scroll-view>
          </view>

          <text
            @click="$emit('addCart')"
            class="text-xs text-[#585858] whitespace-nowrap py-1.5 px-2 h-fit bg-[#f2f2f2] rounded-full"
            >共{{ productData?.sku.color.length }}种颜色可选</text
          >
        </view>
      </view>
    </view>
    <!-- 参数 -->
    <view class="py-4" style="border-top: 1px solid #f2f2f2">
      <choice label="产品参数" class="px-[1.125rem]" @choice="show = true" />
    </view>
    <!-- 推荐商品 -->
    <recommend />

    <!-- 弹出框，查看产品参数 -->
    <popup v-model="show">
      <popup-product-detail @submit="show = false" />
    </popup>

    <!-- 弹出框，设置地址 -->
    <set-address-comps v-model="addressShow" />
  </view>
</template>
