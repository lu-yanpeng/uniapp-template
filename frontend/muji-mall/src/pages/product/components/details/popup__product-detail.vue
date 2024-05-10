<script setup lang="ts">
import { inject, type Ref, ref, unref, watch } from 'vue'
import { productSymbol } from '@/pages/product/symbol-keys'
import type { Product } from '@/API/products'

const productData = inject(productSymbol, null) as Ref<Product['attributes'] | null> | null

defineEmits<{
  submit: []
}>()

const colors = ref<string>('')
const sizes = ref<string>('')
watch(() => productData?.value, (v) => {
  if (!unref(productData)) {
    return
  }
  v?.sku.color.map((color) => {
    colors.value += `${color.name} `
  })
  v?.sku.sku.map((sku) => {
    sizes.value += `${sku.size} `
  })
}, {immediate: true, once: true})

// 因为数据库的枚举类型不支持中文，获取到数据之后需要手动把对应key转换成中文
const paramsLabel: any = {
  gender: '性别',
  code: '品番',
  ref: '货号',
  season: '季节',
  material: '素材',
  producer: '产地'
}
</script>

<template>
  <view class="max-h-[60vh] grid grid-rows-[auto,1fr,auto]">
    <view class="text-center py-3.5">
      <text class="text-base font-bold">产品参数</text>
    </view>

    <view class="overflow-y-scroll">
      <view class="px-4 py-3.5 flex text-sm" style="border-bottom: 1px solid #ccc">
        <view class="w-[5.5rem] flex-none"><text class="text-[#585858]">颜色：</text></view>
        <view class="flex-1 overflow-hidden">
          <text class="break-words">{{ colors }}</text>
        </view>
      </view>
      <view class="px-4 py-3.5 flex text-sm" style="border-bottom: 1px solid #ccc">
        <view class="w-[5.5rem] flex-none"><text class="text-[#585858]">尺码：</text></view>
        <view class="flex-1 overflow-hidden">
          <text class="break-words">{{ sizes }}</text>
        </view>
      </view>

      <view v-for="i in productData?.params.other" :key="i.key" class="px-4 py-3.5 flex text-sm" style="border-bottom: 1px solid #ccc">
        <view class="w-[5.5rem] flex-none"><text class="text-[#585858]">{{ paramsLabel[i.key] }}：</text></view>
        <view class="flex-1 overflow-hidden">
          <text class="break-words">{{ i.value }}</text>
        </view>
      </view>
    </view>

    <view class="w-full py-2.5 px-5">
      <view
        @click="$emit('submit')"
        class="text-base py-1.5 text-white bg-black rounded-full text-center"
        >确定</view
      >
    </view>
  </view>
</template>
