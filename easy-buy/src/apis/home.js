// 封装获取 Banner ， 数据接口
import httpInstance from "@/utils/http";

export function getBannerAPI( params = {}){
  // 默认为 1 ，商品为 2
  // 不传递的话就是 1 
  const {distributionSite = '1'} = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}

// 封装 findHotAPI ，获取数据
export function findHotAPI(){
  return httpInstance({
    url: '/home/hot'
  })
}

// 封装 getNewsAPI
export function getNewsAPI(){
  return httpInstance({
    url:'/home/new'
  })
}

// 封装 getGoodsAPI
export function getGoodsAPI(){
  return httpInstance({
    url: '/home/goods'
  })
}