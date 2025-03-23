import { useIntersectionObserver } from '@vueuse/core'
// 定义 懒加载 插件
export const lazyPlugin = {
  install(app){
    // 定义全局指令
    app.directive('img-lazy', {
      // 当组件被挂载好，就执行。只有当组件进入视口在进行图片的渲染，减少页面初始渲染时间
      mounted(el,binding){
        console.log('在homeHot组件绑定的元素',el, binding);
        // el: 指令绑定的元素 img
        // binding： binding.value 绑定元素的表达式的值  img.url
        console.log(el, binding.value);
        // 判断图片是否进入 视口区域
        const {stop} = useIntersectionObserver(
          el,
          // isIntersecting监听el是否进入视口，返回一个布尔值
          ([{ isIntersecting }]) => {
            console.log(isIntersecting);
            // 进入视口区
            if(isIntersecting){
              el.src = binding.value
              // 实现监听的图片第一次完成加载之后就停止监听
              stop()
            }
          },
        )
      }
    })
  }
}
