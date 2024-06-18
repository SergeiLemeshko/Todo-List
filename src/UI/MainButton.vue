<template>
  <button 
    type='button' 
    :class='[buttonClass, colorClass]'
    @click='handleClick'
  >
    <slot></slot>
  </button>
</template>

<script setup lang='ts'>
import { defineProps, withDefaults, computed } from 'vue';

const props = withDefaults(defineProps<{
  onClick?: () => void;
  size?: 'small' | 'medium';
  color?: 'blue' | 'white';
}>(), {
  size: 'medium',
  color: 'blue'
});

const handleClick = () => {
  props.onClick?.();
};

const buttonClass = computed(() => {
  return {
    'btn-small': props.size === 'small',
    'btn-medium': props.size === 'medium',
  };
});

const colorClass = computed(() => {
  return {
    'btn-blue': props.color === 'blue',
    'btn-white': props.color === 'white',
  };
});
</script>

<style scoped lang='scss'>
  .btn-small {
    height: 46px;
    width: 120px;
    font-size: 20px;
    border: 2px solid #3F72AF;
    border-radius: 4px;
    margin-left: 24px;
    cursor: pointer;
  }

  .btn-medium {
    height: 46px;
    width: 200px;
    border-radius: 4px;
    font-size: 20px;
    letter-spacing: 0.6px;
    cursor: pointer;
  }

  .btn-blue {
    background-color: #3F72AF;
    color: #FFFFFF;
    border: none;
  }

  .btn-white {
    background-color: #DBE2EF;
    color: #3F72AF;
  }

  .btn-blue:hover {
    background-color: #257FEA;
    transition: all ease 0.3s;
  }

  .btn-blue:focus {
    background-color: #257FEA;
    transition: all ease 0.3s;
  }

  .btn-blue:active {
    background-color: #65aaff9d;
  }
  
  .btn-white:hover {
    background-color: #257eea4f;
    color: #257FEA;
    border: 2px solid #257FEA;
    transition: all ease 0.3s;
  }

  .btn-white:focus {
    background-color: #257eea4f;
    color: #257FEA;
    border: 2px solid #257FEA;
    transition: all ease 0.3s;
  }

  .btn-white:active {
    background-color: #257FEA;
    color: #FFFFFF;
  }
</style>
