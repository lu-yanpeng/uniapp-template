<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AsideTitle from '@/components/aside-title/index.vue'
import Category from './__category.vue'
import { getCategoryList } from '@/API/category'
import { SERVER_ADDRESS } from '@/constants'

const categoryData = ref<{
  title: string
  category: {
    title: string
    coverSrc: string
  }[]
}[]>([])
onMounted(async () => {
  const { data } = await getCategoryList()

  data.map(({ attributes }) => {
    let __category: {
      title: string
      coverSrc: string
    }[] = []
    // 填充二级分类
    attributes.child.data.map(({ attributes }) => {
      __category.push({
        title: attributes.title,
        coverSrc: `${SERVER_ADDRESS}${attributes.cover.data.attributes.url}`
      })
    })
    categoryData.value.push({
      title: attributes.title,
      category: __category
    })
  })
})
</script>

<template>
  <view>
    <aside-title left-text="产品" right-text="分类目录" />

    <category v-for="c in categoryData" :key="c.title" :title="c.title" :category="c.category" />
  </view>
</template>
