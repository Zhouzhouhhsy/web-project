import {getCategoryAPI} from '@/apis/layout'
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('category', () => {
  const CategoryList = ref([])
  // 写成一个函数
  const getCategory = async () => {
  const res = await getCategoryAPI()
  CategoryList.value = res.result
}
  return {
    CategoryList, getCategory
  }
})

