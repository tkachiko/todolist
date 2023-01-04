import {Provider} from 'react-redux'
import {ReactNode} from 'react'
import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer'
import {appReducer} from '../app/app-reducer'
import {AppRootStateType, RootReducerType} from '../app/store'
import {v1} from 'uuid'
import {TaskPriorities, TaskStatuses} from '../types/types'
import {authReducer} from '../features/Login/auth-reducer'
import {configureStore} from '@reduxjs/toolkit'
import {HashRouter} from 'react-router-dom'
import {ThemeProvider} from '@mui/material'
import {theme} from '../index'

const rootReducer: RootReducerType = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

const initialGlobalState: AppRootStateType = {
  todolists: [
    {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading'},
  ],
  tasks: {
    'todolistId1': [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
    ],
    'todolistId2': [
      {
        id: v1(),
        title: 'Milk',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
      {
        id: v1(),
        title: 'React Book',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
    ],
  },
  app: {
    status: 'succeeded',
    error: null as null | string,
    isInitialized: true,
  },
  auth: {
    isLoggedIn: true,
  },
}

export const storyBookStore = configureStore({
  reducer: rootReducer,
  preloadedState: initialGlobalState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
})

export const ReduxStoreProviderDecorator = (storyFn: () => ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
export const HashRouterDecorator = (storyFn: () => ReactNode) => {
  return <HashRouter><ThemeProvider theme={theme}>{storyFn()}</ThemeProvider></HashRouter>
}