<script setup lang="ts">
import FirstNav from './first-nav/index.vue'

// #ifdef MP-WEIXIN
import CustomNav from '@/components/custom-nav/index.vue'
// #endif

// #ifdef WEB
import Toolbar from './toolbar/index.vue'
// #endif
</script>

<template>
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <custom-nav>
      <template #left>
        <view class="flex items-baseline ml-[26rpx]">
          <image class="w-3.5 h-3.5 translate-y-0.5" src="@/pages/home/img/address.png" />
          <text class="text-sm">上海</text>

          <image class="w-3 h-1.5 ml-1" src="@/pages/home/img/down-arrow.png" />
        </view><view></view>
      </template>

      <template #center>
        <view>
          <text>这是logo</text>
        </view>
      </template>
    </custom-nav>
    <!-- #endif -->

    <!-- #ifdef WEB -->
    <toolbar />
    <!-- #endif -->

    <first-nav />
  </view>
</template>
