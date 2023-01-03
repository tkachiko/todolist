import {
  RequestStatusType,
  ResultCode,
  TaskStateType,
  TaskType,
  ThunkAppDispatchType,
  UpdateDomainTaskModelType,
  UpdateTaskModelType,
} from '../../types/types'
import {todolistAPI} from '../../api/todolist-api'
import {AppRootStateType} from '../../app/store'
import {setAppErrorAC, setAppStatusAC} from '../../app/app-reducer'
import {addTodolistAC, changeTodolistEntityStatusAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer'
import axios, {AxiosError} from 'axios'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TaskStateType,
  reducers: {
    removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index > -1) {
        tasks.splice(index, 1)
      }
    },
    addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
      state[action.payload.task.todoListId].unshift(action.payload.task)
    },
    updateTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string, model: UpdateDomainTaskModelType }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = {...tasks[index], ...action.payload.model}
      }
    },
    setTasksAC(state, action: PayloadAction<{ tasks: TaskType[], todolistId: string }>) {
      state[action.payload.todolistId] = action.payload.tasks
    },
    changeTaskEntityStatusAC(state, action: PayloadAction<{ taskId: string, todolistId: string, entityStatus: RequestStatusType }>) {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index > -1) {
        tasks[index].entityStatus = action.payload.entityStatus
      }
    },
    clearDataAC(state) {
      state = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeTodolistAC, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(addTodolistAC, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(setTodolistsAC, (state, action) => {
        action.payload.todolists.forEach((tl: any) => state[tl.id] = [])
      })
  },
})

export const tasksReducer = slice.reducer
export const {
  removeTaskAC, addTaskAC,
  updateTaskAC, setTasksAC, changeTaskEntityStatusAC,
} = slice.actions

// thunks
export const fetchTasksTC = (todolistId: string): ThunkAppDispatchType => async (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  try {
    const res = await todolistAPI.getTasks(todolistId)
    dispatch(setTasksAC({tasks: res.data.items, todolistId: todolistId}))
    dispatch(setAppStatusAC({status: 'succeeded'}))
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const error = e.response ? e.response.data.message : e.message
      handleServerNetworkError(error, dispatch)
    } else {
      dispatch(setAppErrorAC({error: 'An unexpected error occurred'}))
    }
  }
}
export const removeTaskTC = (taskId: string, todolistId: string): ThunkAppDispatchType => async (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  dispatch(changeTaskEntityStatusAC({taskId, todolistId, entityStatus: 'loading'}))
  try {
    await todolistAPI.deleteTask(todolistId, taskId)
    dispatch(removeTaskAC({taskId, todolistId}))
    dispatch(setAppStatusAC({status: 'succeeded'}))
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const error = e.response ? e.response.data.message : e.message
      handleServerNetworkError(error, dispatch)
    } else {
      dispatch(setAppErrorAC({error: 'An unexpected error occurred'}))
    }
  } finally {
    dispatch(changeTaskEntityStatusAC({taskId, todolistId, entityStatus: 'idle'}))
  }
}
export const createTaskTC = (todolistId: string, title: string): ThunkAppDispatchType => async (dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'loading'}))
  try {
    const res = await todolistAPI.createTask(todolistId, title)
    if (res.data.resultCode === ResultCode.SUCCESS) {
      dispatch(addTaskAC({task: res.data.data.item}))
      dispatch(setAppStatusAC({status: 'succeeded'}))
    } else {
      handleServerAppError<{ item: TaskType }>(res.data, dispatch)
    }
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const error = e.response ? e.response.data.message : e.message
      handleServerNetworkError(error, dispatch)
    } else {
      dispatch(setAppErrorAC({error: 'An unexpected error occurred'}))
    }
  } finally {
    dispatch(changeTodolistEntityStatusAC({id: todolistId, entityStatus: 'idle'}))
  }
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): ThunkAppDispatchType => async (dispatch, getState: () => AppRootStateType) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  dispatch(changeTaskEntityStatusAC({taskId, todolistId, entityStatus: 'loading'}))

  const task = getState().tasks[todolistId].find(t => t.id === taskId)

  if (!task) console.warn('Task not found in the state')
  if (task) {
    const apiModel: UpdateTaskModelType = {
      title: task.title,
      status: task.status,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...domainModel,
    }
    try {
      const res = await todolistAPI.updateTask(todolistId, taskId, apiModel)
      if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(updateTaskAC({taskId, todolistId, model: domainModel}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (e) {
      if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
        const error = e.response ? e.response.data.message : e.message
        handleServerNetworkError(error, dispatch)
      } else {
        dispatch(setAppErrorAC({error: 'An unexpected error occurred'}))
      }
    } finally {
      dispatch(changeTaskEntityStatusAC({taskId, todolistId, entityStatus: 'idle'}))
    }
  }
}