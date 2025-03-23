import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// 本地引入 icon
import "@/assets/icon/iconfont.css"
// 引入初始化样式文件
import '@/styles/common.scss'
// 引入 图片懒加载插件
import {lazyPlugin} from '@/directives/index'
// 引入全局组件插件--图片放大效果（ImageView, Sku）
import {componentPlugin} from '@/components/index'
// 引入pinia数据持久化插件 piniaPluginPersistedstate
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')


