<template>
  <component 
    :is="tag" 
    :class='classButton' 
    @click='handleClick'
  >
    <slot></slot>
  </component>
</template>

<script setup lang='ts'>
import { defineProps, computed, withDefaults } from 'vue';

const props = withDefaults(defineProps<{
  buttonType: 'close' | 'delete' | 'edit' | 'add' | 'main';
  onClick?: () => void;
  size?: 'small' | 'medium';
  color?: 'blue' | 'white';
}>(), {
  size: 'medium',
  color: 'blue',
});

const handleClick = () => {
  props.onClick?.();
};

// меняем тег компонента, так как иногда нужен button, иногда div
const tag = computed(() => (props.buttonType === 'main' ? 'button' : 'div'));

const classButton = computed(() => {
  let classes = [];
  switch (props.buttonType) {
    case 'close':
      classes.push('btn-close');
      break;
    case 'delete':
      classes.push('btn-delete');
      break;
    case 'edit':
      classes.push('btn-edit');
      break;
    case 'add':
      classes.push('btn-add');
      break;
    case 'main':
      classes.push('btn-main', sizeClass.value, colorClass.value);
      break;
  }
  return classes;
});

const sizeClass = computed(() => {
  return props.size === 'small' ? 'btn-small' : 'btn-medium';
});

const colorClass = computed(() => {
  return props.color === 'blue' ? 'btn-blue' : 'btn-white';
});
</script>

<style scoped lang='scss'>
.btn-edit {
  background-image: url('@/assets/editIcon.svg');
  background-repeat: no-repeat;
  background-size: contain;
  width: 24px;
  height: 18px;
  cursor: pointer;
}

.btn-close {
  background-image: url('@/assets/close-btn.svg');
  background-repeat: no-repeat;
  background-size: contain;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.btn-delete {
  background-image: url('@/assets/deleteIcon.svg');
  background-repeat: no-repeat;
  background-size: contain;
  width: 24px;
  height: 18px;
  cursor: pointer;
}

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

.btn-main {
  cursor: pointer;
}

.btn-small {
  height: 46px;
  width: 120px;
  font-size: 20px;
  border: 2px solid #3F72AF;
  border-radius: 4px;
  margin-left: 24px;
}

.btn-medium {
  height: 46px;
  width: 200px;
  border-radius: 4px;
  font-size: 20px;
  letter-spacing: 0.6px;
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
