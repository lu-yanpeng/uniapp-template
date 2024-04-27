<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
// @ts-ignore
import Activity from 'remote-app/activity'

const componentId = ref<string | null>(null)

// @ts-ignore
onLoad((query: {
  title: string
  componentId: string
}) => {
  uni.setNavigationBarTitle({
    title: query.title
  })
  componentId.value = query.componentId
})
</script>

<template>
  <view>
    <activity :componentId="componentId"  />
  </view>
</template>
