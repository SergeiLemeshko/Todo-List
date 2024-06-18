import { TODO_LIST_URL } from '@/constants/constants';

async function request<T, B = undefined>(
  path: string, // путь, который будет добавлен к базовому URL
  method: string,
  body?: B, // тело запроса, которое будет отправлено вместе с запросом (для метода POST)
): Promise<T> {
  const response = await fetch(`${TODO_LIST_URL + path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined, // если body присутствует, преобразуем в строку JSON и добавляется к запросу, иначе undefined
  });
  if (!response.ok) {
    const errorMessage = `The request was not executed with the status: ${response.status}`;
    alert(errorMessage);
    throw new Error(errorMessage);
  }

  // проверяем, есть ли содержимое в ответе. Если да, парсим в JSON, если нет возвращаем null
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export default request; 
