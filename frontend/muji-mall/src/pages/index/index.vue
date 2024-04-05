<script setup lang="ts">
import { useIndexStore } from '@/store'
import IndexBanner from './index-banner.vue'
import LayoutContent from '@/components/layout/content.vue'
import IndexSpecial from './index-special.vue'

const indexStore = useIndexStore()
</script>

<template>
  <layout-content>
    <index-banner />

    <index-special />

    <view @click="indexStore.count += 1">
      <text>{{ indexStore.count }} - pinia</text>
    </view>
  </layout-content>
</template>
