<script setup lang="ts">
import { ref } from 'vue'

const count = ref<number>(0)
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      width: 0,
      height: 0
    }
  },
  mounted() {
    uni.createSelectorQuery().in(this).selectViewport().boundingClientRect((res) => {
      console.log('宽高', res.width, res.height)
      this.width = res.width
      this.height = res.height
    }).exec()
  }
})
</script>

<template>
  <view>
    <wd-button type="error" @click="count += 1">计数 -- {{ count }}</wd-button>
    <view>
      <text>宽{{ width }} --- 高{{ height }}</text>
    </view>
  </view>
</template>
