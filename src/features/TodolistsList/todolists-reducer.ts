import {
  FilterType,
  RequestStatusType,
  ResultCode,
  ThunkAppDispatchType,
  TodolistDomainType,
  TodolistsActionsType,
  TodolistType,
} from '../../types/types'
import {todolistAPI} from '../../api/todolist-api'
import {setAppErrorAC, setAppStatusAC} from '../../app/app-reducer'
import axios, {AxiosError} from 'axios'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'

export const REMOVE_TODOLIST = 'todolist/todolists/REMOVE_TODOLIST'
export const ADD_TODOLIST = 'todolist/todolists/ADD_TODOLIST'
export const CHANGE_TODOLIST_FILTER = 'todolist/todolists/CHANGE_TODOLIST_FILTER'
export const CHANGE_TODOLIST_TITLE = 'todolist/todolists/CHANGE_TODOLIST_TITLE'
export const SET_TODOS = 'todolist/todolists/SET_TODOS'
export const SET_ENTITY_STATUS = 'todolist/todolists/SET_ENTITY_STATUS'

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter(tl => tl.id !== action.id)
    case ADD_TODOLIST:
      return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
    case CHANGE_TODOLIST_FILTER:
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    case CHANGE_TODOLIST_TITLE:
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case SET_TODOS:
      return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
    case SET_ENTITY_STATUS:
      return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
    default:
      return state
  }
}

// actions
export const removeTodolistAC = (id: string) =>
  ({type: REMOVE_TODOLIST, id} as const)
export const addTodolistAC = (todolist: TodolistType) =>
  ({type: ADD_TODOLIST, todolist} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterType) =>
  ({type: CHANGE_TODOLIST_FILTER, id, filter} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
  ({type: CHANGE_TODOLIST_TITLE, id, title} as const)
export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({type: SET_TODOS, todolists} as const)
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
  ({type: SET_ENTITY_STATUS, id, entityStatus} as const)

// thunks
export const getTodolistsTC = (): ThunkAppDispatchType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await todolistAPI.getTodolist()
    dispatch(setTodolistsAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    console.log(e)
    throw new Error()
  }
}
export const removeTodolistTC = (id: string): ThunkAppDispatchType => async (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(changeTodolistEntityStatusAC(id, 'loading'))
  try {
    await todolistAPI.deleteTodolist(id)
    dispatch(removeTodolistAC(id))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const error = e.response ? e.response.data.message : e.message
      dispatch(changeTodolistEntityStatusAC(id, 'idle'))
      handleServerNetworkError(error, dispatch)
    } else {
      dispatch(setAppErrorAC('An unexpected error occurred'))
    }
  }
}
export const addTodolistTC = (title: string): ThunkAppDispatchType => async (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await todolistAPI.createTodolist(title)
    if (res.data.resultCode === ResultCode.SUCCESS) {
      dispatch(addTodolistAC(res.data.data.item))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError<{ item: TodolistType }>(res.data, dispatch)
    }
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      handleServerNetworkError(e.message, dispatch)
    } else {
      dispatch(setAppErrorAC('An unexpected error occurred'))
    }
  }
}
export const changeTodolistTitleTC = (id: string, title: string): ThunkAppDispatchType => async (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  await todolistAPI.updateTodolist(id, title)
  dispatch(changeTodolistTitleAC(id, title))
  dispatch(setAppStatusAC('succeeded'))
}