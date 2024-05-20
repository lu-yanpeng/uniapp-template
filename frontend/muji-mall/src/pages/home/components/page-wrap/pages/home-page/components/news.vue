<script setup lang="ts">
import ProductList from '../common/product-list/index.vue'
</script>

<template>
  <product-list left-text="新商品" :sort="['createdAt:desc']" />
</template>
