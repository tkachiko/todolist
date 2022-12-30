import {
  RequestStatusType,
  ResultCode,
  TasksActionsType,
  TaskStateType,
  TaskType,
  ThunkAppDispatchType,
  UpdateDomainTaskModelType,
  UpdateTaskModelType,
} from '../../types/types'
import {todolistAPI} from '../../api/todolist-api'
import {AppRootStateType} from '../../app/store'
import {setAppErrorAC, setAppStatusAC} from '../../app/app-reducer'
import {
  ADD_TODOLIST,
  changeTodolistEntityStatusAC, CLEAR_DATA,
  REMOVE_TODOLIST,
  SET_TODOS,
} from './todolists-reducer'
import axios, {AxiosError} from 'axios'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'

export const REMOVE_TASK = 'todolist/tasks/REMOVE_TASK'
export const ADD_TASK = 'todolist/tasks/ADD_TASK'
export const UPDATE_TASK = 'todolist/tasks/UPDATE_TASK'
export const SET_TASKS = 'todolist/tasks/SET_TASKS'
export const SET_ENTITY_STATUS = 'todolist/tasks/SET_ENTITY_STATUS'

const initialState: TaskStateType = {}

export const tasksReducer = (state = initialState, action: TasksActionsType) => {
  const stateCopy = {...state}

  switch (action.type) {
    case REMOVE_TASK:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId),
      }
    case ADD_TASK:
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
      }
    case UPDATE_TASK:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId]
          .map(task => task.id === action.taskId ? {...task, ...action.model} : task),
      }
    case ADD_TODOLIST:
      return {...state, [action.todolist.id]: []}
    case REMOVE_TODOLIST:
      delete stateCopy[action.id]
      return stateCopy
    case SET_TODOS:
      action.todolists.forEach(tl => stateCopy[tl.id] = [])
      return stateCopy
    case SET_TASKS:
      return {...state, [action.todolistId]: action.tasks}
    case SET_ENTITY_STATUS:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId]
          .map(t => t.id === action.taskId ? {...t, entityStatus: action.entityStatus} : t),
      }
    case CLEAR_DATA:
      return {}
    default:
      return state
  }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({type: REMOVE_TASK, taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
  ({type: ADD_TASK, task} as const)
export const updateTaskAC = (taskId: string, todolistId: string, model: UpdateDomainTaskModelType) =>
  ({type: UPDATE_TASK, taskId, todolistId, model} as const)
export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
  ({type: SET_TASKS, tasks, todolistId} as const)
export const changeTaskEntityStatusAC = (taskId: string, todolistId: string, entityStatus: RequestStatusType) =>
  ({type: SET_ENTITY_STATUS, taskId, todolistId, entityStatus} as const)

// thunks
export const fetchTasksTC = (todolistId: string): ThunkAppDispatchType => async (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await todolistAPI.getTasks(todolistId)
    dispatch(setTasksAC(res.data.items, todolistId))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const error = e.response ? e.response.data.message : e.message
      handleServerNetworkError(error, dispatch)
    } else {
      dispatch(setAppErrorAC('An unexpected error occurred'))
    }
  }
}
export const removeTaskTC = (taskId: string, todolistId: string): ThunkAppDispatchType => async (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(changeTaskEntityStatusAC(taskId, todolistId, 'loading'))
  try {
    await todolistAPI.deleteTask(todolistId, taskId)
    dispatch(removeTaskAC(taskId, todolistId))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const error = e.response ? e.response.data.message : e.message
      handleServerNetworkError(error, dispatch)
    } else {
      dispatch(setAppErrorAC('An unexpected error occurred'))
    }
  } finally {
    dispatch(changeTaskEntityStatusAC(taskId, todolistId, 'idle'))
  }
}
export const createTaskTC = (todolistId: string, title: string): ThunkAppDispatchType => async (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
  try {
    const res = await todolistAPI.createTask(todolistId, title)
    if (res.data.resultCode === ResultCode.SUCCESS) {
      dispatch(addTaskAC(res.data.data.item))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError<{ item: TaskType }>(res.data, dispatch)
    }
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const error = e.response ? e.response.data.message : e.message
      handleServerNetworkError(error, dispatch)
    } else {
      dispatch(setAppErrorAC('An unexpected error occurred'))
    }
  } finally {
    dispatch(changeTodolistEntityStatusAC(todolistId, 'idle'))
  }
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): ThunkAppDispatchType => async (dispatch, getState: () => AppRootStateType) => {
  dispatch(setAppStatusAC('loading'))
  dispatch(changeTaskEntityStatusAC(taskId, todolistId, 'loading'))

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
        dispatch(updateTaskAC(taskId, todolistId, domainModel))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    } catch (e) {
      if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
        const error = e.response ? e.response.data.message : e.message
        handleServerNetworkError(error, dispatch)
      } else {
        dispatch(setAppErrorAC('An unexpected error occurred'))
      }
    } finally {
      dispatch(changeTaskEntityStatusAC(taskId, todolistId, 'idle'))
    }
  }
}