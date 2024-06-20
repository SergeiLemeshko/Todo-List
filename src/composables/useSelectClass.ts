import { Ref, watchEffect } from 'vue';

// изменяет цвет 'Выберите категорию' в поле Категория в зависимости от того, открыт select или нет
export function useSelectClass(isOpenSelect: Ref<boolean>, currentSelect: Ref<HTMLDivElement | null>) {
  watchEffect(() => {
    if (!isOpenSelect.value && currentSelect.value) {
      if (currentSelect.value.textContent === 'Выберите категорию') {
        currentSelect.value.classList.add('text-categorie');
      }
    } else if (isOpenSelect.value && currentSelect.value) {
      currentSelect.value.classList.remove('text-categorie');
    }
  });
}