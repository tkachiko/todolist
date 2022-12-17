import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {AppThunk} from '../types/types'

// Use throughout your app instead of plain 'useDispatch' and 'useSelector'
export const useAppDispatch = () => useDispatch<AppThunk>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector