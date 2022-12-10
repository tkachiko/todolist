import axios from 'axios';

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type ResponseType<T = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: T
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  High = 2,
  Urgently = 3,
  Later = 4
}

export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

type UpdateTaskModel = {
  description: string
  title: string
  status: number
  priority: number
  startDate: string
  deadline: string
}

type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': process.env.REACT_APP_API_KEY
  }
});

export const todolistAPI = {
  getTodolist() {
    return instance.get<TodolistType[]>(`todo-lists`);
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title});
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title});
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<TaskType[]>(`todo-lists/${todolistId}/tasks`, {title});
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<TaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};
