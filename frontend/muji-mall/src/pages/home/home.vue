<script setup lang="ts">
import Toolbar from './components/toolbar/index.vue'
</script>

<template>
  <!-- layout-container 写在App.vue里面，用来居中显示 -->
  <view class="layout-container">
    <!-- #ifdef MP-WEIXIN -->
    <view class="full-width">
      <!-- 自定义导航栏 https://ask.dcloud.net.cn/article/34921  -->
      <!-- FIXME: 下拉刷新的样式被自定义导航栏挡住了 -->
      <wd-navbar title="这是logo" fixed placeholder safeAreaInsetTop></wd-navbar>
    </view>
    <!-- #endif -->

    <toolbar class="full-width" />
  </view>
</template>
