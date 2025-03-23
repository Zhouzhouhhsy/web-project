import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import subCategory from '@/views/subCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          // 配置路由，动态传入参数，占位符
          path: 'category/:id',
          component: Category
        },
        {
          // 配置路由，动态传入参数，占位符
          path: 'category/sub/:id',
          component: subCategory
        },
        {
          // 配置路由，动态传入参数，占位符
          path: 'detail/:id',
          component: Detail
        },
        {
          // 配置路由路径，cartlist
          path:'cartlist',
          component: CartList
        },
        {
          path:'checkout',
          component: Checkout
        },
        {
          path: 'pay',
          component: Pay
        },
        {
          path:'paycallback',
          component: PayBack
        },
        {
          path: 'member',
          component: Member,
          // 路由重定向
          redirect:'/member/user',
          children:[
            {
              path: 'user',
              component: UserInfo
            },
            {
              path: 'order',
              component: UserOrder
            }
          ]
        }
      ]
    },
    {
      path:'/login',
      component: Login
    }
  ],
  // 定制路由滚动行为，每次跳转路由，页面都滚动到顶部
  scrollBehavior(){
    return {
      top: 0
    }
  }
})


export default router
