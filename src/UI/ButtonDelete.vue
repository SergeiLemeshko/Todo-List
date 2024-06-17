<template>
  <div @click="handleClick" class="btn-delete"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonDelete',
  props: {
    onDeleteItem: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const handleClick = () => {
      props.onDeleteItem();
    };

    return { handleClick }
  }
})
</script>

<style scoped lang="scss">
.btn-delete {
  background-image: url("../assets/deleteIcon.svg");
  background-repeat: no-repeat;
  background-size: contain;
  width: 24px;
  height: 18px;
  cursor: pointer;
}
</style>