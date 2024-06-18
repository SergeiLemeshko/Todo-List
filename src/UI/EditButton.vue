<template>
  <div @click='handleClick' class='btn-edit'></div>
</template>

<script setup lang='ts'>
  import { defineProps } from 'vue';
  import { useMainModalStore } from '@/store/useMainModalStore';
  import { storeToRefs } from 'pinia';
  import { useBodyClass } from '@/composables/useBodyClass';

  const modalStore = useMainModalStore();
  const { isEditModalOpen } = storeToRefs(modalStore);

  const props = defineProps<{
    openMainModal: () => void;
  }>();

  const handleClick = () => {
    props.openMainModal();
  };

  // предотвращает возможность взаимодействия со списком под модальным окном
  useBodyClass(isEditModalOpen);
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
</style>