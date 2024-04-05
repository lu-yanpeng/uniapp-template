<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    more: string
  }>(),
  {
    title: '标题',
    more: '查看更多'
  }
)
</script>

<template>
  <view class="wrap">
    <view class="nav">
      <text class="title">{{ title }}</text>
      <text class="more">{{ more }}</text>
    </view>

    <view>
      <slot />
    </view>
  </view>
</template>

<style scoped lang="less">
.wrap {
  display: grid;
  gap: 17px;
  padding: 18px 17px;

  .nav {
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 18px;
    }

    .more {
      font-size: 14px;
      color: #60b3fa;
    }
  }
}
</style>