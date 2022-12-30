import { Dispatch } from 'redux'
import {ResponseType, SetErrorActionType, SetStatusActionType} from '../types/types'
import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer'

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType) => {
  dispatch(setAppErrorAC(error))
  dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetErrorActionType | SetStatusActionType>