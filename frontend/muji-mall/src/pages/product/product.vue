<script setup lang="ts">
import { onMounted, ref, provide, readonly } from 'vue'
import { getProduct } from '@/API/products'
import { productSymbol } from './symbol-keys'
import type { Product } from '@/API/products'
import ProductBanner from './components/banner.vue'
import ProductDetails from './components/details/index.vue'
import ProductMain from './components/product-main.vue'
import ProductTabBar from './components/tab-bar.vue'

const props = withDefaults(
  defineProps<{
    id: string
  }>(),
  {
    id: '1'
  }
)

const productData = ref<Product['attributes'] | null>(null)
provide(productSymbol, readonly(productData))

onMounted(async () => {
  let id = props.id ?? '1'
  const { data } = await getProduct(id)
  productData.value = data.attributes
})
</script>

<template>
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
</template>
