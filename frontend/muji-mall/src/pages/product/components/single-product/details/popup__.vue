<script setup lang="ts">
import { ref, watchEffect } from 'vue'

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

const onClose = () => {
  show.value = false
  emits('update:modelValue', false)
}
</script>

<template>
  <wd-popup
    v-model="show"
    position="bottom"
    custom-style="border-top-left-radius: 0.75rem; border-top-right-radius: 0.75rem;"
    @close="onClose"
  >
    <slot />
  </wd-popup>
</template>
