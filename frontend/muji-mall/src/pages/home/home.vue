<script setup lang="ts">
import { ref, provide, defineAsyncComponent } from 'vue'
import Toolbar from './components/toolbar/index.vue'
import FirstNav from './components/first-nav/index.vue'
import { currentNavSymbol } from './symbol-keys'
import type { CurrentNav } from './types'

const currentNav = ref<CurrentNav>('home')
provide(currentNavSymbol, currentNav)

// #ifdef WEB
// @ts-ignore
// eslint-disable-next-line no-redeclare, no-import-assign
const HomePage = defineAsyncComponent(() => import('./components/home-page/index.vue'))
// @ts-ignore
// eslint-disable-next-line no-redeclare, no-import-assign
const OtherPage = defineAsyncComponent(() => import('./components/other-page/index.vue'))
// #endif

// #ifdef MP-WEIXIN
// 放到这里才能生效，如果放到hooks.ts里，这里不会生效
// @ts-ignore
// eslint-disable-next-line no-redeclare
import HomePage from './components/home-page/index.vue'
// @ts-ignore
// eslint-disable-next-line no-redeclare
import OtherPage from './components/other-page/index.vue'
// #endif
</script>

<template>
  <!-- layout-container 写在App.vue里面，用来居中显示 -->
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <view>
      <!-- 自定义导航栏 https://ask.dcloud.net.cn/article/34921  -->
      <wd-navbar title="这是logo" fixed placeholder safeAreaInsetTop></wd-navbar>
    </view>
    <!-- #endif -->

    <!-- #ifdef WEB -->
    <toolbar />
    <!-- #endif -->

    <first-nav />

    <!-- #ifdef WEB -->
    <keep-alive>
      <home-page v-if="currentNav === 'home'" />
      <other-page v-else />
    </keep-alive>
    <!-- #endif -->

    <!-- #ifdef MP-WEIXIN -->
    <home-page v-if="currentNav === 'home'" />
    <other-page v-else />
    <!-- #endif -->
  </view>
</template>
