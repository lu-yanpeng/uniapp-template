<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'
import { currentNavSymbol } from '@/pages/home/symbol-keys'
import type { CurrentNav } from '@/pages/home/types'

// #ifdef MP-WEIXIN
// 放到这里才能生效，如果放到hooks.ts里，这里不会生效
// @ts-ignore
// eslint-disable-next-line no-redeclare
import HomePage from './pages/home-page/index.vue'
// @ts-ignore
// eslint-disable-next-line no-redeclare
import OtherPage from './pages/other-page/index.vue'
// #endif

// #ifdef WEB
import { defineAsyncComponent } from 'vue'
// @ts-ignore
// eslint-disable-next-line no-redeclare, no-import-assign
const HomePage = defineAsyncComponent(() => import('./pages/home-page/index.vue'))
// @ts-ignore
// eslint-disable-next-line no-redeclare, no-import-assign
const OtherPage = defineAsyncComponent(() => import('./pages/other-page/index.vue'))
// #endif

const currentNav = inject(currentNavSymbol) as Ref<CurrentNav>
</script>

<template>
  <view>
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
