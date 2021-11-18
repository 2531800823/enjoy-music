<template>
  <div class="home-container">
    <!-- Tabs -->
    <van-tabs class="tabs" v-model="active" :line-width="25" :line-height="7">
      <van-tab title="唱片" to="/"> </van-tab>
      <van-tab title="图书" to="/books/898"> </van-tab>
      <van-tab title="影视" to="/books/930"> </van-tab>
      <van-tab title="音乐文创" to="/books/1047"> </van-tab>
      <van-tab title="影音设备" to="/books/849"> </van-tab>
    </van-tabs>
    <!-- /Tabs -->
    <router-view />
  </div>
</template>

<script>
import ZhuYe from "./component/ZhuYe.vue";
import Books from "./component/Books.vue";
export default {
  created() {
    this.active = this.arr.findIndex((item) => item == this.$route.params.id);
  },
  components: {
    ZhuYe,
    Books,
  },
  data() {
    return {
      active: "0",
      arr: ["", "898", "930", "1047", "849"],
    };
  },
  methods: {},
  watch: {
    $route() {
      this.$route.path == "/" ? (this.active = 0) : "";
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .tabs {
  .van-tabs__wrap {
    height: 40px;
  }
  .van-tab {
    line-height: 30px;
  }
  .van-tabs__line {
    background-color: #fe4f96;
  }
}
</style>