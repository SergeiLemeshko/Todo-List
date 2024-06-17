import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { 
  NAME_MIN_LENGTH, 
  NAME_MAX_LENGTH, 
  DESCRIPTION_MAX_LENGTH, 
  CATEGORY_DESCRIPTION_MAX_LENGTH,
  PAGE_CATEGORIES
} from '@/constants/constants';

// валидация поля "Имя"
export const useNameValidation = () => {
  const isInvalidName = ref<boolean>(false);

  const validateName = (name: string) => {
    if (name.length >= NAME_MIN_LENGTH && name.length <= NAME_MAX_LENGTH) {
      isInvalidName.value = false;
    } else {
      isInvalidName.value = true;
      setTimeout(function() {
        isInvalidName.value = false;
      }, 1500);
    }
  };

  return { isInvalidName, validateName };
};

// валидация поля "Описание"
export const useDescriptionValidation = () => {
  const route = useRoute();
  const isInvalidDesc = ref<boolean>(false);

  const validateDescription = (description: string) => {
    const currentPageTodo = computed(() => route.path !== PAGE_CATEGORIES);
    
    if ((description.length >= DESCRIPTION_MAX_LENGTH && currentPageTodo.value) ||
      (description.length >= CATEGORY_DESCRIPTION_MAX_LENGTH && !currentPageTodo.value)) {
      isInvalidDesc.value = true;
      setTimeout(function() {
        isInvalidDesc.value = false;
      }, 1500);
    } else {
      isInvalidDesc.value = false;
    }
  };

  return { isInvalidDesc, validateDescription };
};