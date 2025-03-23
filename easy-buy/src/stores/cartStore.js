// 封装 购物车的数据相关
import { defineStore } from "pinia";
import { ref, computed } from "vue";

// 判断是否登录， token为判断依据
import {usegetUserStore} from './userStore'

import {addCartAPI, newCartListAPI, deleteCartAPI} from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  
  const useStore = usegetUserStore()
  const isLogin = computed(() => useStore.userInfo.token)
  // console.log(isLogin);
  // 1. 定义数据
  const cartList = ref([])

  // 优化点：新增和删除之后=都需要重新调用获取 购物列表的接口，因此可以封装提高复用
  const updateNewCartList = async () => {
    const res = await newCartListAPI()
    cartList.value = res.result
  }
  // 添加购物车
  const addCart = async (goods) => {
    // 添加购物车操作
    // 1.已添加过的， count + 1
    // 2.未添加的,直接push
    // 通过匹配传递过来的商品对象里面的skuId，是否在cartList中，在的话就说明已添加过了
    // console.log(goods);
    const {skuId, count} = goods
    // 登录的状态
    if (isLogin.value){
      // 登录之后的加入购物车逻辑
      // 加入购物车
      await addCartAPI({skuId, count})
      updateNewCartList()
    }
    // 非登录状态
    else{
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if(item) {
          item.count++
        }else{
          // 未找到
          cartList.value.push(goods)
        }

      }
    }
    
  // 删除功能
  const delCart = async (skuId) => {
    // 思路： 1.找到删除项的下标值， ---> splice
    // 2. 使用数组的过滤方法 ---> filter
    // const index = cartList.value.findIndex((item) => item.skuId === skuId)
    // cartList.value.slice(index,1)
    // const res = cartList.value.filter((item) => {
    //   return item.skuId !== skuId
    // })
    // cartList.value = res
    // 简写
    if (isLogin.value){
      // 调用删除接口，删除数据
      await deleteCartAPI([skuId])
      // 重新渲染购物车数据
      updateNewCartList()
    }else {
      cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
      }
    }
    
  // 单选框状态功能
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 全选中状态功能
  const allCheck = (selected) =>{
    cartList.value.forEach(item => {
      item.selected = selected
    })
  }

  // 清除购物车
  const cleatCart = () => {
    cartList.value = []
  }
  // 1.总的数量 ：所有商品 count 累加之和
  const totalCount = computed(() => cartList.value.reduce((pre,cur) => pre + cur.count, 0))
  // 2. 总的价钱：商品列表中的所有商品的 count * price 累加之和
  const totalPrice = computed(() => cartList.value.reduce((pre, cur) => pre + cur.count * cur.price, 0))

  // 3. 计算是否是全选状态
  const isAll = computed(() => cartList.value.every((item) => item.selected))
  // 4. 已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((pre,cur) => pre + cur.count,0))
  // 5. 已选择数量，商品价钱合计
  const selectedPrince = computed(() => cartList.value.filter(item => item.selected).reduce((pre,cur) => pre + cur.price * cur.count,0))
  return {
    cartList, addCart, delCart, totalCount, totalPrice, 
    singleCheck, isAll, allCheck, selectedCount, selectedPrince,
    cleatCart, updateNewCartList
  }
},{
  persist:true
})