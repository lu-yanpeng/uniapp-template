<script setup lang="ts">
import { ref, computed } from 'vue'
import { getProduct, type Product } from '@/API/products'
import { SERVER_ADDRESS } from '@/constants'
import type { Carts } from '@/API/cart'

type __CartProduct = Carts['attributes']['product']['data']
const props = withDefaults(
  defineProps<{
    count: number
    sizeIndex: number
    colorIndex: number
    product: __CartProduct | null
  }>(),
  {
    count: 1,
    sizeIndex: -1,
    colorIndex: -1,
    product: null
  }
)

const emits = defineEmits<{
  chooseSize: [
    args: {
      count: number
      sizeIndex: number
      colorIndex: number
      product: __CartProduct
    }
  ]
}>()

const _count = ref(props.count)
const loading = ref(false)
const show = ref(false)

const productData = ref<Product['attributes'] | null>(null)
const openChoice = async () => {
  try {
    loading.value = true
    const { data } = await getProduct('1')
    productData.value = data.attributes
    show.value = true
  } finally {
    loading.value = false
  }
}

/*const onSubmit = (args: {
  color: number
  size: number
  count: number
}) => {
  const sku = productData.value?.sku
  if (!sku) {
    return
  }
  _count.value = args.count

  for (const __sku of sku.sku) {
    if (__sku.id === args.size) {
      price.value = __sku.price
      size.value = __sku.size
      _sizeIndex.value = __sku.id
      break
    }
  }
  for (const __col of sku.color) {
    if (__col.id === args.color) {
      color.value = __col.name
      _colorIndex.value = __col.id
      cover.value = SERVER_ADDRESS + __col.cover.data.attributes.url
      break
    }
  }
}*/

const title = computed(() => {
  if (props.product) {
    return props.product.attributes.spu.title
  }
  return ''
})

const returnCol = (key: 'cover' | 'name'): string => {
  if (props.product) {
    for (const col of props.product.attributes.sku.color) {
      if (col.id === props.colorIndex) {
        if (key === 'cover') {
          return SERVER_ADDRESS + col.cover.data.attributes.url
        }
        return col.name
      }
    }
    return ''
  }
  return ''
}
const cover = computed(() => {
  return returnCol('cover')
})
const color = computed(() => {
  return returnCol('name')
})

const returnSize = (key: 'price' | 'size'): string | number => {
  const _ = key === 'price' ? 0 : ''
  if (props.product) {
    for (const _size of props.product.attributes.sku.sku) {
      if (_size.id === props.sizeIndex) {
        return _size[key]
      }
    }
    return _
  }
  return _
}
const price = computed(() => {
  return returnSize('price') as number
})
const size = computed(() => {
  return returnSize('size') as string
})
</script>

<template>
  <view class="flex justify-center items-center px-[17px] py-[18px] bg-white">
    <wd-checkbox :model-value="true" checked-color="#7f0019" size="large"></wd-checkbox>
    <image class="w-[110px] h-[110px] bg-amber-600 mr-3" :src="cover" />
    <view class="flex-1 self-start">
      <view class="text-xs text-[#1f1f21] line-clamp-2">{{ title }}</view>
      <view class="flex justify-between items-center my-2">
        <text class="text-[#7f0019] text-xs">¥{{ price }}</text>
        <wd-input-number v-model="_count" disable-input />
      </view>
      <view
        class="bg-[#f2f2f2] px-[6px] py-[4px] w-fit flex items-center rounded-full"
        @click="$emit('chooseSize', props)"
      >
        <text class="text-xs text-[#999] line-clamp-2">{{ color }}；{{ size }}</text>
        <image
          class="flex-none w-[8px] h-[5px] ml-[6px] [transform:translateY(2px)]"
          src="@/pages/cart/img/dg.png"
        />
      </view>
    </view>
  </view>
</template>
