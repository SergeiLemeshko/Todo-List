import { Category, Task } from '@/interfaces/interfaces';

// отображает на странице задач категории, привязанные к каждой задаче
export function displayCategoriesOnTaskPage(todos: Task[], categories: Category[]) {
  todos.forEach(todo => {
    const category = categories.find(c => c.id === todo.categoryId);
    if (category) {
      todo.categoryName = category.name;
    } else todo.categoryName = '';
  });
}