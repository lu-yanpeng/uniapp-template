<script setup lang="ts">
import { defineAsyncComponent, computed, watchEffect } from 'vue'

const props = withDefaults(
  defineProps<{
    componentId: 'a' | 'b' | 'c' | 'd' | 'default'
    title: string
  }>(),
  {
    componentId: 'default',
    title: '活动'
  }
)

watchEffect(() => {
  uni.setNavigationBarTitle({
    title: props.title
  })
})

const compsSet = new Set(['a', 'b', 'c', 'd'])
const compsId = computed(() => {
  if (compsSet.has(props.componentId)) {
    return props.componentId
  }
  return 'default'
})

const comps = defineAsyncComponent(() => import(`./pages/${compsId.value}/index.vue`))
</script>

<template>
  <view>
    <text>当前活动{{ componentId }}</text>

    <component :is="comps" />
  </view>
</template>
