import {AppActionsType, RequestStatusType} from '../types/types'

export const SET_STATUS = 'todolist/app/SET_STATUS'
export const SET_ERROR = 'todolist/app/SET_ERROR'
export const SET_INITIALIZED = 'todolist/app/SET_INITIALIZED'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as null | string,
  isInitialized: false,
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case SET_STATUS:
      return {...state, status: action.status}
    case SET_ERROR:
      return {...state, error: action.error}
    case SET_INITIALIZED:
      return {...state, isInitialized: action.value}
    default:
      return state
  }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) =>
  ({type: SET_STATUS, status} as const)
export const setAppErrorAC = (error: null | string) =>
  ({type: SET_ERROR, error} as const)
export const setInitializedAC = (value: boolean) =>
  ({type: SET_INITIALIZED, value} as const)