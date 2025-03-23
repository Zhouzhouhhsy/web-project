<template>
  <LayoutNav/>
  <LayoutFixed/>
  <LayoutHeader/>
  <!-- 路由渲染：展示区 -->
  <!-- :key="$route.fullPath" 让组件实例不复用，强制销毁重建 -->
  <!-- <RouterView :key="$route.fullPath"/> -->
  <!-- home页的组件呈现 -->
  <RouterView/>
  <LayoutFooter/>
</template>

<script setup lang="ts">
  import LayoutNav from './components/LayoutNav.vue'
  import LayoutHeader from './components/LayoutHeader.vue'
  import LayoutFooter from './components/LayoutFooter.vue'
  import LayoutFixed from './components/LayoutFixed.vue';
  import { useCategoryStore } from '@/stores/categoryStore'
  import { onMounted } from 'vue';

  const categoryStore = useCategoryStore()
  onMounted(() => {
    // 调用 getCategory 函数
    categoryStore.getCategory()
  }
  )
</script>

<style lang="scss" scoped>

</style>