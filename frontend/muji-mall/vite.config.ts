import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite';
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    // https://weapp-tw.icebreaker.top/docs/quick-start/frameworks/uni-app-vite
    uvwt({
      rem2rpx: true,
      // web端禁用这个插件，否则打包后样式错乱，应该只在小程序端开启
      disabled: process.env.UNI_PLATFORM === 'h5',
    })
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ],
    },
  }
});
