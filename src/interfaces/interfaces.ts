export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  categoryName?: string;
}

export type ValueForCommonItem = Omit<Task, 'description' | 'categoryId'> & { description?: string };