import {
  addTodolistAC, changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC, clearTodosDataAC,
  removeTodolistAC,
  setTodolistsAC,
} from '../features/TodolistsList/todolists-reducer'
import {
  addTaskAC,
  changeTaskEntityStatusAC,
  removeTaskAC,
  setTasksAC,
  updateTaskAC,
} from '../features/TodolistsList/tasks-reducer'
import {AppRootStateType} from '../app/store'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {setAppStatusAC, setAppErrorAC, setInitializedAC} from '../app/app-reducer'
import {setIsLoggedInAC} from '../features/Login/auth-reducer'

// api types
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type ResponseType<T = {}> = {
  resultCode: ResultCode
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
  entityStatus: RequestStatusType
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

export enum ResultCode {
  SUCCESS = 0,
  ERROR = 1,
  CAPTCHA = 10
}

// login types
export type LoginType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}
export type UserType = {
  id: number
  email: string
  login: string
}

// todolistsList types
export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterType
  entityStatus: RequestStatusType
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

// app types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

//-----------------
// actions types
//-----------------

// tasks actions type
export type TasksActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof changeTaskEntityStatusAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | clearTodosDataActionType

// todolists actions type
export type TodolistsActionsType =
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | clearTodosDataActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | changeTodolistEntityStatusActionType
type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
type changeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>
type clearTodosDataActionType = ReturnType<typeof clearTodosDataAC>

// app actions types
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetInitializedActionType = ReturnType<typeof setInitializedAC>
export type AppActionsType =
  | SetStatusActionType
  | SetErrorActionType
  | SetInitializedActionType

// auth actions types
export type SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>
export type AuthActionsType =
  | SetIsLoggedInType

// all actions types for app
export type ActionsType =
  TodolistsActionsType
  | TasksActionsType
  | SetStatusActionType
  | SetErrorActionType
  | SetIsLoggedInType
  | SetInitializedActionType

export type ThunkAppDispatchType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsType>
export type AppThunk = ThunkDispatch<AppRootStateType, unknown, ActionsType>