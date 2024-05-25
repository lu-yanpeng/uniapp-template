<script setup lang="ts">
import ProductDetails from './details/index.vue'
import ProductBanner from './banner.vue'
import ProductMain from './product-main.vue'
import ProductTabBar from './tab-bar.vue'
import { onMounted, provide, readonly, ref } from 'vue'
import { getProduct, type Product } from '@/API/products'
import { productSymbol } from '@/pages/product/symbol-keys'

const props = withDefaults(
  defineProps<{
    productId: string
  }>(),
  {}
)

const productData = ref<Product['attributes'] | null>(null)
provide(productSymbol, readonly(productData))

onMounted(async () => {
  let id = props.productId
  if (id) {
    const { data } = await getProduct(id)
    productData.value = data.attributes
  }
})

const goBack = () => {
  uni.navigateBack()
}
</script>

<template>
  <view>
    <!-- 从控制台复制的原生uni-page-head组件 -->
    <view uni-page-head-type="default">
      <view class="uni-page-head" style="background-color: rgb(248, 248, 248); color: rgb(0, 0, 0)">
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

        <view class="uni-page-head-bd">
          <view class="uni-page-head__title" style="font-size: 16px; opacity: 1">商品详情</view>
        </view>
        <view class="uni-page-head-ft"></view>
      </view>
      <view class="uni-placeholder"></view>
    </view>

    <view class="grid [grid-template-rows:1fr_auto] [height:calc(100dvh-44px)]">
      <scroll-view
        class="overflow-y-scroll h-full"
        :scroll-y="true"
        :show-scrollbar="false"
        :enable-flex="true"
      >
        <view>
          <product-banner />
          <product-details />
          <product-main />
        </view>
      </scroll-view>

      <product-tab-bar />
    </view>
  </view>
</template>

