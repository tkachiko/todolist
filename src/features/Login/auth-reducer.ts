import {Dispatch} from 'redux'
import {setAppErrorAC, setAppStatusAC, setInitializedAC} from '../../app/app-reducer'
import {ActionsType, AuthActionsType, LoginType, ResultCode} from '../../types/types'
import {authAPI} from '../../api/todolist-api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import axios, {AxiosError} from 'axios'
import {clearTodosDataAC} from '../TodolistsList/todolists-reducer'

export const SET_IS_LOGGED_IN = 'todolist/auth/SET_IS_LOGGED_IN'

const initialState = {
  isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return {...state, isLoggedIn: action.value}

    default:
      return state
  }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({type: SET_IS_LOGGED_IN, value} as const)

// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.login(data)
    if (res.data.resultCode === ResultCode.SUCCESS) {
      dispatch(setIsLoggedInAC(true))
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
  }
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  authAPI.logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC('succeeded'))
        dispatch(clearTodosDataAC())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}
export const initializeAppTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true))
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
    dispatch(setInitializedAC(true))
  }
}