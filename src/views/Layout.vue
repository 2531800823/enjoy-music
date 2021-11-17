<template>
  <div class="layou-container">
    <RouterView />

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
      <van-tabbar-item icon="manager-o" to="/user"
        >我</van-tabbar-item
      > </van-tabbar
    >o
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      active: 0,
    };
  },
  methods: {},
};
</script>

<style>
</style>