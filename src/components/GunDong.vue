<template>
  <div>
    <div class="backTop" @click="backTop($event), BackTop()"></div>
    <div class="backTopGif" v-show="flagBack">
      <img src="@/assets/img/boom.gif" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flagBack: false,
    };
  },
  methods: {
    BackTop() {
      // 页面滚动
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    backTop(e) {
      // 火箭滚动
      //  设置起点坐标和终点坐标
      let start = 100;
      let end = 870;
      let animation = setInterval(() => {
        // 每毫秒向上移动5px
        start += 5;
        e.target.setAttribute("style", " bottom: " + start + "px;");
        //  当达到终点坐标时
        if (start > end) {
          this.flagBack = true;
          // 清除定时器
          clearInterval(animation);
          // 回退起点
          e.target.setAttribute("style", " bottom:100px;");
          // 播放800毫秒的特效
          setTimeout(() => {
            this.flagBack = false;
          }, 800);
        }
      }, 1);
    },
  },
};
</script>
<style lang="less" scoped>
.backTop {
  position: fixed;
  right: 50px;
  bottom: 100px;
  // 鼠标小手
  cursor: pointer;
  width: 40px;
  height: 40px;
  background: url("../assets/img/rocket.png");
  background-size: 40px;
  z-index: 9999;
}

.backTopGif {
  z-index: 9999;
  position: fixed;
  top: -3px;
  right: 0px;
  img {
    width: 150px;
    transform: rotate(180deg);
  }
}
</style>