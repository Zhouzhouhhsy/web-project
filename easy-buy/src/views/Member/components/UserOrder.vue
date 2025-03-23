<template>
  <div class="order-container">
    <el-tabs @tab-change="tabChange">
      <!-- tab切换 -->
      <el-tab-pane
        v-for="item in tabTypes"
        :key="item.name"
        :label="item.label"
      />

      <div class="main-container">
        <div class="holder-container" v-if="orderList.length === 0">
          <el-empty description="暂无订单数据" />
        </div>
        <div v-else>
          <!-- 订单列表 -->
          <div
            class="order-item"
            v-for="(order, index) in orderList"
            :key="order.id"
          >
            <div class="head">
              <span>下单时间：{{ order.createTime }}</span>
              <span>订单编号：{{ order.id }}</span>
              <!-- 未付款，倒计时时间还有 -->
              <span class="down-time" v-if="order.orderState === 1">
                <i v-if="format[index]"  class="iconfont icon-down-time"></i>
                <b v-if="format[index]">付款截止: {{format[index]}}</b>
              </span>
            </div>
            <div class="body">
              <div class="column goods">
                <ul>
                  <li v-for="item in order.skus" :key="item.id">
                    <a class="image" href="javascript:;">
                      <img :src="item.image" alt="" />
                    </a>
                    <div class="info">
                      <p class="name ellipsis-2">
                        {{ item.name }}
                      </p>
                      <p class="attr ellipsis">
                        <span>{{ item.attrsText }}</span>
                      </p>
                    </div>
                    <div class="price">¥{{ item.realPay?.toFixed(2) }}</div>
                    <div class="count">x{{ item.quantity }}</div>
                  </li>
                </ul>
              </div>
              <div class="column state">
                <p>{{ fomartPayState(order.orderState) }}</p>
                <p v-if="order.orderState === 3">
                  <a href="javascript:;" class="green">查看物流</a>
                </p>
                <p v-if="order.orderState === 4">
                  <a href="javascript:;" class="green">评价商品</a>
                </p>
                <p v-if="order.orderState === 5">
                  <a href="javascript:;" class="green">查看评价</a>
                </p>
              </div>
              <div class="column amount">
                <p class="red">¥{{ order.payMoney?.toFixed(2) }}</p>
                <p>（含运费：¥{{ order.postFee?.toFixed(2) }}）</p>
                <p>在线支付</p>
              </div>
              <div class="column action">
                <el-button
                  v-if="order.orderState === 1"
                  type="primary"
                  size="small"
                  @click="$router.push(`/pay/?id=${order.id}`)"
                >
                  立即付款
                </el-button>
                <el-button
                  v-if="order.orderState === 3"
                  type="primary"
                  size="small"
                >
                  确认收货
                </el-button>
                <p><a href="javascript:;">查看详情</a></p>
                <p v-if="[2, 3, 4, 5].includes(order.orderState)">
                  <a href="javascript:;">再次购买</a>
                </p>
                <p v-if="[4, 5].includes(order.orderState)">
                  <a href="javascript:;">申请售后</a>
                </p>
                <!-- 删除订单 -->
                <p v-if="order.orderState === 1">
                  <a href="javascript:;">取消订单</a>
                </p>
              </div>
            </div>
          </div>
          <!-- 分页 -->
          <div class="pagination-container">
            <el-pagination
              @current-change="currentChange"
              :total="total"
              :page-size="params.pageSize"
              background
              layout="prev, pager, next"
            />
          </div>
        </div>
      </div>
    </el-tabs>
  </div>
</template>

