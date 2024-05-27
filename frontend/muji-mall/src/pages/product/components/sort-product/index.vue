<script setup lang="ts">
import { ref } from 'vue'
import type { Order } from '@/components/product-list-and-sort/types'
import CompProductListAndSort from '@/components/product-list-and-sort/index.vue'

withDefaults(
  defineProps<{
    orderBy: Order
  }>(),
  {}
)

const productListRef = ref<InstanceType<typeof CompProductListAndSort> | null>(null)
const goBack = () => {
  uni.navigateBack()
}

const searchName = ref('')
const searchProduct = async () => {
  await productListRef.value?.getProductsData(1, searchName.value)
}
</script>

<template>
  <view class="h-screen">
    <view class="h-[44px] flex items-center [padding:0_3px]">
      <view class="uni-page-head-hd" @click="goBack">
        <view class="uni-page-head-btn">
          <svg width="26" height="26" viewBox="0 0 32 32">
            <path
              d="M21.781 7.844l-9.063 8.594 9.063 8.594q0.25 0.25 0.25 0.609t-0.25 0.578q-0.25 0.25-0.578 0.25t-0.578-0.25l-9.625-9.125q-0.156-0.125-0.203-0.297t-0.047-0.359q0-0.156 0.047-0.328t0.203-0.297l9.625-9.125q0.25-0.25 0.578-0.25t0.578 0.25q0.25 0.219 0.25 0.578t-0.25 0.578z"
              fill="#000000"
            ></path>
          </svg>
        </view>
      </view>

      <view class="flex-1 flex items-center bg-[#f2f2f2] rounded-full px-[2px] ml-[6px]">
        <image
          src="/src/pages/product/img/search.png"
          class="w-[29px] h-[29px] [transform:translate(4px,1px)]"
        />
        <input
          v-model.trim="searchName"
          confirm-type="search"
          placeholder="输入商品名或货号"
          placeholder-style="font-size: 14px;"
        />
        <image
          v-show="searchName"
          src="/src/pages/product/img/clear.png"
          class="w-[30px] h-[30px]"
          @click="searchName = ''"
        />
      </view>

      <view class="flex-none text-center ml-[15px]">
        <image src="./img/category.png" class="w-[18px] h-[12px]" />
        <view class="text-xs">分类</view>
      </view>

      <view
        @click="searchProduct"
        class="flex-none text-sm bg-black text-white [padding:4px_16px] rounded-full ml-[15px] mr-[14px]"
        >搜索</view
      >
    </view>

    <comp-product-list-and-sort
      ref="productListRef"
      class="[height:calc(100vh-44px)]"
      :order-by="orderBy"
    />
  </view>
</template>
