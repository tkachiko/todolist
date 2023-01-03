import { Dispatch } from 'redux'
import {ResponseType, SetErrorActionType, SetStatusActionType} from '../types/types'
import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer'

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({error: data.messages[0]}))
  } else {
    dispatch(setAppErrorAC({error: 'Some error occurred'}))
  }
  dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType) => {
  dispatch(setAppErrorAC({error}))
  dispatch(setAppStatusAC({status: 'failed'}))
}

type ErrorUtilsDispatchType = Dispatch<SetErrorActionType | SetStatusActionType>