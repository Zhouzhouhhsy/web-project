// 封装购物车接口
import httpInstance from '@/utils/http'

// 加入购物车接口
export function addCartAPI({skuId, count}) {
  return httpInstance({
    url: '/member/cart',
    method: 'POST',
    data:{
      skuId,
      count
    }
  })
}

// 获取购物车最新列表接口
export const newCartListAPI = () => {
  return httpInstance({
    url: '/member/cart'
  })
}

// 删除购物车商品
export const deleteCartAPI = (ids) => {
  return httpInstance({
    url:'/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}

// 合并购物车
export const mergeCartAPI = (data) => {
  return httpInstance({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}