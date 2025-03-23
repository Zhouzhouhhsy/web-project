// 封装所有和用户相关的 接口函数
import httpInstance from "@/utils/http";

export function loginAPI({account, password}){
  return httpInstance({
    url:'/login',
    method: 'POST',
    data:{
      account,
      password
    }
  })
}

export const getLikeListAPI = ({ limit = 4 }) => {
  return httpInstance({
    url:'/goods/relevant',
    params: {
      limit 
    }
  })
}

// 获取订单页信息
/*
params: {
	orderState:0,
  page:1,
  pageSize:2
}
*/

export const getUserOrder = (params) => {
  return httpInstance({
    url:'/member/order',
    method:'GET',
    params
  })
}

// 添加收货地址
export const addUserAddressAPI = (data) => {
  return httpInstance({
    url: '/member/address',
    method: 'POST',
    data
  })
}