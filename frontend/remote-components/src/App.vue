<template></template>

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
