<script setup lang="ts">
import AsideTitle from '@/components/aside-title/index.vue'
import ProductList from '../common/product-list/index.vue'
import { useImgSrc } from '@/hooks/getImgSrc'

const { imgSrc } = useImgSrc('news')
</script>

<template>
  <view>
    <aside-title left-text="销售排行榜" />

    <product-list :img-src="imgSrc" />
  </view>
</template>
