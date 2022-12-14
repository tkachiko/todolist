import axios, {AxiosResponse} from 'axios'
import {
  GetTasksResponse,
  LoginType,
  ResponseType,
  TaskType,
  TodolistType,
  UpdateTaskModelType,
  UserType,
} from '../types/types'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': process.env.REACT_APP_API_KEY,
  },
})

export const todolistAPI = {
  getTodolist() {
    return instance.get<TodolistType[]>(`todo-lists`)
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title})
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType<{ item: TodolistType }>>(`todo-lists/${todolistId}`, {title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}

export const authAPI = {
  logout() {
    return instance.delete<ResponseType>(`/auth/login`)
  },
  login(data: LoginType) {
    return instance.post<LoginType, AxiosResponse<ResponseType<{ userId: number }>>>(`/auth/login`, data)
  },
  me() {
    return instance.get<ResponseType<UserType>>(`/auth/me`)
  },
}
