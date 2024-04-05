<template>
  <layout-content>
    <index-banner />

    <view @click="indexStore.count += 1">
      <text>{{ indexStore.count }}</text>
    </view>
  </layout-content>
</template>

<script setup lang="ts">
import { useIndexStore } from '@/store'
import IndexBanner from './index-banner.vue'
import LayoutContent from '@/components/layout/content.vue'

const indexStore = useIndexStore()
</script>
