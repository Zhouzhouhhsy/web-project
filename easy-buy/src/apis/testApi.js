// 测试一下 axios 基础配置
import httpInstance from "@/utils/http";

export function getCategory(){
  return httpInstance(
    {
      url: '/home/category/head'
    }
  )
}