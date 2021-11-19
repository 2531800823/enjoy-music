<template>
  <div class="books-container">
    <!-- tabs -->
    <van-tabs
      v-model="active"
      title-active-color="#ff4e90"
      v-if="tabs.length > 1"
      @change="change"
    >
      <van-tab :title="item.name" v-for="item in tabs" :key="item.id"></van-tab>
    </van-tabs>
    <!-- /tabs -->

    <!-- 销量 -->
    <div class="liang">
      <span :class="[sumActive == 1 ? 'sumActive' : '']" @click="editActive(1)"
        >销量</span
      >
      <span
        class="top"
        :class="[
          sumActive == 2 ? 'sumActive' : '',
          sumActive == 2 && top ? 'sumtwo' : '',
        ]"
        @click="editActive(2)"
      >
        价格
        <em class="xiangxia"></em> <i></i
      ></span>
      <span
        class="top"
        :class="[
          sumActive == 3 ? 'sumActive' : '',
          sumActive == 3 && top ? 'sumtwo' : '',
        ]"
        @click="editActive(3)"
      >
        上架时间 <em class="xiangxia"></em> <i></i
      ></span>
    </div>
    <!-- /销量 -->
    <div class="shang">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="shuju">
          <ShopItem
            class="item"
            v-for="item in shopData"
            :key="item.id"
            :item="item"
            :id="item.id"
          />
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import ShopItem from "./shopItem.vue";
import { getHomeList, getHotList } from "@/api/home.js";
export default {
  components: {
    ShopItem,
  },
  async created() {
    this.id = this.$route.params.id;
    await this.getList();
    this.getShopList();
  },
  data() {
    return {
      id: 0,
      tabs: [], // tabs 数据
      active: "0", // tabs 选中
      sumActive: 1, // 销量
      top: false, // 排序
      dataId: 0, // 商品id
      page: 1, // 当前页
      shopData: [], // 商品数据
      loading: false, // 处于加载
      finished: false, // 没有数据了？
      filter: "sales", // 请求的是销量还是价格
      sort: "desc", // 升序 |  降序
      timer: null, // 防抖
    };
  },
  methods: {
    async getList() {
      const { result } = await getHomeList(this.id);
      this.tabs = result.modules[3].datalist;
      this.dataId = result.modules[3].datalist[0].category[0];
      //   console.log(this.tabs);
    },
    //   修改销量
    editActive(index) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        switch (index) {
          case 1:
            this.filter = "sales";
            break;
          case 2:
            this.filter = "price";
            break;
          case 3:
            this.filter = "time";
            break;
        }
        this.finished = false;
        this.page = 1;
        this.shopData = [];

        if (this.sumActive == index) {
          this.top = !this.top;
          this.sort = this.top ? "desc" : "asc";
          this.getShopList();

          return;
        }
        this.top = false;
        this.sort = this.top ? "desc" : "asc";
        this.sumActive = index;
        this.getShopList();
      }, 500);
    },
    // /products?cid=542&filter=sales&sort=desc&status=1&limit=8&page=4
    // 获取商品
    async getShopList() {
      const { result } = await getHotList({
        cid: this.dataId,
        filter: this.filter,
        sort: this.sort,
        status: 1,
        limit: 8,
        page: this.page,
      });
      if (!result?.datalist) {
        this.loading = false;
        return (this.finished = true);
      }
      this.loading = false;
      this.shopData.push(...result.datalist);
      this.page++;
    },
    // 加载数
    onLoad() {
      if (this.dataId === 0) return (this.loading = false);
      this.getShopList();
    },
    // 修改tabs 改变id 重新获取数据
    change(index) {
      this.dataId = this.tabs[index].category[0];
      this.finished = false;
      this.page = 1;
      this.shopData = [];
      this.filter = "sales";
      this.sort = "desc";
      this.sumActive = 1;
      this.top = false;
      this.getShopList();
    },
  },
  watch: {
    async $route(val, old) {
      this.id = this.$route.params.id;
      await this.getList();
      this.finished = false;
      this.page = 1;
      this.active = 0;
      this.shopData = [];
      this.filter = "sales";
      this.sort = "desc";
      this.sumActive = 1;
      this.top = false;
      this.getShopList();
    },
  },
};
</script>

<style lang="less" scoped>
.books-container {
  margin-top: 10px;
  background-color: #fff;
}
.liang {
  box-sizing: border-box;
  padding: 0 36px;
  height: 40px;
  line-height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #555;
  font-weight: 700;
  .top {
    position: relative;
    em {
      position: absolute;
      bottom: 6px;
      right: -15px;
      display: block;
      width: 0;
      border: 6px solid transparent;
      border-top-color: #ccc;
    }
    i {
      position: absolute;
      top: 6px;
      right: -15px;
      display: block;
      width: 0;
      border: 6px solid transparent;
      border-bottom-color: #ccc;
    }
  }
}
.sumActive {
  color: #fd4830;
  i {
    border-bottom-color: red !important;
  }
}
.sumtwo {
  color: #fd4830;
  em {
    border-top-color: red !important;
  }
  i {
    border-bottom-color: #ccc !important;
  }
}

.shang {
  padding-bottom: 55px;
  .shuju {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>