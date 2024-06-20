<template>
  <div>
    <ul>
      <CommonItem 
        v-for='cat in categories' 
        :key='cat.id' 
        :item='cat'
        :isTodoPage='false'
        :confirmRemoveItem='confirmRemoveCategorie' 
        :openMainModal='openMainModal'
      />
    </ul>
    <DeleteModal
      ref='confirmModal'
      title='Удаление категории'
      :message='titleToDelete'
      :onConfirm='removeCategorie'
      :onCancel='cancelRemoveCategorie'
    />
    <MainModal
      v-if='isModalOpen'
      title='Создание категории'
      nameBtn='Создать'
      :onSubmit='createCategorie'
    />
    <MainModal
      v-if='isEditModalOpen'
      title='Редактирование категории'
      nameBtn='Сохранить'
      :onSubmit='editCategory'
    />
  </div>
  <SpinnerLoad :isLoading='isLoading' />
</template>

<script setup lang='ts'>
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { Category } from '@/interfaces/interfaces';
import { useMainModalStore } from '@/store/useMainModalStore';
import CommonItem from '@/components/CommonItem.vue';
import DeleteModal from '@/UI/DeleteModal.vue';
import MainModal from '@/UI/MainModal.vue';
import SpinnerLoad from '@/UI/SpinnerLoad.vue';
import { fetchData, addElem, updateElem, deleteElem } from '@/services/apiRequests';
import { 
  GET_CATEGORIES,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY
} from '@/constants/constants';

const modalStore = useMainModalStore();
const { isModalOpen, isEditModalOpen } = storeToRefs(modalStore);

const categories = ref<Category[]>([]);
const categorieIdToDelete = ref<number | null>(null);
const confirmModal = ref<InstanceType<typeof DeleteModal> | null>(null);
const nameDeleteCategorie = ref<string>('');
const isLoading = ref<boolean>(false);

onMounted(async () => {
  isLoading.value = true;
  categories.value = await fetchData<Category[]>(GET_CATEGORIES);
    if(categories.value) {
      setTimeout(function() {
      isLoading.value = false;
    }, 500);
  }
});

// создание категории
const createCategorie = async (newCategorie: Omit<Category, 'id'>) => {
  const addedCategorie = await addElem<Category>(newCategorie, ADD_CATEGORY);
  categories.value.push(addedCategorie);
};

// получаем id категории и показываем модальное окно
const confirmRemoveCategorie = (categorieId: number) => {
  categorieIdToDelete.value = categorieId;
  nameDeleteCategorie.value = categories.value.filter(с => с.id === categorieIdToDelete.value)[0].name;
  confirmModal.value?.show();
};

// удаление категории
const removeCategorie = async () => {
  if (categorieIdToDelete.value !== null) {
    await deleteElem<Category>(categorieIdToDelete.value, REMOVE_CATEGORY);
    categories.value = categories.value.filter(cat => cat.id !== categorieIdToDelete.value);
    categorieIdToDelete.value = null;
  }
};

const cancelRemoveCategorie = () => {
  categorieIdToDelete.value = null;
};

// редактирование категории
const editCategory = async (updatedCategory: Category) => {
  const responseCategory = await updateElem<Category>(updatedCategory, UPDATE_CATEGORY);
  const index = categories.value.findIndex(c => c.id === updatedCategory.id);
  if (index !== -1) {
    categories.value[index] = responseCategory;
  }
};

// показываем модальное окно редактирования
const openMainModal = () => {
  modalStore.openMainModal(true);
};

const titleToDelete = computed(() => `Вы уверены, что хотите удалить категорию “${nameDeleteCategorie.value}”?`);
</script>