import { computed, ref, onUnmounted } from 'vue'
import dayjs from 'dayjs'

export function useCountDown(){
    let timeId = null

    // 创建响应式数据
    const time = ref(0)
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))

    // 倒计时函数
    const start = (currentTime) => {
        time.value = currentTime
        timeId =setInterval(() => {
            time.value--
        }, 1000)
    }
    onUnmounted(() => {
        timeId && clearInterval(timeId)
    })
    return {start, formatTime}
}


