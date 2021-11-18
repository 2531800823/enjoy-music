<template>
  <div class="item">
    <img class="zhu" :src="item.cover" alt="" />
    <div class="zhanwei"></div>
    <h3>{{ item.title }}</h3>
    <div class="wen">
      <span>￥{{ item.price }}</span>
      <img
        class="shoukong"
        v-if="item.stock <= 0"
        src="https://res.xlpai.com/static/images/soldOut.e742b0e.png"
        alt=""
      />
      <van-icon name="shopping-cart-o" v-else />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  box-sizing: border-box;
  width: 50%;
  padding: 5px;
  position: relative;
  .zhu {
    width: 100%;
    height: 170px;
  }
  .zhanwei {
    padding-bottom: 10px;
    height: 16px;
  }
  h3 {
    margin: 0;
    margin-top: 5px;
    max-width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    white-space: normal;
    color: #000;
    font-size: 14px;
    min-height: 33px;
    font-weight: 400;
  }
  .wen {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 16px;
      line-height: normal;
      color: #ff2f5c;
    }
    i {
      font-size: 20px;
      color: #ff2f5c;
    }
  }

  .shoukong {
    width: 57px;
    height: 45px;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 1;
  }
}
</style>