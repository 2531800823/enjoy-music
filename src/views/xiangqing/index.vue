<template>
  <div class="xiang-iner">
    <!-- 头部 滚动300 显示 -->
    <van-nav-bar
      v-show="isShow"
      title="商品详情"
      left-arrow
      border
      @click-left="onClickLeft"
      @click-right="showShare = true"
    >
      <template #right>
        <van-icon name="share-o" size="18" />
      </template>
    </van-nav-bar>
    <!-- /头部 滚动300 显示 -->

    <!-- 轮播图 -->
    <van-swipe @change="onChange" class="mySwipe">
      <van-swipe-item v-for="item in dataList.slides" :key="item.id">
        <img :src="item.img + '_750x750.jpg'" alt="" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }} / {{ dataList.slides && dataList.slides.length }}
        </div>
      </template>
    </van-swipe>
    <!-- /轮播图 -->

    <!-- 限时优惠 -->
    <div class="time-you" v-if="dataList.limitedTimeDetail">
      <div class="left">
        <div class="top">
          <h3>限时优惠</h3>
          <p>¥{{ dataList.limitedTimeDetail.price }}</p>
        </div>
        <div class="bottom">
          <van-icon name="clock-o" /> 预计
          {{ dataList.limitedTimeDetail.endTime }} 结束
        </div>
      </div>
      <div class="right"></div>
    </div>
    <!-- /限时优惠 -->

    <!-- 商品信息 -->
    <div class="shop">
      <div class="title">
        <span class="yang" :class="{ del: dataList.limitedTimeDetail }"
          >￥{{ dataList.priceRange }}</span
        >

        <span>最近销量：{{ dataList.saleCount }}</span>
      </div>

      <p>{{ dataList.name }}</p>

      <div class="jieshao" v-html="shopMiao"></div>

      <div class="link">
        <div class="item"><van-icon name="like-o" />喜欢</div>
        <div class="item" @click="showShare = true">
          <van-icon name="share-o" />分享
        </div>
      </div>
    </div>
    <!-- /商品信息 -->

    <!-- 选择商品规格 -->
    <div class="shop-gui" v-if="dataList.productSelect">
      <p>商品选择</p>
      <div class="gui">
        <a
          :class="{ active: item.isActive }"
          href="javascript:;"
          v-for="item in dataList.productSelect"
          :key="item.id"
          @click="$router.push('/product/' + item.id)"
        >
          {{ item.title }}
        </a>
      </div>
    </div>
    <!-- /选择商品规格 -->

    <!-- 选中商品数量 -->
    <div class="shop-count">
      <van-cell-group>
        <van-cell title="数量">
          <template>
            <van-stepper v-model="count" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <!-- /选中商品数量 -->

    <!-- 品牌 -->
    <div class="pinpai" v-if="dataList.supplier">
      <div class="left">
        <img :src="dataList.supplier.logo" alt="" />
      </div>
      <div class="right">
        <p>{{ dataList.supplier.name }}</p>
        <span>{{ dataList.supplier.remark }}</span>
      </div>
    </div>
    <!-- /品牌 -->

    <!-- 加入乐园 -->
    <div class="go-club">
      <div class="left">
        <img
          src="https://res.xlpai.com/static/images/club-logo.e1e520f.png"
          alt=""
        />
        <p>加入乐园</p>
      </div>
      <div class="right">
        <div class="user" v-for="item in clubData" :key="item.id">
          <img :src="item.cover" alt="" />
          <div class="tuwen">
            <p>{{ item.name }}</p>
            <span>粉丝：{{ item.fansCount }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- /加入乐园 -->

    <!-- 品牌音乐 + 用户评论推荐 -->
    <div class="xing-wai">
      <div v-if="tweets.articleList && tweets.articleList.length > 0">
        <div class="wenzhang" v-for="item in tweets.articleList" :key="item.id">
          <div class="top">
            <img :src="item.author.avatar" alt="" />
            <span>{{ item.author.name }}<van-icon name="star-o" /></span>
          </div>
          <div class="middle">
            <span>{{ item.content }}</span>
            <img :src="item.photos[0]" alt="" />
            <a href="javascript:;" class="wen-z">文章</a>
          </div>
          <div class="pingtui">
            <span>{{ item.time }}</span>
            <span><van-icon name="comment-o" />{{ item.replyCount }}</span>
            <span><van-icon name="good-job-o" />{{ item.likeCount }}</span>
            <span @click="showShare = true"
              ><van-icon name="share-o" />转发</span
            >
            <span @click="showShare = true"
              ><van-icon name="share-o" />分享</span
            >
          </div>
        </div>
      </div>
      <!-- 用户推荐 -->
      <div class="tui">
        <span v-if="tweets.userList && tweets.userList.length > 0"
          >有{{ tweets.total }}人推荐
          <img
            :src="item.avatar"
            alt=""
            v-for="item in tweets.userList"
            :key="item.id"
        /></span>
        <span v-else> 期待您的推荐</span>
        <button>推荐</button>
      </div>

      <!-- 推荐评论 -->
      <div
        class="tuiping"
        v-if="tweets.tweetList && tweets.tweetList.length > 0"
      >
        <div class="top">
          <div>
            <h3>用户推荐</h3>
            <van-icon name="arrow" />
          </div>
          <p>你可能还会喜欢来自消费者的推荐</p>
        </div>
        <div class="bottom" v-for="item in tweets.tweetList" :key="item.id">
          <p><img :src="item.author.avatar" alt="" />{{ item.author.name }}</p>
          <span>{{ item.content }}</span>
          <div class="pingtui">
            <span>{{ item.time }}</span>
            <span><van-icon name="comment-o" />{{ item.replyCount }}</span>
            <span><van-icon name="good-job-o" />{{ item.likeCount }}</span>
            <span @click="showShare = true"
              ><van-icon name="share-o" />转发</span
            >
            <span @click="showShare = true"
              ><van-icon name="share-o" />分享</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- /品牌音乐 + 用户评论推荐 -->

    <!-- 真正的推荐 -->
    <div class="tui-swipe">
      <div class="top">
        <div>
          <h3>推荐</h3>
        </div>
        <p>你可能还会喜欢来自消费者的推荐</p>
      </div>
      <div class="bottom">
        <van-swipe
          class="lunbo"
          height="200px"
          autoplay="3000"
          indicator-color="#ff2f5c"
        >
          <van-swipe-item v-for="(item, index) in swipeFormat" :key="index">
            <div class="item" v-for="item2 in item" :key="item2.id">
              <img :src="item2.cover" alt="" />
              <p>{{ item2.title }}</p>
              <span>￥{{ item2.price }}</span>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- /真正的推荐 -->

    <!-- 商品详情 -->
    <div class="content">
      <div class="title">
        <h3>商品详情</h3>
        <p>商品介绍与规格参数</p>
      </div>
      <div
        class="zhengpian"
        v-html="dataList.description && dataList.description.content"
      ></div>
    </div>
    <!-- /商品详情 -->

    <!-- 商品详情 文字 -->
    <div class="content">
      <div class="title">
        <h3>统一说明</h3>
        <p>购买商品注意事项</p>
      </div>

      <div class="zhengpian" v-html="dataList.explain"></div>
    </div>
    <!-- /商品详情 -->

    <div style="height: 50px"></div>

    <!-- 底部样式 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <!-- /底部样式 -->
    <!-- 分享 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="toShare"
    />
    <!-- /分享 -->
  </div>
</template>

<script>
import { getProduct, getClub, getTweets, getRecommend } from "@/api/product.js";
export default {
  created() {
    this.getList();
    this.getClub();
    this.getTweets();
    this.getRecommend();
  },
  data() {
    return {
      showShare: false, // 分享显示
      // 分享配置
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
      isShow: true,
      current: 0, // 轮播数
      dataList: {}, // 商品详情数据
      count: 1, // 商品选中数量
      clubData: [], // 加入乐园
      tweets: {}, // 用户推荐 品牌音乐
      swipeList: [], // 推荐轮播数据
    };
  },
  methods: {
    // 获取商品数据
    async getList() {
      const { result } = await getProduct(this.$route.params.id);
      // console.log(result);
      this.dataList = result;
    },
    // 加入乐园数据
    async getClub() {
      const { result } = await getClub(this.$route.params.id);
      this.clubData = result;
    },
    // 品牌音乐和用户
    async getTweets() {
      const { result } = await getTweets(this.$route.params.id);
      // console.log(result);
      this.tweets = result;
    },
    // 获取推荐轮播
    async getRecommend() {
      const { result } = await getRecommend(this.$route.params.id);
      this.swipeList = result.splice(0, 9);
      // console.log(result);
    },
    //   后退
    onClickLeft() {
      this.$router.back();
    },
    // 分享
    toShare() {
      this.$toast({
        message: "敬请期待...",
        icon: "weapp-nav",
      });
      this.showShare = false;
    },
    // 轮播切换
    onChange(index) {
      this.current = index;
    },
  },
  computed: {
    //   处理商品规格 换行
    shopMiao() {
      return this.dataList?.minorTitle?.replaceAll("\n", "<br/>");
    },
    swipeFormat() {
      let arr = [];
      for (let i = 0; i < this.swipeList?.length - 2; i += 3) {
        arr.push([
          this.swipeList[i],
          this.swipeList[i + 1],
          this.swipeList[i + 2],
        ]);
      }
      console.log(arr);
      return arr;
    },
  },

  watch: {
    // 监听路由跳转
    $route(val, old) {
      this.dataList = [];
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
.xiang-iner {
  background-color: #f5f6f8;
}
.mySwipe {
  height: 375px;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }
}
.custom-indicator {
  background-color: red;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  position: absolute;
  color: #fff;
  border: 1px solid #ddd;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  z-index: 10;
  text-align: center;
}

.time-you {
  width: 100%;
  height: 54px;
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    from(#fd9630),
    to(#fd4830)
  );
  display: flex;
  .left {
    padding: 8px;
    flex: 1;
    display: flex;
    .top {
      width: 72px;
      h3 {
        border: 1px solid #fff;
        color: #fff;

        font-size: 12px;
        border-radius: 2px;

        border-bottom-right-radius: 8px;
        padding: 2px 5px 0;
        margin: 0;
      }
      p {
        margin: 0;
        font-size: 19px;
        color: #fff;
      }
    }
    .bottom {
      flex: 1;
      align-self: center;
      text-align: right;
      color: #fff;
      font-size: 12px;
    }
  }
  .right {
    width: 60px;
    background-image: url("https://res.xlpai.com/static/images/limitTimeOffer.2520135.jpg");
    background-position: 50%;
    background-size: 100%;
  }
}
.shop {
  background-color: #fff;
  padding-top: 8px;
  .title {
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
    .yang {
      font-size: 19px;
      color: #ff2f5c;
      font-weight: 700;
    }
    span {
      color: #999;
      font-size: 12px;
    }
    .del {
      color: rgb(153, 153, 153);
      text-decoration: line-through;
      font-weight: normal;
    }
  }
  p {
    margin-top: 8px;
    padding: 0 12px;
    font-size: 15px;
    font-weight: 700;
  }
  .link {
    display: flex;
    border-top: 1px solid #f5f6f8;
    cursor: pointer;
    .item {
      flex: 1;
      text-align: center;
      font-size: 12px;
      padding: 8px 12px;
      color: #666;
      i {
        font-size: 16px;
        margin-right: 5px;
        color: #ddd;
      }
      &:first-child {
        border-right: 1px solid #f5f6f8;
      }
    }
  }
  .jieshao {
    padding: 0 12px 8px;
    margin-top: 8px;
    font-size: 13px;
    color: #ff4e90;
  }
}

// 商品选中数量
.shop-count {
  margin-top: 20px;
}
// 商品规格
.shop-gui {
  background-color: #fff;
  margin-top: 12px;
  padding: 8px 12px 0;
  p {
    font-size: 14px;
    color: #333;
  }
  .gui {
    margin-top: 8px;
    display: flex;
    flex-wrap: wrap;
    a {
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      padding: 0 8px;
      padding: 6px 6px;
      color: #666;
      margin-bottom: 12px;
      margin-right: 20px;
      display: block;
    }
  }
  .active {
    color: #fff !important;
    background-color: #ff4e90;
    border-color: #ff4e90;
  }
}

// 品牌
.pinpai {
  padding: 12px;
  margin-top: 12px;
  background-color: #fff;
  display: flex;
  .left {
    img {
      width: 40px;
      height: 40px;
    }
  }
  .right {
    margin-left: 10px;
    p {
      font-size: 14px;
      margin: 0;
      font-weight: 700;
      color: #333;
    }
    span {
      font-size: 12px;
      color: #999;
    }
  }
}

// 加入乐园
.go-club {
  margin: 20px 0;
  background-color: #fff;
  // overflow: hidden;
  display: flex;
  padding: 0 12px;
  .left {
    margin: 15px 0;
    text-align: center;
    padding: 0 10px;
    border-right: 1px solid #ddd;
    img {
      width: 25px;
      height: 25px;
    }
    p {
      color: #666;
      font-size: 12px;
      margin: 0;
    }
  }
  .right {
    display: flex;
    .user {
      padding: 15px 0;
      display: flex;
      align-items: center;
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin-left: 15px;
      }
      .tuwen {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        p {
          font-weight: 700;
          color: #333;
          font-size: 14px;
          margin: 5px 0;
        }
        span {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}

// 品牌音乐 + 用户评论推荐
.xing-wai {
  .wenzhang {
    padding: 12px;
    background-color: #fff;
    .top {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin-right: 10px;
      }
      span {
        font-size: 14px;
        color: #333;
        i {
          color: #39a9ed;
          margin-left: 5px;
          font-size: 18px;
        }
      }
    }
    .middle {
      display: flex;
      justify-content: space-between;
      position: relative;
      span {
        font-size: 14px;
        color: #000;
        width: 240px;
      }
      img {
        width: 58px;
        height: 58px;
      }
      .wen-z {
        position: absolute;
        left: 0;
        font-size: 12px;
        color: #999;
        border: 1px solid #999;
        padding: 3px 8px 0px;
        border-radius: 5px;
        bottom: 0;
      }
    }
  }

  .pingtui {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 14px;
      color: #999 !important;
      i {
        font-size: 16px;
        margin-right: 3px;
      }
    }
  }
  // <!-- 用户推荐 -->
  .tui {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    padding: 10px 12px;
    background-color: #fff;
    span {
      font-size: 12px;
      color: #999;
      img {
        vertical-align: middle;
        margin-left: 8px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
    }
    button {
      width: 64px;
      height: 24px;
      text-align: center;
      font-size: 12px;
      color: #ff2f5c;
      background: #fff;
      border: 1px solid #ff2f5c;
      border-radius: 2px;
    }
  }
  //  <!-- 推荐评论 -->
  .tuiping {
    background-color: #fff;
    .top {
      border-bottom: 1px solid #ddd;
      padding: 12px;
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h3 {
          font-size: 19px;
          color: #333;
          margin: 0;
        }
        i {
          font-size: 16px;
        }
      }
      p {
        font-size: 12px;
        color: #999;
        margin: 0;
        margin-top: 5px;
      }
    }
    .bottom {
      padding: 12px;
      p {
        font-size: 14px;
        color: #333;
        margin: 0;
        img {
          vertical-align: middle;
          margin-right: 10px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }
      }
      span {
        font-size: 14px;
        color: #000;
      }
    }
  }
}

// 真推荐
.tui-swipe {
  margin-top: 20px;
  background-color: #fff;
  .top {
    border-bottom: 1px solid #ddd;
    padding: 12px;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
        font-size: 19px;
        color: #333;
        margin: 0;
      }
      i {
        font-size: 16px;
      }
    }
    p {
      font-size: 12px;
      color: #999;
      margin: 0;
      margin-top: 5px;
    }
  }
  .bottom {
    width: 100%;
    height: 200px;
    .lunbo {
      color: #fff;
      font-size: 20px;
      .van-swipe-item {
        display: flex;
        justify-content: space-between;
      }
      .item {
        border-right: 1px solid #ddd;
        width: 33.33%;
        box-sizing: border-box;
        padding: 12px;
        &:nth-child(3) {
          border-right: none;
        }
        img {
          width: 100px;
          height: 100px;
        }
        p {
          width: 100px;
          font-size: 14px;
          color: #333;
          font-weight: 700;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          white-space: normal;
          margin: 0;
        }
        span {
          text-align: left;
          font-size: 17px;
          color: #ff2f5c;
          font-weight: 700;
        }
      }
      /deep/ .van-swipe__indicators {
        bottom: 0;
      }
    }
  }
}

// 商品详情页
.content {
  margin-top: 20px;
  background-color: #fff;
  .title {
    padding: 8px 12px;
    border-bottom: 1px solid #ddd;
    h3 {
      font-size: 17px;
      color: #333;
      margin: 0;
      margin-bottom: 10px;
    }
    p {
      font-size: 12px;
      color: #999;
      margin: 0;
    }
  }

  /deep/ .zhengpian {
    padding: 12px;
    width: 100vw;
    box-sizing: border-box;
    p {
      font-size: 14px;
      color: #999;
    }
    img {
      width: 100%;
    }
  }
}
</style>