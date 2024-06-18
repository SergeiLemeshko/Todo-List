<template>
  <div class='close-button' @click='handleClick'></div>
</template>

<script setup lang='ts'>
  import { defineProps } from 'vue';

  const props = defineProps<{
    onClick: () => void;
  }>();

  const handleClick = () => {
    props.onClick();
  };
</script>

<style scoped lang='scss'>
.close-button {
  background-image: url('@/assets/close-btn.svg');
  background-repeat: no-repeat;
  background-size: contain;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>
