<script setup lang="ts">
import { ref, provide, readonly } from 'vue'
import { onLaunch } from '@dcloudio/uni-app'
import { WxMenuButtonSymbol, WxNavHeightSymbol } from './symbol-keys'

// 微信导航栏高度，只有在微信小程序才会获取高度
const wxNavHeight = ref<number>(0)
provide(WxNavHeightSymbol, readonly(wxNavHeight))
const wxMenuButton = ref<number>(0)
provide(WxMenuButtonSymbol, readonly(wxMenuButton))

onLaunch(() => {
  // #ifdef MP-WEIXIN
  const statusBarHeight = Math.ceil(uni.getSystemInfoSync().statusBarHeight as number)

  const __menuButton = uni.getMenuButtonBoundingClientRect()
  const height = Math.ceil(__menuButton.height)
  const top = Math.ceil(__menuButton.top)

  wxMenuButton.value = height + (top - statusBarHeight) * 2
  wxNavHeight.value = wxMenuButton.value + statusBarHeight
  // #endif

  /*// 拦截器，拦截request API，让所有的请求只返回data字段，不返回其他内容
  // 不建议使用，这样做会导致编辑器类型报错，它不知道这里进行了拦截，
  uni.addInterceptor('request', {
    returnValue(args) {
      return args.data
    }
  })*/
})
</script>

<style lang="less">
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .card-border {
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    overflow: hidden;
  }

  /*这里的样式如果放到tailwind css里面，会导致grid-template-columns失效，暂时无法解决*/
  .layout-container {
    display: grid;

    --height: 14px;
    /*通过设置网格开始线和结束线来定位元素，打开调试工具可以查看网格线*/
    grid-template-columns:
    [full-width-start] minmax(var(--height), 1fr) [content-start] minmax(100% - 14px*2, 1200px) [content-end] minmax(
      var(--height),
      1fr
    )
    [full-width-end];

    /*默认居中*/
    & > * {
      grid-column: content;
    }
    /*全屏*/
    .full-width {
      grid-column: full-width;
    }

    /*设置起始位置和结束位置实现自定义布局*/
    /*.custom-width {
      grid-column: content-start / full-width-end;
    }*/
  }
}

/* #ifdef MP-WEIXIN */
::-webkit-scrollbar {
  width: 0;
  height: 0;
}
/* #endif */
</style>
