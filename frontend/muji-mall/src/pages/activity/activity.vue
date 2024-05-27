<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
// @ts-ignore
import Activity from 'remote-app/activity'

const componentId = ref<string | null>(null)

// @ts-ignore
onLoad((query: {
  title: string
  'component-id': string
}) => {
  uni.setNavigationBarTitle({
    title: query.title
  })
  componentId.value = query['component-id']
})

const mounted = () => {
  console.log('挂载')
}
</script>

<template>
  <view>
    <activity @mounted="mounted" v-if="componentId" :component-id="componentId" />
  </view>
</template>
