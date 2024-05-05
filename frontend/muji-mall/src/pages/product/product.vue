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
    id: '5'
  }
)

/*const markdownText =
  '![d0b64af6-6d6d-4eb1-bca1-6d18db994a23.jpg](http://36.140.84.73:1337/uploads/d0b64af6_6d6d_4eb1_bca1_6d18db994a23_583c592b4d.jpg)\n\n![3f105ac4-d563-4e76-9c8b-7c5eddd61e9b.jpg](http://36.140.84.73:1337/uploads/3f105ac4_d563_4e76_9c8b_7c5eddd61e9b_9b7fcb5947.jpg)\n\n![d5ba7595-77a2-4aba-bd99-d060be27448c.jpg](http://36.140.84.73:1337/uploads/d5ba7595_77a2_4aba_bd99_d060be27448c_bfee73f77c.jpg)\n\n![7d538e82-1cdf-4da3-8f7d-131f612619b0.jpg](http://36.140.84.73:1337/uploads/7d538e82_1cdf_4da3_8f7d_131f612619b0_3167159ee1.jpg)\n\n![6cfef504-dd8f-4b71-8bee-909b8c8e53c0.jpg](http://36.140.84.73:1337/uploads/6cfef504_dd8f_4b71_8bee_909b8c8e53c0_1d8e6be7d5.jpg)\n\n![f9b3f0a2-e412-418b-b416-836772bdcf07.jpg](http://36.140.84.73:1337/uploads/f9b3f0a2_e412_418b_b416_836772bdcf07_bdbedd05b1.jpg)\n\n![bfdcccbf-6753-49b4-9c1f-68adaacd4537.jpg](http://36.140.84.73:1337/uploads/bfdcccbf_6753_49b4_9c1f_68adaacd4537_c414038a53.jpg)\n\n![69853db2-a2ee-4b1d-bbcc-a07993c831e0.jpg](http://36.140.84.73:1337/uploads/69853db2_a2ee_4b1d_bbcc_a07993c831e0_5de321a585.jpg)\n\n![5cc3d0ea-7c41-409f-8723-80fce8541acc.jpg](http://36.140.84.73:1337/uploads/5cc3d0ea_7c41_409f_8723_80fce8541acc_336b63d69a.jpg)\n\n![6417a9df-b870-4b85-8a7f-0e282c51fea0.jpg](http://36.140.84.73:1337/uploads/6417a9df_b870_4b85_8a7f_0e282c51fea0_11b5209477.jpg)\n\n![d960524f-2cdf-4998-a9a7-9fe161fd43a1.jpg](http://36.140.84.73:1337/uploads/d960524f_2cdf_4998_a9a7_9fe161fd43a1_14fdbff7f0.jpg)\n\n![7c83ce5e-cf28-47ca-88f1-0a1a88254893.jpg](http://36.140.84.73:1337/uploads/7c83ce5e_cf28_47ca_88f1_0a1a88254893_1e28b23071.jpg)'
const imgPathRegex = /!\[.*?]\((.*?)\)/g
// 使用正则表达式提取图片路径
const imgPaths = Array.from(markdownText.matchAll(imgPathRegex), (m) => m[1])*/

const productData = ref<Product['attributes'] | null>(null)
provide(productSymbol, readonly(productData))

onMounted(async () => {
  let id = props.id ?? '5'
  // const { data } = await getProduct(id)
  // productData.value = data.attributes
})
</script>

<template>
  <view class="grid [grid-template-rows:1fr_auto] [height:calc(100vh-44px)]">
    <view class="overflow-y-scroll h-full">
      <product-banner />
      <product-details />
      <product-main />
    </view>

    <product-tab-bar />
  </view>
</template>
