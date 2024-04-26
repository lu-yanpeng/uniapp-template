import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import federation from '@originjs/vite-plugin-federation'

const plugins = [
  uni(),
  // https://weapp-tw.icebreaker.top/docs/quick-start/frameworks/uni-app-vite
  uvwt({
    rem2rpx: true,
    // web端禁用这个插件，否则打包后样式错乱，应该只在小程序端开启
    disabled: process.env.UNI_PLATFORM === 'h5'
  })
]

if (process.env.UNI_PLATFORM === 'h5') {
  // 微信因为无法顶层await的原因，没法使用模块联邦，打包时报错
  plugins.push(
    // https://github.com/originjs/vite-plugin-federation/blob/main/README-zh.md
    federation({
      name: 'remote-app',
      // 需要暴露的模块
      exposes: {
        './activity': './src/pages/activity/activity.vue',
        './test': './src/components/test.vue'
      },
      // 如果打包 '@dcloudio/uni-h5' 页面无法显示，也不报错
      shared: ['vue', '@dcloudio/uni-app', '@dcloudio/uni-components']
    })
  )
}

export default defineConfig({
  plugins,
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  build: {
    target: 'esnext'
  },
  base: '/remote-app/'
})
