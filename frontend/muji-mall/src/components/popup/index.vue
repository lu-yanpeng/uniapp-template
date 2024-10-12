<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    zIndex: number
  }>(),
  {
    modelValue: false,
    zIndex: 1000
  }
)
const emits = defineEmits<{
  'update:modelValue': [state: boolean]
  close: []
}>()

const show = ref(false)
watchEffect(() => {
  show.value = props.modelValue
})

const onClose = () => {
  show.value = false
  emits('update:modelValue', false)
  emits('close')
}
</script>

<template>
  <wd-popup
    v-model="show"
    position="bottom"
    custom-style="border-top-left-radius: 0.75rem; border-top-right-radius: 0.75rem;"
    @after-leave="onClose"
    :z-index="zIndex"
  >
    <slot />
  </wd-popup>
</template>
