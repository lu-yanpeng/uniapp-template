<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Order } from '@/pages/product/types'
import { getProductList as apiGetProductList } from '@/API/products/index'
import CommonProductList from '@/components/product-list/index.vue'
import type { Products } from '@/components/product-list/types'
import { SERVER_ADDRESS } from '@/constants'

const props = withDefaults(
  defineProps<{
    orderBy: Order
  }>(),
  {}
)

const productsData = ref<Products>([])
const getProductsData = async (page: number, filters?: string) => {
  productsData.value = []
  const { data } = await apiGetProductList(page, 20, currentActive.value.split(','), filters)

  data.map(({ attributes: { spu }, id }) => {
    productsData.value.push({
      id,
      title: spu.title,
      sales: spu.sales,
      coverSrc: SERVER_ADDRESS + spu.cover.data.attributes.url,
      min_list_price: spu.min_list_price,
      max_list_price: spu.max_list_price
    })
  })
}
onMounted(async () => {
  await getProductsData(1)
})

const goBack = () => {
  uni.navigateBack()
}

const searchName = ref('')
const searchProduct = async () => {
  await getProductsData(1, searchName.value)
}

// 根据它的值对请求数据进行排序，还会激活对应的项目样式，比如按销量排序，按价格排序
const currentActive = ref<Order>(props.orderBy)
// 价格是正序还是倒序
const priceOrder = ref<'asc' | 'desc' | null>(null)
const orderByPrice = () => {
  if (currentActive.value === 'spu.min_list_price') {
    currentActive.value = 'spu.max_list_price:desc'
    priceOrder.value = 'desc'
  } else {
    currentActive.value = 'spu.min_list_price'
    priceOrder.value = 'asc'
  }
}
// 点击时，按照排序请求商品数据
const orderByItem = (sort: Order) => {
  currentActive.value = sort
  priceOrder.value = null
}
watch(
  () => currentActive.value,
  async () => {
    await getProductsData(1)
  }
)
</script>

<template>
  <view class="grid [grid-template-rows:auto_auto_1fr] h-screen">
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

    <view
      class="flex justify-around [border-top:1px_solid_#f2f2f2] [border-bottom:1px_solid_#f2f2f2] text-[#0b333c]"
    >
      <view
        @click="orderByItem('spu.sales:desc,createdAt:desc')"
        class="px-5 py-3 text-sm"
        :class="{ 'current-active-style': currentActive === 'spu.sales:desc,createdAt:desc' }"
        >综合</view
      >
      <view
        @click="orderByItem('spu.sales:desc')"
        class="px-5 py-3 text-sm"
        :class="{ 'current-active-style': currentActive === 'spu.sales:desc' }"
        >销量</view
      >
      <view
        @click="orderByItem('createdAt:desc')"
        class="px-5 py-3 text-sm"
        :class="{ 'current-active-style': currentActive === 'createdAt:desc' }"
        >上新</view
      >
      <view
        @click="orderByPrice"
        class="px-5 py-3 text-sm sort sort-image"
        :class="{
          'current-active-style':
            currentActive === 'spu.min_list_price' || currentActive === 'spu.max_list_price:desc',
          'sort-asc-image': priceOrder === 'asc',
          'sort-desc-image': priceOrder === 'desc'
        }"
        >价格</view
      >
    </view>

    <scroll-view class="overflow-y-scroll h-full" :scroll-y="true" :show-scrollbar="false">
      <common-product-list class="py-4" :products="productsData" />
    </scroll-view>
  </view>
</template>

<style scoped>
.current-active-style {
  color: #7f0019;
}
.sort {
  background-size: 0.5625rem 1.125rem;
  background-position-x: 90%;
  background-position-y: center;
  background-repeat: no-repeat;
}
.sort.sort-image {
  background-image: url('@/pages/product/img/sort.png');
}
.sort.sort-asc-image {
  background-image: url('@/pages/product/img/sort-asc.png');
}
.sort.sort-desc-image {
  background-image: url('@/pages/product/img/sort-desc.png');
}
</style>
