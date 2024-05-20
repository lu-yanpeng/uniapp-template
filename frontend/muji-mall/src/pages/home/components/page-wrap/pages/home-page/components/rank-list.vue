<script setup lang="ts">
import ProductList from '../common/product-list/index.vue'
</script>

<template>
  <product-list left-text="销售排行榜" :sort="['spu.sales:desc']" />
</template>
