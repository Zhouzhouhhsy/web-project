// 封装倒计时函数
import {computed, ref, onUnmounted} from 'vue'
import dayjs from 'dayjs'
export function useCountDown(){
  let timeId = null
  // 1. 响应式数据
  const time = ref(0)
  // 格式化时间
  const formatTime = computed(() => dayjs.unix(time.value).format("mm分ss秒"))
  // 2.开始倒计时函数
  const start = (currentTime) => {
    // console.log('打印一下每次进来的数据', currentTime, typeof(currentTime));
    
    // 开始倒计时逻辑
    // 每隔一秒钟减一
    time.value = currentTime
    timeId = setInterval(() => {
      time.value--
    },1000)
  }
  // 组件销毁时，清除定时器
  onUnmounted(() => {
    timeId && clearInterval(timeId)
  })
  return {formatTime, start}
}