<script setup lang="ts">
import { inject, ref } from 'vue'
import type { Ref } from 'vue'
import { homeNavHeightSymbol } from '@/pages/home/symbol-keys'
import CompProductListAndSort from '@/components/product-list-and-sort/index.vue'

const homeNavHeight = inject(homeNavHeightSymbol, ref(0)) as Ref<number>
</script>

<template>
  <view>
    <comp-product-list-and-sort class="_height" order-by="spu.sales:desc,createdAt:desc" />
  </view>
</template>

<style scoped>
._height {
  --home-nav-height: v-bind('homeNavHeight + "px"');
  height: calc(100vh - var(--home-nav-height));
}
</style>
