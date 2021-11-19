<template>
  <div class="zhuye">
    <!-- 轮播图 -->
    <van-swipe
      class="my-swipe"
      width="100%"
      :autoplay="4000"
      indicator-color="#007aff"
    >
      <van-swipe-item
        @click="toShop(item.url)"
        v-for="(item, index) in lunData"
        :key="index"
      >
        <img class="limgs" :src="item.image" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- /轮播图 -->

    <!-- 音乐 category -->
    <div class="category">
      <ul>
        <li v-for="item in categoryList" :key="item.id">
          <a href="javascript:;">
            <img :src="item.imageUrl" alt="" />
          </a>
        </li>
      </ul>
    </div>
    <!-- /音乐 category -->

    <!-- 第二轮播 -->
    <van-swipe
      class="my-swipe"
      width="100%"
      :autoplay="3000"
      indicator-color="#007aff"
    >
      <van-swipe-item v-for="(item, index) in swipeList" :key="index">
        <img class="limgs-two" :src="item.image" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- /第二轮播 -->

    <!-- 限时优惠 -->
    <div class="xianshi">
      <img
        class="titleimg"
        :src="timeList[0] && timeList[0].configure.imageUrl"
        alt=""
      />
      <div
        class="tuwen"
        v-for="item in timeData"
        :key="item.id"
        @click="toProduct(item.productId)"
      >
        <img :src="item.thumbnail" alt="" />
        <div class="wen">
          <h3>{{ item.productName }}号</h3>
          <p>{{ item.endTime }} 结束</p>
          <span>
            限时特惠：￥{{ item.activityPrice }}
            <del>￥{{ item.originalPrice }}00</del>
          </span>
        </div>
      </div>
    </div>
    <!-- /限时优惠 -->
    <!-- <img src="https://res.xlpai.com/static/images/soldOut.e742b0e.png" alt="" /> -->

    <!-- 火热预售 -->
    <div class="hot" v-for="q in formatData" :key="q.id">
      <img class="titleimg" :src="q.configure.imageUrl" alt="" />
      <div class="shang">
        <ShopItem
          class="item"
          v-for="item in q.children"
          :key="item.id"
          :item="item"
          :id="item.id"
        />
      </div>
    </div>
    <!-- /火热预售 -->

    <!-- 底部 -->
    <div class="footer">
      <img :src="timeList[4] && timeList[4].configure.imageUrl" alt="" />
      <img :src="timeList[5] && timeList[5].configure.imageUrl" alt="" />
    </div>
    <!-- /底部 -->
    <div style="height: 22px"></div>
  </div>
</template>

<script>
import ShopItem from "./shopItem.vue";
import { getHomeList, getTimeList, getHotList } from "@/api/home.js";
export default {
  async created() {
    await this.getList();
    this.getTimeList();
  },
  components: {
    ShopItem,
  },
  data() {
    return {
      lunData: [], // 轮播图
      categoryList: [], // 歌曲类型
      swipeList: [], // 2轮播图
      timeList: [], // 限时列表图片
      timeData: [], // 显示列表数据
      hotId: ["374", "308", "34"],
    };
  },
  methods: {
    //   获取轮播等数据
    async getList() {
      const res = await getHomeList();
      //   console.log(res.result);
      this.lunData = res.result.modules[2].datalist;
      this.categoryList = res.result.modules[3].datalist;
      this.swipeList = res.result.modules[5].configure.datalist;
      this.timeList = res.result.modules.filter((item, index) => {
        item.children = [];
        if (index > 5 && item.configure && item.configure.imageUrl) {
          return true;
        }
        return false;
      });
    },
    // 获取显示抢购数据
    async getTimeList() {
      const { result } = await getTimeList({
        count: 3,
      });
      //   console.log(result);
      this.timeData = result;

      for (let i = 0; i < this.hotId.length; i++) {
        this.getHotList(this.hotId[i], i + 1);
      }
    },
    // 请求 3 个数据
    getHotList(id, index) {
      getHotList({
        type: "toplist",
        cid: id,
        filter: "sales",
        sort: "desc",
        status: 1,
        limit: 10,
      }).then((res) => {
        // console.log(res);
        this.timeList[index].children = res.result.datalist;
      });
    },
    // 跳转详情页
    toProduct(id) {
      console.log(id);
      this.$router.push("/product/" + id);
    },
    toShop(val) {
      console.log(val);
      var arr = val.split("/");
      this.$router.push("/product/" + arr[arr.length - 1]);
    },
  },
  computed: {
    //   返回最后三个数据
    formatData() {
      return this.timeList.filter((item, index) => {
        if (index > 0 && index < 4) {
          return true;
        }
        return false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.zhuye {
  margin-top: 5px;
}
/deep/ .my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  line-height: 0;
  text-align: center;
  background-color: #fff;
}
::v-deep .van-swipe__indicator {
  width: 8px;
  height: 8px;
  background-color: #fff;
}
.limgs {
  width: 100%;
  height: 160px;
}
.limgs-two {
  width: 100%;
  height: 90px;
}
.category {
  background-color: #fff;
  padding: 10px 0;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 20%;
      a {
        display: block;
        img {
          width: 100%;
        }
      }
    }
  }
}
.xianshi {
  background-color: #fff;

  .tuwen {
    display: flex;
    align-items: center;
    padding: 10px;
    img {
      width: 100px;
      height: 100px;
    }
    .wen {
      padding-left: 15px;
      font-size: 14px;

      h3 {
        font-size: 14px;
        margin: 0;
        text-overflow: ellipsis;
        line-height: normal;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        white-space: normal;
        font-weight: 400;
      }
      p {
        font-size: 14px;
        margin: 5px 0;
        line-height: normal;
      }
      span {
        color: #ff4e90;
        font-weight: 700;
        del {
          font-size: 12px;
          font-weight: 400;
          color: #ccc;
        }
      }
    }
  }
}
.titleimg {
  width: 100%;
  height: 44px;
}
.hot {
  background-color: #fff;
  margin-top: 20px;
  .shang {
    display: flex;
    flex-wrap: wrap;
    .item {
      box-sizing: border-box;
      width: 50%;
      padding: 5px;
      position: relative;
      .zhu {
        width: 100%;
        min-height: 170px;
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
  }
}

.footer {
  background-color: #fff;
  margin-top: 20px;
  img {
    width: 100%;
  }
}
</style>