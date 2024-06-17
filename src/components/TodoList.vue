<template>
  <div class="todo-list">
    <ul>
      <TodoItem 
        v-for="todo in todos" 
        :key="todo.id" 
        :item="todo"
        :isTodoPage="true"
        :confirmRemoveItem="confirmRemoveTask" 
        :openMainModal="openMainModal"
      />
    </ul>
    <ModalDelete
      ref="confirmModal"
      title="Удаление задачи"
      :message="titleToDelete"
      :onConfirm="removeTask"
      :onCancel="cancelRemoveTask"
    />
    <ModalMain
      v-if="isModalOpen"
      title="Создание задачи"
      nameBtn="Создать"
      :onSubmit="createTask"
    />
    <ModalMain
      v-if="isEditModalOpen"
      title="Редактирование задачи"
      nameBtn="Сохранить"
      :onSubmit="editTask"
    />
  </div>
  <SpinnerLoad :isLoading="isLoading" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { Category, Task } from '@/interfaces/interfaces';
import { useModalMainStore } from '../store/useModalMainStore';
import TodoItem from '@/components/TodoItem.vue';
import ModalDelete from '@/UI/ModalDelete.vue';
import ModalMain from '@/UI/ModalMain.vue';
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

export default defineComponent({
  name: 'TodoList',
  components: {
    ModalDelete,
    ModalMain,
    TodoItem,
    SpinnerLoad,
  },
  setup() {
    const modalStore = useModalMainStore();
    const { isModalOpen, isEditModalOpen } = storeToRefs(modalStore);
    const isLoading = ref<boolean>(false);

    const todos = ref<Task[]>([]);
    const categories = ref<Category[]>([]);
    const taskIdToDelete = ref<number | null>(null);
    const confirmModal = ref<InstanceType<typeof ModalDelete> | null>(null);
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

    return {
      todos,
      taskIdToDelete,
      confirmModal,
      isModalOpen, 
      isEditModalOpen,
      titleToDelete,
      nameDeleteTodo,
      isLoading,
      createTask,
      editTask,
      removeTask,
      confirmRemoveTask,
      cancelRemoveTask,
      openMainModal,
    };
  },
});
</script>