<script setup lang="ts">
import IndexAside from './components/index-aside.vue'
import { useImgSrc } from './hooks/getImgSrc'

const { imgSrc } = useImgSrc('special')
</script>

<template>
  <index-aside title="特集">
    <view class="flex-content">
      <view class="flex-item" v-for="(src, index) in imgSrc" :key="src">
        <img class="__img" :src="src" loading="lazy" :alt="'特集' + index" />
      </view>
    </view>
  </index-aside>
</template>

<style scoped lang="less">
.flex-content {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: space-between;

  .flex-item {
    aspect-ratio: 1 / 0.75;
    width: 48%;

    .__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
