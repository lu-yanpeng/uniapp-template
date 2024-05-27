<script setup lang="ts">
import './css/index.less'
// 汗麻系列
const getImageUrl = (name: string) => {
  if (import.meta.env.PROD) {
    const href = new URL(`./img/${name}.jpg`, import.meta.url)
    return import.meta.env.VITE_SELF_HOST + href.pathname
  }
  return new URL(`./img/${name}.jpg`, import.meta.url).href
}
// TODO:应该从服务器获取图片数据，并且每个商品图片带着商品id
</script>

<template>
  <view class="remote-app">
    <view class="layout-container py_20 _container">
      <img
        :src="getImageUrl('04184e2f-8f8f-4bd8-a944-5c914e01a81c')"
        class="w_full h_full align_top"
        style="aspect-ratio: 99 / 62"
        loading="lazy"
      />
      <img
        :src="getImageUrl('67d12d9d-ee2d-4c1e-9e5d-c4d81e183cba')"
        class="w_full h_full align_top"
        style="aspect-ratio: 198 / 329"
        loading="lazy"
      />
      <img
        :src="getImageUrl('64b0da0b-9e71-4a8b-8fdb-a1a73bbee6d1')"
        class="w_full h_full align_top"
        style="aspect-ratio: 12 / 5"
        loading="lazy"
      />

      <view class="w_full" style="aspect-ratio: 1 / 0.77">
        <img
          :src="getImageUrl('504095be-142d-4b97-affe-61876d6baec5')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
        <img
          :src="getImageUrl('49e8a13a-4a06-4185-94b3-c743960d1eee')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
      </view>

      <view class="w_full" style="aspect-ratio: 1 / 0.77">
        <img
          :src="getImageUrl('978d112c-2d3b-4619-826f-5b02ef95a7dd')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
        <img
          :src="getImageUrl('adc4bf84-4706-4f8f-8537-1dbc61b2030a')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
      </view>

      <view class="w_full" style="aspect-ratio: 1 / 0.77">
        <img
          :src="getImageUrl('6c5cd4fe-bb89-47a1-a7b9-9c3be35be937')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
        <img
          :src="getImageUrl('e75bb43b-501b-4310-a122-2ed546f4a393')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
      </view>

      <view class="w_full" style="aspect-ratio: 1 / 0.77">
        <img
          :src="getImageUrl('8dbf9f50-646b-49f4-b9c8-9a61d3228bd6')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
        <img
          :src="getImageUrl('3e8783db-ec64-4c38-990c-b608e0667e60')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
      </view>

      <view class="w_full" style="aspect-ratio: 1 / 0.77">
        <img
          :src="getImageUrl('af8545bc-5cd6-442b-a9e0-c2bfc314da8d')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
        <img
          :src="getImageUrl('3f5c631f-2f6a-4f5a-93de-f853705b711e')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
      </view>

      <img
        :src="getImageUrl('6c4aaee5-849d-452b-aea9-89b9cdc3b331')"
        class="w_full h_full align_top"
        style="aspect-ratio: 12 / 5"
        loading="lazy"
      />
      <view class="w_full" style="aspect-ratio: 1 / 0.77">
        <img
          :src="getImageUrl('da8b6c66-daf0-423a-a125-f047cdd37a70')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
        <img
          :src="getImageUrl('aff801eb-f0a1-4b8b-93c3-6dc170a0d3ba')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
      </view>

      <view class="w_full" style="aspect-ratio: 1 / 0.77">
        <img
          :src="getImageUrl('caf84721-3cd7-4093-8545-a03cd4f8672d')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
        <img
          :src="getImageUrl('ac717b4d-b030-406a-82ee-0b591e9c8c84')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
      </view>

      <view class="w_full" style="aspect-ratio: 1 / 0.77">
        <img
          :src="getImageUrl('93a32c41-d00d-473a-98c8-0eff72b39a41')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
        <img
          :src="getImageUrl('51c3af79-3c4b-4605-82d8-67c34509fe8b')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
      </view>

      <view class="w_full" style="aspect-ratio: 1 / 0.77">
        <img
          :src="getImageUrl('5af643a0-4ad3-42f6-8123-a8499dcf8e13')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
        <img
          :src="getImageUrl('4c44f0ce-70c2-42b3-a0d0-35b60d25690c')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
      </view>

      <view class="w_full" style="aspect-ratio: 1 / 0.77">
        <img
          :src="getImageUrl('2fce7acb-d494-400b-9ba9-9ce31fd26767')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
        <img
          :src="getImageUrl('4719b206-22c6-4cb6-8233-7f093a871674')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
      </view>

      <img
        :src="getImageUrl('0b607728-e252-4320-9509-cc6fc548ccf9')"
        class="w_full h_full align_top"
        style="aspect-ratio: 12 / 5"
        loading="lazy"
      />
      <view class="w_full" style="aspect-ratio: 1 / 0.77">
        <img
          :src="getImageUrl('4bec98d1-195e-47c7-96bc-c5a84a70b90b')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
        <img
          :src="getImageUrl('4ff89192-b949-4530-b339-2477c7c863d9')"
          class="w_50 h_full align_top"
          loading="lazy"
        />
      </view>
    </view>
  </view>
</template>
