<script setup lang="ts">
import SingleProduct from './components/single-product/index.vue'
import SortProduct from './components/sort-product/index.vue'

withDefaults(
  defineProps<{
    id?: string
    orderBy?: string
  }>(),
  {}
)
</script>

<template>
  <view>
    <single-product v-if="id" :product-id="id" />

    <sort-product v-else :order-by="orderBy" />
  </view>
</template>
