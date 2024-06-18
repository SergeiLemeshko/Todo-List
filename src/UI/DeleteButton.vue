<template>
  <div @click='handleClick' class='btn-delete'></div>
</template>

<script setup lang='ts'>
  import { defineProps } from 'vue';

  const props = defineProps<{
    onDeleteItem: () => void;
  }>();

  const handleClick = () => {
    props.onDeleteItem();
  };
</script>

<style scoped lang='scss'>
.btn-delete {
  background-image: url('@/assets/deleteIcon.svg');
  background-repeat: no-repeat;
  background-size: contain;
  width: 24px;
  height: 18px;
  cursor: pointer;
}
</style>