import { ref } from 'vue';
import { defineStore } from 'pinia';
import {getOrderAPI} from '@/apis/pay'

export const useOrderStore = defineStore('order', () => {
  const payInfo = ref({})
  const getOrder = async (id) => {
  const res = await getOrderAPI(id)
    payInfo.value = res.result
  }
  return {
    payInfo,
    getOrder
  }
}
)

