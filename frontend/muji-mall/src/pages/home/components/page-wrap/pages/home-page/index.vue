<script setup lang="ts">
import PageNav from './components/page-nav/index.vue'
import HomeBanner from './components/banner.vue'
import SpecialCollection from './components/special-collection.vue'
import News from './components/news.vue'
import Category from './components/category/index.vue'
import RankList from './components/rank-list.vue'
import PageVideo from './components/home-page-video.vue'
import pageHelp from './components/help.vue'
</script>

<script lang="ts">
import { defineComponent, readonly, unref, toRef } from 'vue'
import { homeNavHeightSymbol } from '@/pages/home/symbol-keys'
import type { NavItemId } from './types'
import { navItemIdSymbol, currentPointSymbol } from './symbol-keys'

export default defineComponent({
  data() {
    return {
      pageNavHeight: 0,
      viewportHeight: 0,
      // 当前锚点，用来控制当前导航的样式
      currentPoint: 'banner' as NavItemId[number],
      // scroll-view组件根据他的值跳转到对应位置，点击导航才会修改他的值
      scrollIntoId: 'banner' as NavItemId[number],
      // 每个模块的组件名就是他的id，通过这个id实现点击导航跳转对应模块
      navItemId: [
        'banner',
        'special-collection',
        'news',
        'category',
        'rank-list',
        'page-video'
      ] as NavItemId
    }
  },
  mounted() {
    this.getScrollViewHeight()
    uni.onWindowResize(this.getScrollViewHeight)
  },
  unmounted() {
    uni.offWindowResize(this.getScrollViewHeight)
  },
  inject: {
    homeNavHeight: {
      from: homeNavHeightSymbol,
      default: 0
    }
  },
  provide() {
    return {
      [navItemIdSymbol]: readonly(this.navItemId),
      [currentPointSymbol]: toRef(this, 'currentPoint')
    }
  },
  methods: {
    onJump(id: NavItemId[number]) {
      this.currentPoint = id
      this.scrollIntoId = id
    },
    setPoint() {
      // 用组件id拼出css选择器，方便同时监听多个元素
      let targetSelector = ''
      this.navItemId.map((id) => {
        targetSelector += `#${id},`
      })

      // 这个api只能用在scroll-view组件上，或者相对于视口来用
      // 如果要监听的元素出现在视口的比例大于_threshold，就会触发回调
      // 下面这里scroll-view的高度是550，设置bottom为负值后他的实际高度就是66；也就是把他的监听范围缩小到顶部区域，只有经过顶部才会触发
      // 如果视口中出现要监听的元素，并且出现的比例大于0.5%，就会触发；一个高度200的元素，他的0.5%是1，如果视口中出现1px这个元素，就会触发
      const _threshold = 0.005
      uni
        .createIntersectionObserver(this, {
          observeAll: true,
          thresholds: [0, _threshold]
        })
        .relativeTo('#scroll-view', { bottom: this.scrollViewHeight * -0.88 })
        .observe(targetSelector.slice(0, -1), (res: any) => {
          if (res.intersectionRatio >= _threshold) {
            this.currentPoint = res.id
          }
        })
    },
    getScrollViewHeight() {
      uni
        .createSelectorQuery()
        .in(this)
        .select('#page-nav')
        .boundingClientRect((res: any) => {
          // 先获取导航栏的高度
          this.pageNavHeight = Math.ceil(res.height)
        })
        .selectViewport()
        .boundingClientRect((res: any) => {
          // 再用视口高度减去导航栏高度，就是滚动区域的高度
          this.viewportHeight = Math.ceil(res.height)
        })
        .exec()
    }
  },
  computed: {
    scrollViewHeight() {
      return this.viewportHeight - (unref(this.homeNavHeight) as number) - this.pageNavHeight
    }
  },
  watch: {
    // 避免初始化时没有高度，导致锚点定位错误
    scrollViewHeight(v: number) {
      if (v > 0) {
        this.setPoint()
      }
    }
  }
})
</script>

<template>
  <view class="home-page">
    <page-nav id="page-nav" @jump="onJump" />

    <scroll-view
      id="scroll-view"
      class="scroll-view-height w-full"
      :scroll-y="true"
      :scroll-into-view="scrollIntoId"
    >
      <!-- #ifdef WEB -->
      <home-banner class="full-width lg:![grid-column:content]" id="banner" />
      <special-collection class="content-width" id="special-collection" />
      <news id="news" />
      <category id="category" />
      <rank-list id="rank-list" />
      <page-video id="page-video" />
      <page-help id="page-help" />
      <!-- #endif -->

      <!-- #ifdef MP-WEIXIN -->
      <view id="banner"><home-banner /></view>
      <view id="special-collection" class="px-3.5"><special-collection /></view>
      <view id="news" class="px-3.5"><news /></view>
      <view id="category" class="px-3.5"><category /></view>
      <view id="rank-list" class="px-3.5"><rank-list /></view>
      <view id="page-video" class="px-3.5"><page-video /></view>
      <view id="page-help" class="px-3.5"><page-help /></view>
      <!-- #endif -->
    </scroll-view>
  </view>
</template>

<style scoped lang="less">
.scroll-view-height {
  /*减去顶部导航栏剩下的就是内容区的高度*/
  height: v-bind('scrollViewHeight + "px"');
}

/* #ifdef WEB */
:deep(#scroll-view) {
  .uni-scroll-view-content {
    /*微信无法使用*选择器，这个样式不会生效*/
    @apply layout-container;
  }
}
/* #endif */
</style>
