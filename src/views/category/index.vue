<template>
  <div class="categroy-container">
    <!-- 侧边导航栏 -->
    <div class="left">
      <van-sidebar class="mysidebar" v-model="activeKey">
        <van-sidebar-item
          :title="item.name"
          v-for="item in dataList"
          :key="item.id"
          >{{ 11 }}
        </van-sidebar-item>
      </van-sidebar>
    </div>

    <div class="right">
      <div class="item" v-for="(q, i) in dataList" :key="q.id">
        <div v-if="activeKey === i" style="width: 100%">
          <div
            class="zhonglei"
            v-for="(item, index) in q.property"
            :key="index"
          >
            <van-divider
              :style="{
                color: '#000',
                'font-weight': '700',
                borderColor: '#aaa',
              }"
              v-if="item.name && item.list.length > 0"
              content-position="left"
              >{{ item.name }}</van-divider
            >
            <div class="item2" v-if="item.list.length > 0">
              <div class="item3" v-for="item2 in item.list" :key="item2.id">
                <img :src="item2.logo.img" alt="" />
                <p>{{ item2.name }}</p>
              </div>
            </div>
          </div>

          <div class="zhonglei" v-if="q.brandList.length > 0">
            <van-divider
              :style="{
                color: '#000',
                'font-weight': '700',
                borderColor: '#aaa',
              }"
              content-position="left"
              >品牌</van-divider
            >
            <div class="item2" v-if="q.brandList.length > 0">
              <div class="item3" v-for="item2 in q.brandList" :key="item2.id">
                <img :src="item2.logo.img" alt="" />
                <p>{{ item2.name }}</p>
              </div>
            </div>
          </div>

          <div class="teshu" v-if="q.children && q.children.length > 0">
            <div class="item3" v-for="item2 in q.children" :key="item2.id">
              <img :src="item2.logo.img" alt="" />
              <p>{{ item2.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- /侧边导航栏 -->
  </div>
</template>

<script>
import { getCategroy } from "@/api/categroy.js";
export default {
  created() {
    this.getList();
  },
  data() {
    return {
      activeKey: 0, // 标签下标
      dataList: [], //数据
    };
  },
  methods: {
    async getList() {
      const { result } = await getCategroy();
      this.dataList = result;
    },
  },
};
</script>

<style lang="less" scoped>
.categroy-container {
  border-top: 1px solid #ddd;
  background-color: #fff;
  display: flex;
  overflow-y: auto;
  position: relative;
  height: 85vh;
  .left {
    height: 85vh;
    position: fixed;
    overflow-y: auto;
    background-color: #f5f6f8;
    text-align: center;
  }
  .right {
    margin-left: 80px;
    flex: 1;
    padding: 12px;

    .item {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
    }
    .zhonglei {
      width: 100%;
      flex: 1;
      .item2 {
        display: flex;
        flex-wrap: wrap;
        .item3 {
          width: 25%;
          text-align: center;
          margin-bottom: 20px;
        }
        img {
          width: 40px;
        }
        p {
          font-size: 12px;
          margin: 2px 0;
        }
      }
    }

    .teshu {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      .item3 {
        width: 25%;
        text-align: center;
        margin-bottom: 20px;
      }
      img {
        width: 40px;
      }
      p {
        font-size: 12px;
        margin: 2px 0;
      }
    }
  }
}
.mysidebar {
  overflow-y: auto;
}
</style>