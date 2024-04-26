import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    // https://weapp-tw.icebreaker.top/docs/quick-start/frameworks/uni-app-vite
    uvwt({
      rem2rpx: true,
      // web端禁用这个插件，否则打包后样式错乱，应该只在小程序端开启
      disabled: process.env.UNI_PLATFORM === 'h5'
    }),
    federation({
      name: 'host-app',
      remotes: {
        'remote-app': 'http://36.140.84.73:8000/remote-app/assets/remoteEntry.js'
      },
      shared: ['vue', '@dcloudio/uni-app', '@dcloudio/uni-components']
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
  base: '/host-app/'
})
