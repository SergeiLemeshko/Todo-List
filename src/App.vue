<template>
  <HeaderSection/>
  <RouterView/>
</template>

<script setup lang='ts'>
import HeaderSection from '@/components/HeaderSection.vue';
</script>

<style lang='scss'>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  text-align: center;
  font-family: Roboto;
}

body {
  background-color: #DBE2EF;
}
</style>
