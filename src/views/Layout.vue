<template>
  <div class="layou-container">
    <!-- 搜索框 -->
    <van-search v-model="keywords" placeholder="请输入关键字搜索" />
    <!-- /搜索框 -->
    <router-view />

    <van-tabbar
      v-model="active"
      active-color="#ee0a24"
      inactive-color="#000"
      route
      fixed
    >
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="browsing-history-o" to="/shequ"
        >社区</van-tabbar-item
      >
      <van-tabbar-item icon="shopping-cart-o" to="/shop"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="manager-o" to="/user">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      active: 0,
      keywords: "",
    };
  },
  methods: {},
};
</script>

<style>
</style>