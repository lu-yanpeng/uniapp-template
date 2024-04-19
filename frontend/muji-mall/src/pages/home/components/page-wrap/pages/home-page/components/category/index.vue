<script setup lang="ts">
import AsideTitle from '@/components/aside-title/index.vue'
import Category from './__category.vue'
</script>

<template>
  <view>
    <aside-title left-text="产品" right-text="分类目录" />

    <category title="衣服·杂货" directory-name="category-clothes" />
    <category title="生活杂货" directory-name="category-sundries" />
    <category title="食品" directory-name="category-foods" />
  </view>
</template>
