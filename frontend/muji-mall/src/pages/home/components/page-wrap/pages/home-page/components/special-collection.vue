<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AsideTitle from '@/components/aside-title/index.vue'
import { getCampaigns } from '@/API/home/campaigns'
import { SERVER_ADDRESS } from '@/constants'

const campaignsList = ref<
  {
    title: string
    component_id: string
    imgSrc: string
  }[]
>([])

onMounted(async () => {
  try {
    const { data } = await getCampaigns()

    data.map((item) => {
      const { attributes } = item
      campaignsList.value.push({
        title: attributes.title,
        component_id: attributes.activity_component.data.attributes.component_id,
        imgSrc: SERVER_ADDRESS + attributes.cover_img.data.attributes.url
      })
    })
  } catch (e) {
    console.log()
  }
})

const goto = (componentId: string, title: string) => {
  uni.navigateTo({
    url: `/pages/activity/activity?component-id=${componentId}&title=${title}`
  })
}
</script>

<template>
  <view>
    <aside-title left-text="特集" />

    <view
      class="flex flex-wrap justify-around lg:grid lg:[grid-template-columns:repeat(auto-fill,minmax(280px,1fr))] lg:[grid-auto-rows:175px] lg:gap-x-6"
    >
      <view v-if="!Object.keys(campaignsList).length" class="flex flex-wrap justify-around">
        <view class="mb-3" v-for="i in 6" :key="i">
          <wd-skeleton
            theme="image"
            animation="gradient "
            :row-col="[
              {
                width: '10.125rem',
                height: '7.5rem'
              }
            ]"
          />
        </view>
      </view>

      <view
        v-for="(value, key) in campaignsList"
        :key="key"
        class="w-[10.125rem] h-[7.5rem] mb-3 overflow-hidden card-border lg:w-full lg:h-full lg:mb-0"
        :class="{ 'lg:hidden': key === 5 || key === 4 }"
        style="box-shadow: -2px 2px 6px 2px #ccc"
        @click="goto(value.component_id, value.title)"
      >
        <image :src="value.imgSrc" class="w-full h-full" mode="aspectFill" :lazy-load="true" />
      </view>
    </view>
  </view>
</template>
