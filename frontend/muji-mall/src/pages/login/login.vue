<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'wot-design-uni'

const model = ref<{
  username: string
  password: string
}>({
  username: '',
  password: ''
})

const { show } = useToast()
const onClick = () => {
  show({
    msg: '待开发'
  })
}
</script>

<template>
  <wd-form :model="model">
    <wd-cell-group border>
      <wd-input
        label="手机号"
        label-width="4.625rem"
        prop="value1"
        clearable
        v-model="model.username"
        placeholder="请输入手机号码"
        :rules="[{ required: true, message: '请输入手机号码' }]"
      />
      <wd-input
        label="密码"
        label-width="4.625rem"
        prop="value2"
        show-password
        clearable
        v-model="model.password"
        placeholder="请输入6-20位英文、数字组合密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
    </wd-cell-group>

    <view class="flex px-4 pt-3.5 pb-6 text-sm justify-between text-sky-400">
      <text>验证码登录</text>
      <text>忘记密码</text>
    </view>

    <view class="flex px-4 text-sm">
      <wd-button @click="onClick">登录</wd-button>
      <wd-button plain hairline type="info" @click="onClick">注册</wd-button>
    </view>

    <wd-toast />

  </wd-form>
</template>
