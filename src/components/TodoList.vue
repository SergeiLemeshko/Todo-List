<template>
  <div class='todo-list'>
    <ul>
      <CommonItem 
        v-for='todo in todos' 
        :key='todo.id' 
        :item='todo'
        :isTodoPage='true'
        :confirmRemoveItem='confirmRemoveTask' 
        :openMainModal='openMainModal'
      />
    </ul>
    <DeleteModal
      ref='confirmModal'
      title='Удаление задачи'
      :message='titleToDelete'
      :onConfirm='removeTask'
      :onCancel='cancelRemoveTask'
    />
    <MainModal
      v-if='isModalOpen'
      title='Создание задачи'
      nameBtn='Создать'
      :onSubmit='createTask'
    />
    <MainModal
      v-if='isEditModalOpen'
      title='Редактирование задачи'
      nameBtn='Сохранить'
      :onSubmit='editTask'
    />
  </div>
  <SpinnerLoad :isLoading='isLoading' />
</template>

<script setup lang='ts'>
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { Category, Task } from '@/interfaces/interfaces';
import { useMainModalStore } from '@/store/useMainModalStore';
import CommonItem from '@/components/CommonItem.vue';
import DeleteModal from '@/UI/DeleteModal.vue';
import MainModal from '@/UI/MainModal.vue';
import SpinnerLoad from '@/UI/SpinnerLoad.vue';
import { displayCategoriesOnTaskPage } from '@/composables/useDisplayCatOnTaskPage';
import { fetchData, addElem, updateElem, deleteElem } from '@/services/apiRequests';
import { 
  GET_CATEGORIES,
  GET_TASKS,
  ADD_TASK,
  REMOVE_TASK,
  UPDATE_TASK
} from '@/constants/constants';

const modalStore = useMainModalStore();
const { isModalOpen, isEditModalOpen } = storeToRefs(modalStore);
const isLoading = ref<boolean>(false);

const todos = ref<Task[]>([]);
const categories = ref<Category[]>([]);
const taskIdToDelete = ref<number | null>(null);
const confirmModal = ref<InstanceType<typeof DeleteModal> | null>(null);
const nameDeleteTodo = ref<string>('');

onMounted(async () => {
  isLoading.value = true;
  todos.value = await fetchData<Task[]>(GET_TASKS);
    if(todos.value) {
      setTimeout(function() {
      isLoading.value = false;
    }, 500);
  }
  categories.value = await fetchData<Category[]>(GET_CATEGORIES);
    displayCategoriesOnTaskPage(todos.value, categories.value);
});

// создание задачи
const createTask = async (newTask: Omit<Task, 'id'>) => {
  const addedTask = await addElem<Task>(newTask, ADD_TASK);
  todos.value.push(addedTask);
  displayCategoriesOnTaskPage(todos.value, categories.value);
};

// получаем id задачи и показываем модальное окно
const confirmRemoveTask = (taskId: number) => {
  taskIdToDelete.value = taskId;
  nameDeleteTodo.value = todos.value.filter(t => t.id === taskIdToDelete.value)[0].name;
  confirmModal.value?.show();
};

// удаление задачи
const removeTask = async () => {
  if (taskIdToDelete.value !== null) {
    await deleteElem<Task>(taskIdToDelete.value, REMOVE_TASK);
    todos.value = todos.value.filter(task => task.id !== taskIdToDelete.value);
    taskIdToDelete.value = null;
  }
};

const cancelRemoveTask = () => {
  taskIdToDelete.value = null;
};

// редактирование задачи
const editTask = async (updatedTask: Task) => {
  const responseTask = await updateElem<Task>(updatedTask, UPDATE_TASK);
  const index = todos.value.findIndex(t => t.id === updatedTask.id);
  if (index !== -1) {
    todos.value[index] = responseTask;
  }
};

// показываем модальное окно редактирования
const openMainModal = () => {
  modalStore.openMainModal(true);
};

const titleToDelete = computed(() => `Вы уверены, что хотите удалить задачу “${nameDeleteTodo.value}”?`);
</script>