<script setup lang="ts">

</script>

<template>
  <!-- 本示例未包含完整css，获取外链css请参考上文，在hello uni-app项目中查看 -->
    <view>
      <view class="uni-padding-wrap uni-common-mt">
        <view>
          <scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
            <view id="demo1" class="scroll-view-item_H uni-bg-red">A</view>
            <view id="demo2" class="scroll-view-item_H uni-bg-green">B</view>
            <view id="demo3" class="scroll-view-item_H uni-bg-blue">C</view>
          </scroll-view>
        </view>
      </view>
    </view>
</template>

<style scoped lang="less">
.scroll-Y {
  height: 300rpx;
}
.scroll-view_H {
  white-space: nowrap;
  width: 100%;
}
.scroll-view-item {
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 36rpx;
}
.scroll-view-item_H {
  display: inline-block;
  width: 100%;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  font-size: 36rpx;
}
</style>