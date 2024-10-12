<script setup lang="ts">
import { inject, ref } from 'vue'
import type { Ref } from 'vue'
import SetAddress from '@/components/set-address/index.vue'
import { useAddressStore } from '@/store/address'
import { currentNavSymbol } from '@/pages/home/symbol-keys'
import type { CurrentNav } from '@/pages/home/types'

const currentNav = inject(currentNavSymbol, ref('home')) as Ref<CurrentNav>

const addressStore = useAddressStore()

const show = ref(false)
</script>

<template>
  <view class="px-1.5 relative h-[44px] text-center">
    <image @click="currentNav = 'home'" class="w-[120px] h-full" src="/static/logo.png" />

    <view class="absolute top-0 right-3.5 h-full flex items-center">
      <view class="flex items-baseline" @click="show = true">
        <image class="w-3.5 h-3.5 translate-y-0.5" src="@/pages/home/img/address.png" />
        <text class="text-sm">{{ addressStore?.prefecture }}</text>

        <image class="w-3 h-1.5 ml-1" src="@/pages/home/img/down-arrow.png" />
      </view>
    </view>

    <set-address v-model="show" :v-if="show" />
  </view>
</template>
