<template>
  <div class='todo'>
    <TodoList/>
  </div>
</template>

<script setup lang='ts'>
import TodoList from '@/components/TodoList.vue';
</script>

<style scooped lang='scss'>
.todo {
  position: relative;
  flex-grow: 1;
}
</style>
