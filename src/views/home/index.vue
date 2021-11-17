<template>
  <div class="home-container">
    <!-- 搜索框 -->
    <van-search v-model="keywords" placeholder="请输入关键字搜索" />
    <!-- /搜索框 -->

    <!-- 二级路由 -->
    <van-tabs v-model="active" :line-width="30">
      <van-tab title="唱片">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item>1</van-swipe-item>
          <van-swipe-item>2</van-swipe-item>
          <van-swipe-item>3</van-swipe-item>
          <van-swipe-item>4</van-swipe-item>
        </van-swipe>
      </van-tab>
      <van-tab title="图书">内容 2</van-tab>
      <van-tab title="影视">内容 3</van-tab>
      <van-tab title="音乐文创">内容 4</van-tab>
      <van-tab title="影音设备">内容 4</van-tab>
    </van-tabs>
    <!-- /二级路由 -->
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      keywords: "",
      active: "0",
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>