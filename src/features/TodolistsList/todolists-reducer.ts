import {
  FilterType,
  RequestStatusType,
  ResultCode,
  ThunkAppDispatchType,
  TodolistDomainType,
  TodolistType,
} from '../../types/types'
import {todolistAPI} from '../../api/todolist-api'
import {setAppErrorAC, setAppStatusAC} from '../../app/app-reducer'
import axios, {AxiosError} from 'axios'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {fetchTasksTC} from './tasks-reducer'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index > -1) {
        state.splice(index, 1)
      }
    },
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
    },
    changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      state[index].filter = action.payload.filter
    },
    changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      state[index].title = action.payload.title
    },
    setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
      return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
    },
    changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      state[index].entityStatus = action.payload.entityStatus
    },
    clearTodosDataAC(state) {
      state = []
    },
  },
  extraReducers: undefined,
})

export const todolistsReducer = slice.reducer
export const {
  removeTodolistAC,
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  setTodolistsAC,
  changeTodolistEntityStatusAC,
  clearTodosDataAC,
} = slice.actions

// thunks
export const fetchTodolistsTC = (): ThunkAppDispatchType => async dispatch => {
  dispatch(setAppStatusAC({status: 'loading'}))
  try {
    const res = await todolistAPI.getTodolist()
    dispatch(setTodolistsAC({todolists: res.data}))
    dispatch(setAppStatusAC({status: 'succeeded'}))
    res.data.forEach((tl) => {
      dispatch(fetchTasksTC(tl.id))
    })
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const error = e.response ? e.response.data.message : e.message
      handleServerNetworkError(error, dispatch)
    } else {
      dispatch(setAppErrorAC({error: 'An unexpected error occurred'}))
    }
  }
}
export const removeTodolistTC = (id: string): ThunkAppDispatchType => async (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  dispatch(changeTodolistEntityStatusAC({id, entityStatus: 'loading'}))
  try {
    await todolistAPI.deleteTodolist(id)
    dispatch(removeTodolistAC({id}))
    dispatch(setAppStatusAC({status: 'succeeded'}))
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const error = e.response ? e.response.data.message : e.message
      dispatch(changeTodolistEntityStatusAC({id, entityStatus: 'idle'}))
      handleServerNetworkError(error, dispatch)
    } else {
      dispatch(setAppErrorAC({error: 'An unexpected error occurred'}))
    }
  }
}
export const addTodolistTC = (title: string): ThunkAppDispatchType => async (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  try {
    const res = await todolistAPI.createTodolist(title)
    if (res.data.resultCode === ResultCode.SUCCESS) {
      dispatch(addTodolistAC({todolist: res.data.data.item}))
      dispatch(setAppStatusAC({status: 'succeeded'}))
    } else {
      handleServerAppError<{ item: TodolistType }>(res.data, dispatch)
    }
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const error = e.response ? e.response.data.message : e.message
      handleServerNetworkError(error, dispatch)
    } else {
      dispatch(setAppErrorAC({error: 'An unexpected error occurred'}))
    }
  }
}
export const changeTodolistTitleTC = (id: string, title: string): ThunkAppDispatchType => async (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  dispatch(changeTodolistEntityStatusAC({id, entityStatus: 'loading'}))
  try {
    await todolistAPI.updateTodolist(id, title)
    dispatch(changeTodolistTitleAC({id, title}))
    dispatch(setAppStatusAC({status: 'succeeded'}))
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const error = e.response ? e.response.data.message : e.message
      handleServerNetworkError(error, dispatch)
    } else {
      dispatch(setAppErrorAC({error: 'An unexpected error occurred'}))
    }
  } finally {
    dispatch(changeTodolistEntityStatusAC({id, entityStatus: 'idle'}))
  }
}