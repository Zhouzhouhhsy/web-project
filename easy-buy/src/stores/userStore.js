// 封装用户相关数据
import { defineStore } from "pinia";
import {ref} from 'vue'
import {loginAPI} from '@/apis/user'
import {useCartStore} from './cartStore'
import {mergeCartAPI} from '@/apis/cart'
// 封装 state 和 actions

export const usegetUserStore = defineStore('user', () => {
  // 跨模块调用数据时，要在回调中执行，保证可以拿到数据
  const cartStore = useCartStore()

  // 1. 定义管理数据的state
  const userInfo = ref({})
  // 2. 定义获取接口数据的actions
  const getUserInfo = async ({account, password}) => {
    // 获取 登录 数据
  const res = await loginAPI({account, password})
  userInfo.value = res.result
  // 合并购物车,调用接口传递参数。使用map方法进行匹配
  await mergeCartAPI(cartStore.cartList.map((item) => {
    return {
      skuId: item.skuId,
      selected: item.selected,
      count: item.count
      }
    }))
  
  // 获取最新的购物车数据列表，重新渲染
  cartStore.updateNewCartList() 
  }

  // 退出时，清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    // 清除购物车
    cartStore.cleatCart()
  }

  // 3.return 数据和方法
  return {
    userInfo, getUserInfo, clearUserInfo
  }
},
// 配置数据持久化
{
  persist: true,
})