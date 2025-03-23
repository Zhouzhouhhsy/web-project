// axios 配置基础实例
import axios from "axios"
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import {usegetUserStore} from '@/stores/userStore'
import { useRouter } from "vue-router" 
const httpInstance = axios.create({
  baseURL:'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 60000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 1. 从 pinia 中获取数据
  const userStore = usegetUserStore()
  const {token} = userStore.userInfo

  // 2.按照后端要求配置，拼接token数据
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore = usegetUserStore()
  const router = useRouter()
  // console.log(e);
  // 统一错误提示
  ElMessage({
    type:'warning',
    message: e.response.data.message
  })

  // 处理Token失效，处理401状态码错误
  if (e.response.status === 401){
    // 1. 清除本地数据
    userStore.clearUserInfo()
    // 2. 跳转到登录页面
    router.push({path: '/login'})
  }
  return Promise.reject(e)
})

// 暴露
export default httpInstance