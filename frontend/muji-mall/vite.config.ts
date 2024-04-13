import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
// import postcssPlugins from './postcss.config.js'
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    uvwt({
      rem2rpx: true
    })
  ],
  css: {
    /*postcss: {
      plugins: postcssPlugins
    }*/

    // TODO: https://weapp-tw.icebreaker.top/docs/quick-start/frameworks/uni-app-vite
    // 注册这个插件
    postcss: {
      plugins: [
        // require('tailwindcss')() 和 require('tailwindcss') 等价的，表示什么参数都不传，如果你想传入参数
        // require('tailwindcss')({} <- 这个是postcss插件参数)
        require('tailwindcss'),
        require('autoprefixer')
      ],
    },
  }
});
