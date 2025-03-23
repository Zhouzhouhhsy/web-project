import { useIntersectionObserver } from "@vueuse/core"
// 定义懒加载插件
export const lazyPlugin = {
    install(app){
        // 全局懒加载指令
        app.directive('img-lazy', {
            // 当组件挂载好，同时组件进入视口在进行图片渲染
            mounted(el, binding){
                // el: 绑定的元素
                // binding：绑定元素的表达式的值
                const { stop } = useIntersectionObserver(
                    el, ([{ isIntersecting }]) => {
                        // 进入视口区
                        if(isIntersecting){
                            el.src = binding.value
                            // 停止监听
                            stop()
                        }
                    }
                )
            }
        })
    }
}