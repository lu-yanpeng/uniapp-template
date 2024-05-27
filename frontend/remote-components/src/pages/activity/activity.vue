<script setup lang="ts">
import { onMounted, computed } from 'vue'
import ComA from './components/A/index.vue'
import ComDefault from './components/default.vue'

const props = withDefaults(
  defineProps<{
    componentPath: string
    componentId: string
  }>(),
  {
  }
)
const emits = defineEmits<{
  mounted: []
}>()

// 如果用异步组件，外部在使用的时候会报错，暂时无法解决
// TypeError: Cannot read properties of null (reading 'suspense')
/*const Comps = defineAsyncComponent(() => {
  if (!props.componentPath) {
    return import('./components/default.vue')
  }

  const path = props.componentPath.split('/')
  switch (path.length) {
    case 2:
      return import(`./components/${path[0]}/${path[1]}.vue`)
    case 3:
      return import(`./components/${path[0]}/${path[1]}/${path[2]}.vue`)
    default:
      return import(`./components/${path[0]}.vue`)
  }
})*/

// FIXME:如果componentId没有对应的组件，远程组件渲染后将没有任何内容，也不报错
const compsMap: Record<string, any> = {
  A: ComA,  
  Default: ComDefault
}

const Comps = computed(() => {
  const componentId = props.componentId

  if (componentId in compsMap) {
    return compsMap[componentId]
  } else {
    return ComDefault
  }
})

onMounted(async () => {
  emits('mounted')
})
</script>

<template>
  <view>
    <comps />
  </view>
</template>