<script setup>
import { getUserOrder } from "@/apis/user";
import { ref, onMounted, onUnmounted } from "vue";
import { useCountDown } from "@/composables/useCountDown";
import { useCartStore } from "@/stores/cartStore";
const cartStore = useCartStore();
const { formatTime, start } = useCountDown();
// tab列表
const tabTypes = [
  { name: "all", label: "全部订单" },
  { name: "unpay", label: "待付款" },
  { name: "deliver", label: "待发货" },
  { name: "receive", label: "待收货" },
  { name: "comment", label: "待评价" },
  { name: "complete", label: "已完成" },
  { name: "cancel", label: "已取消" },
];
// 订单列表
const orderList = ref([]);
const total = ref(0);
const params = ref({
  orderState: 0,
  page: 1,
  pageSize: 2,
});
const format = ref([]);
// // 可变数组
let tmp = ref([]);
const update = ref([]);
const getOrderList = async () => {
  const res = await getUserOrder(params.value);
  // console.log(res);
  orderList.value = res.result.items;
  total.value = res.result.counts;

  res.result.items.forEach((item) => {
    // 开始倒计时函数，赋值 time.value = currentTime， 根据time.value计算出属性formatTime.value
    if (item.countdown < 0) {
      tmp.value.push(0);
    } else {
      tmp.value.push(item.countdown);
    }
  });

  // 计算倒计时数据
  tmp.value.forEach((value) => {
    start(value);
    if (formatTime.value === "00分00秒") {
      format.value.push("已过期");
    } else {
      format.value.push(formatTime.value);
    }
  });
  // console.log('倒计时数组的数据',tmp.value, format.value);
};
onMounted(() => getOrderList());
// 进行数据更新
const updateData = () => {
  update.value = [];
  for (let i = 0; i < tmp.value.length; i++) {
    if (tmp.value[i] <= 0) {
      update.value.push("已过期");
    } else {
      tmp.value[i] -= 1;
      start(tmp.value[i]);
      update.value.push(formatTime.value);
    }
  }
  // console.log('每次更新的update数组', update.value);
  format.value = update.value;
  // console.log(format.value);
};
// 每隔一秒执行一次函数
let timeId = setInterval(() => {
  updateData();
}, 1000);

// 组件销毁时，清除定时器
onUnmounted(() => {
  timeId && clearInterval(timeId);
});
// tab切换：需要清空tmp， format数组
const tabChange = (type) => {
  // console.log(type);
  params.value.orderState = type;
  // 修改之后，重新调用
  tmp.value = [];
  format.value = [];
  getOrderList();
};
// currentChange 分页功能
const currentChange = (page) => {
  // console.log(page);
  params.value.page = page;
  tmp.value = [];
  format.value = [];
  getOrderList();
};

// 订单状态
const fomartPayState = (payState) => {
  const stateMap = {
    1: "待付款",
    2: "待发货",
    3: "待收货",
    4: "待评价",
    5: "已完成",
    6: "已取消",
  };
  return stateMap[payState];
};
</script>

<style scoped lang="scss">
.order-container {
  padding: 10px 20px;

  .pagination-container {
    display: flex;
    justify-content: center;
  }

  .main-container {
    min-height: 500px;

    .holder-container {
      min-height: 500px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;

  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;

    span {
      margin-right: 20px;

      &.down-time {
        margin-right: 0;
        float: right;

        i {
          vertical-align: middle;
          margin-right: 3px;
        }

        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }

    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }

  .body {
    display: flex;
    align-items: stretch;

    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;

      > p {
        padding-top: 10px;
      }

      &:first-child {
        border-left: none;
      }

      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;

        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;

            &:last-child {
              border-bottom: none;
            }

            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }

            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;

              p {
                margin-bottom: 5px;

                &.name {
                  height: 38px;
                }

                &.attr {
                  color: #999;
                  font-size: 12px;

                  span {
                    margin-right: 5px;
                  }
                }
              }
            }

            .price {
              width: 100px;
            }

            .count {
              width: 80px;
            }
          }
        }
      }

      &.state {
        width: 120px;

        .green {
          color: $xtxColor;
        }
      }

      &.amount {
        width: 200px;

        .red {
          color: $priceColor;
        }
      }

      &.action {
        width: 140px;

        a {
          display: block;

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }
}
</style>