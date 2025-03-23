<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryDate.parentId}` }">{{categoryDate.parentName}}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{categoryDate.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- v-model绑定要发生变化的数据 -->
    <div class="sub-container">
      <el-tabs  v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>

      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
         <!-- 商品列表-->
         <!-- 渲染列表， v-for GoodsItem：只是一个item项 -->
          <GoodsItem v-for="goods in categoryList" :goods="goods" :key="goods.id"/>
          
      </div>

    </div>
  </div>
</template>

<script setup>
  import GoodsItem from '../Home/components/GoodsItem.vue';
  import {getCategoryFilterAPI} from '@/apis/category'
  import {getSubCategoryAPI} from '@/apis/category'
  import { ref, onMounted } from 'vue';
  import {useRoute} from 'vue-router'
  const route = useRoute()

  // 获取面包屑导航数据
  const categoryDate = ref({})
  const getcategoryData = async () => {
    const res = await getCategoryFilterAPI(route.params.id)
    // console.log(res.result);
    categoryDate.value = res.result
  }
  onMounted(() => getcategoryData())

  // 获取基础列表数据: post请求，带参数data
  const categoryList = ref([])
  const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
  })
  const getsubCategoryList = async () => {
    const res = await getSubCategoryAPI(reqData.value)
    // console.log(res);
    categoryList.value = res.result.items
  }
  onMounted(() => getsubCategoryList())

  // tabChange事件 tab切换时发生回调
  const tabChange = () => {
    // console.log(reqData.value.sortField);
    // 更新页数为 1
    reqData.value.page = 1
    getsubCategoryList()
  }

  // 加载完毕结束监听
  const disabled = ref(false)
  // 无限加载
  const load = async () => {
    reqData.value.page++
    const res = await getSubCategoryAPI(reqData.value)
    // es6 新语法，...拼接数组
    categoryList.value = [...categoryList.value, ...res.result.items]
    if (res.result.items.length === 0){
      disabled.value = true
    }
  }
</script>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>