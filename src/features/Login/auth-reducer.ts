import {Dispatch} from 'redux'
import {setAppErrorAC, setAppStatusAC, setInitializedAC} from '../../app/app-reducer'
import {ActionsType, LoginType, ResultCode} from '../../types/types'
import {authAPI} from '../../api/todolist-api'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import axios, {AxiosError} from 'axios'
import {clearTodosDataAC} from '../TodolistsList/todolists-reducer'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
}

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  extraReducers: undefined,
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  try {
    const res = await authAPI.login(data)
    if (res.data.resultCode === ResultCode.SUCCESS) {
      dispatch(setIsLoggedInAC({isLoggedIn: true}))
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
  }
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  authAPI.logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({isLoggedIn: false}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
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
  dispatch(setAppStatusAC({status: 'loading'}))
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({isLoggedIn: true}))
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
    dispatch(setInitializedAC({isInitialized: true}))
  }
}