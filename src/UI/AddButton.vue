<template>
  <div class='btn-add' @click='handleClick'>
    <slot></slot>
  </div>
</template>

<script setup lang='ts'>
  import { defineProps } from 'vue';

  const props = defineProps<{
    onClick: () => void;
  }>();

  // для обработки клика по кнопке
  const handleClick = () => {
    props.onClick();
  };
</script>

<style scoped lang='scss'>
.btn-add {
  outline: none;
  border: 0;
  background: transparent;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 400;
  color: #FFFFFF;
  cursor: pointer;
}

.btn-add:hover {
  color: #8FB6FF;
  transition: all .3s;
}
</style>
