import axios from 'axios';
import {API_KEY} from '../../secret-variables';

type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

export type ResponseType<D> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': API_KEY
  }
});

export const todolistAPI = {
  getTodolist() {
    return instance.get<Array<TodolistType>>('todo-lists');
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title});
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType<{}>>(`/todo-lists/${todolistId}`, {title});
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`);
  }
};
