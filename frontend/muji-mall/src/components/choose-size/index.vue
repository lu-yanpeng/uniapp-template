<script setup lang="ts">
import Popup from '@/components/popup/index.vue'
import { ref, watch } from 'vue'
import { SERVER_ADDRESS } from '@/constants'
import type { Product } from '@/API/products'
import { useToast } from 'wot-design-uni'
import { useUserStore } from '@/store/user'

const toast = useToast()
const userStore = useUserStore()

const props = withDefaults(
  defineProps<{
    show: boolean
    data: Product['attributes'] | null
    count: number
    sizeIndex: number
    colorIndex: number
  }>(),
  {
    show: false,
    data: null,
    count: 1,
    sizeIndex: -1,
    colorIndex: -1
  }
)
type SubmitArgs = {
  color: number
  size: number
  count: number
}
const emits = defineEmits<{
  close: [args: SubmitArgs]
  'update:show': [state: boolean]
  submit: [args: SubmitArgs, (value: (boolean | PromiseLike<boolean>)) => void]
}>()

const visible = ref(false)
const productCount = ref<number>(1)
const currentColorIndex = ref<number>(-1)
const currentSizeIndex = ref<number>(-1)

const currentPrice = ref<string>('infinity')
const currentSize = ref('')
const currentColor = ref('')

const sku = new Map<number, Product['attributes']['sku']['sku'][number]>()
const sku_color = new Map<number, Product['attributes']['sku']['color'][number]>()

// 每次打开前初始化数据
watch(
  () => props.show,
  (v) => {
    if (v) {
      visible.value = true
      productCount.value = props.count
      currentColorIndex.value = props.colorIndex
      currentSizeIndex.value = props.sizeIndex

      const productData = props.data
      if (productData) {
        productData.sku?.sku.map((v) => {
          sku.set(v.id, v)
        })
        productData.sku?.color.map((v) => {
          sku_color.set(v.id, v)
        })
        // 未选择商品颜色时设置默认封面
        if (props.colorIndex === -1) {
          currentColorImageUrl.value = SERVER_ADDRESS + productData?.spu.cover.data.attributes.url
        } else {
          const __col = sku_color.get(props.colorIndex)
          // @ts-ignore
          currentColorImageUrl.value = SERVER_ADDRESS + __col.cover.data.attributes.url
          currentColor.value = __col?.name as string
        }
        // 未选择尺寸时设置默认价格
        if (props.sizeIndex === -1) {
          const spu = productData.spu
          currentPrice.value = `${spu.min_list_price}~${spu.max_list_price}`
        } else {
          const __sku = sku.get(props.sizeIndex)
          currentPrice.value = String(__sku?.price)
          currentSize.value = __sku?.size as string
        }
      }
      return
    }
    setTimeout(() => {
      productCount.value = 1
      currentColorIndex.value = -1
      currentSizeIndex.value = -1
      currentPrice.value = 'infinity'
      currentSize.value = ''
      currentColor.value = ''
      sku.clear()
    }, 200)
  }
)

const onClose = () => {
  emits('close', {
    color: currentColorIndex.value,
    size: currentSizeIndex.value,
    count: productCount.value
  })
  visible.value = false
  emits('update:show', false)
}
const onSubmit = async () => {
  if (currentSizeIndex.value === -1) {
    toast.show('请选择尺寸')
    return
  }
  if (currentColorIndex.value === -1) {
    toast.show('请选择颜色')
    return
  }
  if (!userStore.userInfo) {
    toast.warning('请先登录')
    await uni.navigateTo({
      url: '/pages/login/login'
    })
    return
  }
  const result = await new Promise<boolean>((resolve) => {
    emits(
      'submit',
      {
        color: currentColorIndex.value,
        size: currentSizeIndex.value,
        count: productCount.value
      },
      resolve
    )
  })
  if (result) {
    onClose()
  }
}

const currentColorImageUrl = ref<string>('')
// 选择颜色时同时设置商品封面
const choiceColor = (skuCol: {
  id: number
  uid: string
  name: string
  cover: {
    data: {
      attributes: {
        url: string
      }
    }
  }
}) => {
  currentColorIndex.value = skuCol.id === currentColorIndex.value ? -1 : skuCol.id

  // 如果没有选择任何颜色，就显示商品默认封面
  if (currentColorIndex.value === -1) {
    currentColor.value = ''
    currentColorImageUrl.value = SERVER_ADDRESS + props.data?.spu.cover.data.attributes.url
  } else {
    currentColor.value = skuCol.name
    currentColorImageUrl.value = SERVER_ADDRESS + skuCol.cover.data.attributes.url
  }
}

// 选择尺寸时同时设置价格
const choiceSize = (skuObj: {
  id: number
  size: string
  color: string
  inventory: number
  price: number
}) => {
  currentSizeIndex.value = skuObj.id === currentSizeIndex.value ? -1 : skuObj.id

  // 如果没有选择任何尺寸，就显示可能的价格
  if (currentSizeIndex.value === -1) {
    const spu = props?.data?.spu
    if (spu) {
      currentPrice.value = `${spu.min_list_price}~${spu.max_list_price}`
    }
    currentSize.value = ''
  } else {
    currentPrice.value = String(skuObj.price)
    currentSize.value = skuObj.size
  }
}
</script>

<template>
  <popup v-model="visible" @update:modelValue="onClose">
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
              <text class="flex-none">{{ currentColor }}；</text>
              <view class="flex-1 truncate">
                <text>{{ currentSize }}</text>
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
              v-for="value in data?.sku.sku"
              :key="value.id"
              class="py-1 px-2.5 rounded-full min-w-14 text-center text-sm"
              :class="{ 'color-active': value.id === currentSizeIndex }"
              style="border: 1px solid"
              @click="choiceSize(value)"
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
              v-for="value in data?.sku.color"
              :key="value.id"
              class="py-1 px-2.5 rounded-full min-w-14 text-center text-sm [border:1px_solid]"
              :class="{ 'color-active': value.id === currentColorIndex }"
              @click="choiceColor(value)"
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

          <wd-input-number v-model="productCount" />
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
          @click="onSubmit"
          class="text-base py-1.5 text-white bg-black rounded-full text-center"
          >确定</view
        >
      </view>
    </view>
    <wd-toast />
  </popup>
</template>

<style scoped lang="less">
.color-active {
  color: #7f0019;
  background-color: #f2f2f2;
  border: 1px solid #7f0019;
}
</style>
