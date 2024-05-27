import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig(({ mode }) => {
  // console.log('环境变量', process.env)
  // console.log('模式+环境变量', mode, loadEnv(mode, process.cwd()))
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      uni(),
      // https://weapp-tw.icebreaker.top/docs/quick-start/frameworks/uni-app-vite
      uvwt({
        rem2rpx: true,
        // web端禁用这个插件，否则打包后样式错乱，应该只在小程序端开启
        disabled: process.env.UNI_PLATFORM === 'h5'
      }),
      // https://github.com/originjs/vite-plugin-federation/blob/main/README-zh.md
      federation({
        name: 'host-app',
        remotes: {
          'remote-app': `${env.VITE_REMOTE_APP_ADDRESS}/assets/remoteEntry.js`
        },
        // shared: ['vue', '@dcloudio/uni-app']
      })
    ],
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer]
      }
    },
    build: {
      target: 'esnext'
    },
    // base: '/host-app/'
  }
})
