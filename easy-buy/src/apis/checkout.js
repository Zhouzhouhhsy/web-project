// 封装详情页接口
import httpInstance from "@/utils/http";

export const getCheckInfoAPI = () => {
  return httpInstance({
    url:'/member/order/pre'
  })
}


// 创建订单
export const creatOderAPI = (data) => {
  return httpInstance({
    url:'/member/order',
    method: 'POST',
    data
  })
}