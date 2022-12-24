import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC
} from '../features/TodolistsList/todolists-reducer';
import {addTaskAC, removeTaskAC, setTasksAC, updateTaskAC} from '../features/TodolistsList/tasks-reducer';
import {AppRootStateType} from '../app/store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {setStatusActionType} from '../app/app-reducer'

// api types
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
export type UpdateTaskModelType = {
  description: string
  title: string
  status: number
  priority: number
  startDate: string
  deadline: string
}
export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
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

// todolistsList types
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterType
}

// tasks types
export type TaskStateType = {
  [todolistId: string]: TaskType[]
}
export type UpdateDomainTaskModelType = {
  description?: string
  title?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}

//-----------------
// actions types
//-----------------

// tasks actions type
export type TasksActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType

// todolists actions type
export type TodolistsActionsType =
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

// all actions types for app
export type AppActionsType = TodolistsActionsType | TasksActionsType | setStatusActionType

export type ThunkAppDispatchType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
export type AppThunk = ThunkDispatch<AppRootStateType, unknown, AppActionsType>