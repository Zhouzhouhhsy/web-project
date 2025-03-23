<template>
  <div class="container">
    <HomeCategory/>
    <HomeBanner/>
  </div>
  <HomeNew/>
  <HomeHot/>
  <HomeProduct/>
</template>

<script setup lang="ts">
  import HomeBanner from './components/HomeBanner.vue';
  import HomeHot from './components/HomeHot.vue'
  import HomeCategory  from './components/HomeCategory.vue'
  import HomeNew  from './components/HomeNew.vue'
  import HomeProduct from './components/HomeProduct.vue'
</script>

<style lang="scss" scoped>

</style>