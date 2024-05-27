<script setup lang="ts">
import { inject, ref } from 'vue'
import type { Ref } from 'vue'
import { currentNavSymbol } from '@/pages/home/symbol-keys'
import type { CurrentNav } from '@/pages/home/types'

const currentNav = inject(currentNavSymbol, ref('home')) as Ref<CurrentNav>
const pageSwitch = (name: CurrentNav) => {
  currentNav.value = name
}

const navItem: { id: CurrentNav; name: string }[] = [
  {
    id: 'home',
    name: '首页'
  },
  {
    id: 'productList',
    name: '全部商品'
  },
  {
    id: 'b',
    name: '折扣专区'
  },
  {
    id: 'c',
    name: '良品榜单'
  },
  {
    id: 'newProduct',
    name: '新商品'
  },
  {
    id: 'e',
    name: '视频'
  }
]

const onSearch = () => {
  uni.navigateTo({
    url: '/pages/product/product?orderBy=spu.sales:desc,createdAt:desc'
  })
}
</script>

<template>
  <scroll-view
    class="flex whitespace-nowrap h-11 text-base"
    :scroll-x="true"
    :show-scrollbar="false"
    :enable-flex="true"
  >
    <view class="inline-flex ml-0.5" @click="onSearch">
      <image src="./img/search.png" class="w-11 h-11" />
    </view>

    <!-- align-top 让这些元素对齐 -->
    <view
      v-for="item in navItem"
      :key="item.id"
      class="inline-flex align-top h-full items-center"
    >
      <view class="mx-2 px-1" @click="pageSwitch(item.id)">
        <text :class="{ activate: currentNav === item.id }">{{ item.name }}</text>
      </view>
    </view>

    <!-- 在小程序设置最后一个元素的margin会造成塌陷，要空出距离可以这样做 -->
    <view class="inline-flex align-top h-full">
      <view class="w-1.5"></view>
    </view>
  </scroll-view>
</template>

<style scoped lang="less">
.activate {
  @apply text-xl font-bold;
}
</style>
