// 封装分类数据业务相关代码
import {getFirstCategoryAPI} from '@/apis/category'
import {onMounted, ref ,watch} from 'vue'
// 使用 useRoute 接受 路由参数 parmas
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export function useCategory(){
    const route = useRoute()
    // console.log(route.params.id);
    // 获取一级分类 数据
    const categoryList = ref({})
    const getFirstCategory = async (id = route.params.id) => {
    const res = await getFirstCategoryAPI(id)
    // console.log(res);
    categoryList.value = res.result   
  }

    // getFirstCategory()
    onMounted(() => {
      getFirstCategory()
    })

    //  目标：路由参数发生变化时，可以把分类数据接口重新发送
    onBeforeRouteUpdate((to) => {
      // console.log('路由变化了');
      // console.log(to);
      getFirstCategory(to.params.id)
    })
    // 监视路由的变化
    // watch(() => route.params.id,(value) => {
    //   getFirstCategory(value)
    // })
     
    return {categoryList}
}