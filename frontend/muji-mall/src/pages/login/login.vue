<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'wot-design-uni'
import type { FormInstance } from 'wot-design-uni/components/wd-form/types'
import { useUserStore } from '@/store/user'

const model = ref<{
  username: string
  password: string
}>({
  username: '',
  password: ''
})

const { show, success, error } = useToast()
const signUp = () => {
  show({
    msg: '待开发'
  })
}

const userStore = useUserStore()
const formRef = ref<FormInstance | null>(null)
const showOverlay = ref(false)
const signIn = async () => {
  if (formRef.value === null) {
    throw Error('意外错误')
  }
  const { valid } = await formRef.value.validate()
  if (!valid) {
    error({ msg: '表单验证失败' })
    return
  }
  try {
    showOverlay.value = true
    const result = await userStore.login({
      username: model.value.username,
      password: model.value.password
    })
    if (result) {
      success({ msg: '登录成功' })
      await uni.navigateBack()
    } else {
      error({ msg: '用户名密码错误' })
    }
  } finally {
    showOverlay.value = false
  }
}

const quickLogin = async (flag: 1 | 2) => {
  try {
    showOverlay.value = true
    const userInfo = {
      username: 'test',
      password: '123456'
    }
    if (flag === 2) {
      userInfo.username = 'test2'
      userInfo.password = '123123'
    }
    const result = await userStore.login(userInfo)
    if (result) {
      success({ msg: '登录成功' })
      await uni.navigateBack()
    } else {
      error({ msg: '用户名密码错误' })
    }
  } finally {
    showOverlay.value = false
  }
}
</script>

<template>
  <wd-form ref="formRef" :model="model">
    <wd-cell-group border>
      <wd-input
        label="用户名"
        label-width="4.625rem"
        prop="username"
        clearable
        v-model="model.username"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请输入用户名' }]"
      />
      <wd-input
        label="密码"
        label-width="4.625rem"
        prop="password"
        show-password
        clearable
        v-model="model.password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
    </wd-cell-group>

    <view class="flex px-4 pt-3.5 pb-6 text-sm justify-between text-sky-400">
      <text @click="signUp">验证码登录</text>
      <text @click="signUp">忘记密码</text>
    </view>

    <view class="flex px-4 text-sm">
      <wd-button plain hairline type="info" @click="signUp">注册</wd-button>
      <wd-button @click="signIn">登录</wd-button>
    </view>

    <view class="flex gap-3 mt-5 ml-4 text-sky-400">
      <text @click="quickLogin(1)">快速登录1</text>
      <text @click="quickLogin(2)">快速登录2</text>
    </view>

    <wd-toast />
    <wd-overlay :show="showOverlay">
      <view class="wrapper">
        <wd-loading :size="40" />
      </view>
    </wd-overlay>
  </wd-form>
</template>

<style scoped lang="less">
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>