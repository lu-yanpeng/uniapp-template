<script setup lang="ts">
import { inject, type Ref, computed, onMounted, ref } from 'vue'
import { productSymbol } from '@/pages/product/symbol-keys'
import type { Product } from '@/API/products'
import { getPriceDesc } from '@/API/products'

const priceDesc = ref<string[]>([])
onMounted(async () => {
  const { data } = await getPriceDesc()
  priceDesc.value = Array.from(data.attributes.img.matchAll(imgPathRegex), (m) => m[1])
})

const productData = inject(productSymbol, null) as Ref<Product['attributes'] | null> | null

// 产品规格
const specifications = computed(() => {
  if (!productData || !productData.value) {
    return ''
  }
  let sizes = ''
  productData.value?.sku.sku.map((sku) => {
    sizes += `${sku.size}/`
  })
  sizes = sizes.slice(0, -1)
  let colors = ''
  productData.value?.sku.color.map((__color) => {
    colors += `${__color.name}/`
  })
  colors = colors.slice(0, -1)
  return `${sizes}、${colors}`
})

const productParams = computed(() => {
  if (!productData || !productData.value) {
    return { material: '', producer: '' }
  }

  return productData.value.params
})

const imgPathRegex = /!\[.*?]\((.*?)\)/g
// 使用正则表达式提取图片路径
const mainImages = computed(() => {
  if (!productData || !productData.value) {
    return ''
  }
  return Array.from(productData.value.detail.matchAll(imgPathRegex), (m) => m[1])
})
</script>

<template>
  <view class="[border-top:0.375rem_solid_#f2f2f2]">
    <view class="px-[1.125rem]">
      <view class="py-4 text-base font-bold">
        <text>详情</text>
      </view>

      <view class="text-xs text-[#7f0019] pb-4">
        <text>消费提醒：</text>
        <text>※此商品在商品及包装完好，符合相关退换货规则的前提下支持十四天无理由退换货。</text>
      </view>
    </view>

    <view class="px-[1.125rem] [border-top:2px_solid_#7f0019]">
      <!-- 标题 -->
      <view class="text-base font-bold py-1.5">
        <text>{{ productData?.spu.title }}</text>
      </view>
      <!--      <view class="text-xs text-[#666]">
      还没添加字段
        <text>可拆卸设计方便清洗。带香薰功能，360 度摇头全方位送风</text>
      </view>-->

      <!-- 注意事项 -->
      <view class="mt-4 mb-2 pl-1 [border-left:3px_solid_#7f0019] text-base font-bold leading-none">
        <text>注意事项</text>
      </view>
      <view class="text-xs text-[#666]">
        <text class="whitespace-pre-line">
          ●深色产品在穿着过程中由于摩擦或者湿润状态下的接触，可能导致串色，洗涤时请与其他物品分开洗涤。<br />
          ●请勿长时间浸泡。<br />
          ●请勿使用滚筒式干燥机。<br />
          ●相关功能效果会随着时间推移或维护方式逐渐减弱。<br />
        </text>
      </view>

      <!-- 基本信息 -->
      <view class="text-xs [border-bottom:1px_solid_#989898] mt-4 mb-2 pb-0.5">
        <text>基本信息</text>
      </view>
      <view>
        <view class="text-xs text-[#666]">
          <text>商品材质：</text>
          <text>{{ productParams['material'] }}</text>
        </view>
        <view class="text-xs text-[#666]">
          <text>规格：</text>
          <text>{{ specifications }}</text>
        </view>
        <view class="text-xs text-[#666]">
          <text>产地：</text>
          <text>{{ productParams['producer'] }}</text>
        </view>
      </view>
    </view>

    <!-- 主图 -->
    <view class="text-[0] mt-1.5">
      <image
        v-for="url in mainImages"
        :key="url"
        :src="url"
        class="w-full h-auto"
        mode="widthFix"
        :lazy-load="true"
      />

      <image
        v-for="url in priceDesc"
        :key="url"
        :src="url"
        class="w-full h-auto"
        mode="widthFix"
        :lazy-load="true"
      />
    </view>
  </view>
</template>
