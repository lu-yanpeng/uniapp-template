<script setup lang="ts">
</script>

<template></template>

<style lang="less">
@import 'modern-normalize/modern-normalize.css';
@tailwind base;
@tailwind components;
@tailwind utilities;

/*这里的样式如果放到tailwind css里面，会导致grid-template-columns失效，暂时无法解决*/
.layout-container {
  display: grid;

  /*通过设置网格开始线和结束线来定位元素，打开调试工具可以查看网格线*/
  grid-template-columns:
    [full-width-start] minmax(12px, 1fr) [content-start] minmax(100% - 24px, 1200px) [content-end] minmax(
      12px,
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
</style>
