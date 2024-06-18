<template>
  <div class='categories'>
    <CategoriesList/>
  </div>
</template>

<script setup lang='ts'>
import CategoriesList from '@/components/CategoriesList.vue';
</script>

<style scooped lang='scss'>
.categories {
  position: relative;
  flex-grow: 1;
}
</style>
