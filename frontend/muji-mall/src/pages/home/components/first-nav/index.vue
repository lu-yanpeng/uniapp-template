<script setup lang="ts">
import { inject, ref } from 'vue'
import type { Ref } from 'vue'
import { currentNavSymbol } from '../../symbol-keys'
import type { CurrentNav } from '../../types'

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
    id: 'a',
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
    id: 'd',
    name: '新商品'
  },
  {
    id: 'e',
    name: '视频'
  }
]
</script>

<template>
  <scroll-view
    class="flex whitespace-nowrap h-11 text-base"
    :scroll-x="true"
    :show-scrollbar="false"
    :enable-flex="true"
  >
    <view class="inline-flex ml-0.5">
      <image src="./img/search.png" class="w-11 h-11" />
    </view>

    <!-- align-top 让这些元素对齐 -->
    <view v-for="item in navItem" :key="item.id" class="inline-flex align-top h-full items-center">
      <view class="mx-2 px-1" @click="pageSwitch(item.id)">
        <text :class="{ activate: currentNav === item.id, 'mr-1.5': item.id === 'e' }">{{
          item.name
        }}</text>
      </view>
    </view>
  </scroll-view>
</template>

<style scoped lang="less">
.activate {
  @apply text-xl font-bold;
}
</style>
