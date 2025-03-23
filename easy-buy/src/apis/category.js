import httpInstance from '@/utils/http'

// 封装获得一级商品分类数据的 接口
export function getFirstCategoryAPI(id){
  return httpInstance({
    url:'/category',
    params:{
      id: id
    }
  })
}

// 封装获得二级商品分类数据的 接口
/**
 * 
 * @param {*} id 
 * @returns 
 */
export const getCategoryFilterAPI = (id) => {
  return httpInstance({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}

/**
 * 获取基础列表数据
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
 * @returns 
 */
export function getSubCategoryAPI(data){
  return httpInstance({
    url:'/category/goods/temporary',
    method: 'POST',
    data
  })
}