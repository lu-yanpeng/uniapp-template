<script setup lang="ts">
// TODO:如果继续开发，sku字段需要单独设计一张表，以实现一个颜色对应多个尺码
import { inject, type Ref, ref, onMounted, unref, watch } from 'vue'
import { productSymbol } from '@/pages/product/symbol-keys'
import type { Product } from '@/API/products'
import { SERVER_ADDRESS } from '@/constants'

const props = withDefaults(
  defineProps<{
    priceRange: string
  }>(),
  {
    priceRange: 'NaN'
  }
)

defineEmits<{
  submit: [data: Record<string, any>]
}>()

const productData = inject(productSymbol, null) as Ref<Product['attributes'] | null> | null

const count = ref(1)
const currentColorImageUrl = ref<string>('')
const currentImageIndex = ref<number>(-1)
watch(
  () => currentImageIndex.value,
  (v) => {
    if (v === -1) {
      currentColorImageUrl.value = SERVER_ADDRESS + productData?.value?.spu.cover.data.attributes.url
    }
  },
  { immediate: true }
)
const choiceColor = (imageUrl: string, index: number) => {
  currentColorImageUrl.value = SERVER_ADDRESS + imageUrl
  currentImageIndex.value = index === currentImageIndex.value ? -1 : index
}

const currentPrice = ref<string>(props.priceRange)
</script>

<template>
  <view class="h-[70vh] grid grid-rows-[1fr,auto]">
    <view class="h-full overflow-y-scroll">
      <view class="flex mt-4 mb-2 mx-4 h-[5.5rem] gap-4">
        <image class="aspect-[1/1] w-[5.5rem] h-auto" :src="currentColorImageUrl" />
        <view class="flex-1 overflow-hidden font-bold">
          <view
            ><text class="text-base text-[#7f0019]">{{ currentPrice }}</text></view
          >
          <view class="pt-1 pb-2.5"><text class="text-xs text-[#585858]">库存2件</text></view>
          <view class="flex text-xs text-[#a0a0a0]">
            <text class="flex-none">已选：</text>
            <text class="flex-none">白；</text>
            <view class="flex-1 truncate">
              <text>S</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 尺码 -->
      <view class="px-4 py-4" style="border-bottom: 1px solid #ccc">
        <view class="mb-4 text-sm font-bold">
          <text>尺码</text>
        </view>

        <view class="flex gap-x-2 flex-wrap gap-y-3">
          <view
            v-for="(value, key) in productData?.sku.sku"
            :key="key"
            class="py-1 px-2.5 rounded-full min-w-14 text-center text-sm"
            style="border: 1px solid"
          >
            <text>{{ value.size }}</text>
          </view>
        </view>
      </view>

      <!-- 颜色分类 -->
      <view class="px-4 py-4" style="border-bottom: 1px solid #ccc">
        <view class="mb-4 text-sm font-bold">
          <text>颜色分类</text>
        </view>

        <view class="flex gap-x-2 flex-wrap gap-y-3">
          <view
            v-for="(value, key) in productData?.sku.color"
            :key="key"
            class="py-1 px-2.5 rounded-full min-w-14 text-center text-sm [border:1px_solid]"
            :class="{ 'color-active': key === currentImageIndex }"
            @click="choiceColor(value.cover.data.attributes.url, key)"
          >
            <text>{{ value.name }}</text>
          </view>
        </view>
      </view>

      <!-- 购买数量 -->
      <view
        class="px-4 py-4 flex justify-between items-center"
        style="border-bottom: 1px solid #ccc"
      >
        <view class="text-sm font-bold">
          <text>购买数量</text>
        </view>

        <wd-input-number v-model="count" />
      </view>

      <!-- 配送方式 -->
      <view class="px-4 py-4">
        <view class="mb-4 text-sm font-bold">
          <text>配送方式</text>
        </view>

        <view>
          <view class="flex text-center text-sm items-center mb-3">
            <view class="w-fit py-1 px-2.5 rounded-full" style="border: 1px solid">
              <text>快递寄送</text>
            </view>
            <view class="ml-3 text-[#999]">
              <text>运费：￥7</text>
            </view>
          </view>

          <view
            class="w-fit py-1 px-2.5 rounded-full text-center text-sm"
            style="border: 1px solid"
          >
            <text>门店自提</text>
          </view>
        </view>
      </view>
    </view>

    <view class="w-full py-2.5 px-5">
      <view
        @click="$emit('submit', {})"
        class="text-base py-1.5 text-white bg-black rounded-full text-center"
        >确定</view
      >
    </view>
  </view>
</template>

<style scoped lang="less">
.color-active {
  color: #7f0019;
  background-color: #f2f2f2;
  border: 1px solid #7f0019;
}
</style>
