<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useGetCompsPath } from './hooks'

withDefaults(
  defineProps<{
    componentId?: string
  }>(),
  {
    componentId: '-1'
  }
)
const emits = defineEmits<{
  mounted: []
}>()

const defaultComps = defineAsyncComponent(() => import('./components/default.vue'))

const comps = ref<Record<string, any>>({})

onMounted(async () => {
  try {
    const { data } = await useGetCompsPath()
console.log('data', data)
    data.map((item) => {
      const { component_id, component_path } = item.attributes
      comps.value[component_id] = defineAsyncComponent(() => {
        const path = component_path.split('/')
        switch (path.length) {
          case 2:
            return import(`./components/${path[0]}/${path[1]}.vue`)
          case 3:
            return import(`./components/${path[0]}/${path[1]}/${path[2]}.vue`)
          default:
            return import(`./components/${path[0]}.vue`)
        }
      })
    })
  } catch (e: any) {
    console.log('服务器异常')
  }

  emits('mounted')
})
</script>

<template>
  <view>
    <component :is="comps[componentId] ?? defaultComps" />
  </view>
</template>
