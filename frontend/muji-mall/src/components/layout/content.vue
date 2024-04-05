<template>
  <view class="layout-content">
    <view class="middle">
      <slot />
    </view>
  </view>
</template>

<style scoped lang="less">
.layout-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: "left middle right";

  .middle {
    max-width: 1200px;
    width: 100vw;
    grid-area: middle;
  }

  /*  #ifdef MP-WEIXIN  */
  .middle {
    max-width: 1200rpx;
  }
  /*  #endif  */
}
</style>