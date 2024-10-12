<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useAddressStore } from '@/store/address'
import Popup from '@/components/popup/index.vue'

const addressStore = useAddressStore()

const props = withDefaults(
  defineProps<{
    modelValue: boolean
  }>(),
  {
    modelValue: false
  }
)
const emits = defineEmits<{
  'update:modelValue': [state: boolean]
}>()

const show = ref(false)
watchEffect(() => {
  show.value = props.modelValue
})

// 初始化时，pickerView所展示的数据，设置第一个<picker-view-column>的索引
const pickerViewIndex = ref([addressStore.prefectureList.indexOf(addressStore.prefecture)])
const currentPrefecture = ref<(typeof addressStore.prefectureList)[number]>(addressStore.prefecture)
// 滚动选择地址时，保存当前地址索引
const addressPickerChange = (e: { detail: { value: number[] } }) => {
  const { detail } = e
  currentPrefecture.value = addressStore.prefectureList[detail.value[0]]
}

const setAddress = () => {
  addressStore.prefecture = currentPrefecture.value
  onClose()
}

const onClose = () => {
  show.value = false
  emits('update:modelValue', false)
}
</script>

<template>
  <popup
    v-model="show"
    :z-index="1001"
    @close="onClose"
  >
    <!-- 设置地址 -->
    <view class="h-[45vh] grid grid-rows-[auto,1fr,auto]">
      <view class="text-sm py-2.5 px-5 flex">
        <text>当前配送至：</text>
        <view>
          <image class="w-3.5 h-3.5 translate-y-0.5" src="@/pages/product/img/address.png" />
          {{ addressStore.prefecture }}
        </view>
      </view>

      <picker-view :value="pickerViewIndex" @change="addressPickerChange">
        <picker-view-column>
          <view
            v-for="(v, key) in addressStore.prefectureList"
            :key="key"
            class="grid justify-items-center content-center text-black"
          >{{ v }}</view
          >
        </picker-view-column>
      </picker-view>

      <view class="w-full py-2.5 px-5">
        <view @click="setAddress" class="text-base py-1.5 text-white bg-black rounded-full text-center">确定</view>
      </view>
    </view>
  </popup>
</template>
