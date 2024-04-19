<script setup lang="ts">
import { ref, inject } from 'vue'
import type { Ref } from 'vue'
import type { NavItemId } from '../../types'
import { navItemIdSymbol, currentPointSymbol } from '../../symbol-keys'

defineEmits<{
  jump: [id: NavItemId[number]]
}>()

const fold = ref(true)
const unfold = () => {
  fold.value = !fold.value
}

const navItemName = ['活动', '特集', '新商品', '产品分类', '销售排行榜', '视频'] as const
const navItemId = inject(navItemIdSymbol) as NavItemId
const navItem = navItemId.map((id, index) => ({
  id,
  name: navItemName[index]
}))

const currentPoint = inject(currentPointSymbol) as Ref<NavItemId[number]>
</script>

<template>
  <view class="text-xs">
    <view class="flex h-11" style="border-top: 1px solid #f2f2f2; border-bottom: 1px solid #f2f2f2">
      <!-- 默认导航，可滚动 -->
      <view class="flex-1 h-full overflow-hidden">
        <scroll-view
          class="flex whitespace-nowrap h-full"
          :scroll-x="true"
          :enable-flex="true"
          :show-scrollbar="false"
          v-show="fold"
        >
          <view
            v-for="item in navItem"
            :key="item.id"
            class="inline-flex items-center h-full first:ml-1"
            @click="$emit('jump', item.id)"
          >
            <view
              class="mx-1.5 px-3"
              :class="{ 'current-point-bg text-[#7f0019]': currentPoint === item.id }"
            >
              <text>{{ item.name }}</text>
            </view>
          </view>
        </scroll-view>

        <view v-show="!fold" class="h-full flex items-center wrap">
          <view class="ml-4">
            <text class="font-bold">选择分类</text>
          </view>
        </view>
      </view>

      <view
        class="w-11 h-11 flex items-center justify-center"
        :class="{ 'rotate-180': !fold }"
        @click="unfold"
        style="box-shadow: -0.09375rem -0.18rem 0.3125rem #f2f2f2"
      >
        <image class="w-3 h-1.5" src="@/pages/home/img/down-arrow.png" :lazy-load="true" />
      </view>
    </view>

    <!-- 展开导航栏 -->
    <view class="wrap">
      <view class="pop" :class="{ show: !fold }">
        <view class="grid-item">
          <!-- 要显示的内容放在content里面-->
          <view class="content">
            <view
              v-for="item in navItem"
              :key="item.id"
              class="mx-1 my-2 px-[0.75rem]"
              :class="{ 'current-point-bg text-[#7f0019]': currentPoint === item.id }"
              @click="$emit('jump', item.id)"
            >
              <text class="whitespace-nowrap">{{ item.name }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="less">
.wrap {
  position: relative;

  .pop {
    width: 100%;
    position: absolute;
    z-index: 9999;
    transform: translateX(-50%);
    top: 100%;
    left: 50%;

    display: grid;
    grid-template-rows: 0fr;
    transition: all 0.3s;

    .grid-item {
      min-height: 0;
      overflow: hidden;
      background-color: #fff;

      .content {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
        align-items: center;
        justify-items: center;
        margin: 0.375rem 0.6875rem;
      }
    }
  }

  .pop.show {
    grid-template-rows: 1fr;
  }
}

.current-point-bg {
  background-image: url('./img/point.png');
  background-repeat: no-repeat;
  background-size: 0.5625rem 0.75rem;
  background-position: 0;
}
</style>
