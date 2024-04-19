<script setup lang="ts">
import HomeNav from './components/home-nav/index.vue'
import PageWrap from './components/page-wrap/index.vue'
import { provide, ref } from 'vue'
import type { CurrentNav } from './types'
import { currentNavSymbol } from './symbol-keys'

const currentNav = ref<CurrentNav>('home')
provide(currentNavSymbol, currentNav)
</script>

<script lang="ts">
import { defineComponent, toRef } from 'vue'
import { homeNavHeightSymbol } from './symbol-keys'

export default defineComponent({
  data() {
    return {
      // 顶部状态栏加第一行导航栏的高度
      homeNavHeight: 0
    }
  },
  methods: {
    getHomeNavHeight() {
      uni
        .createSelectorQuery()
        .in(this)
        .select('#home-nav')
        .boundingClientRect((res: any) => {
          this.homeNavHeight = Math.ceil(res.height) as number
        })
        .exec()
    }
  },
  mounted() {
    this.getHomeNavHeight()
    uni.onWindowResize(this.getHomeNavHeight)
  },
  unmounted() {
    uni.offWindowResize(this.getHomeNavHeight)
  },
  provide() {
    return {
      [homeNavHeightSymbol]: toRef(this, 'homeNavHeight')
    }
  }
})
</script>

<template>
  <view>
    <home-nav id="home-nav" />
    <page-wrap />
  </view>
</template>
