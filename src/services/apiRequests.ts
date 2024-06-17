import request from '@/services/apiService';

// получение категорий или задач
export async function fetchData<T>(path: string): Promise<T> {
  return request<T>(path, 'GET');
}

// добавление категорий или задач
export async function addElem<T extends { id: number; name: string; description: string }>(
  newEntity: Omit<T, 'id'>,
  path: string
): Promise<T> {
  return request<T, Omit<T, 'id'>>(path, 'POST', newEntity);
}

// обновление категорий или задач
export async function updateElem<T extends { id: number; name: string; description: string }>(
  updatedResource: T,
  path: string
): Promise<T> {
  return request<T, T>(path, 'POST', updatedResource);
}

// удаление категорий или задач
export async function deleteElem<T extends { id: number }>(id: T['id'], path: string): Promise<void> {
  await request<void>(`${path}${id}`, 'GET');
}
