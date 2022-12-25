import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {App} from './App'
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from '../features/TodolistsList/tasks-reducer'
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer'
import {AppRootStateType} from './store'
import {TaskPriorities, TaskStatuses} from '../types/types'
import {appReducer} from './app-reducer'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/App',
  component: App,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof App> = (args) => <App {...args} />

export const AppStory = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})

const initialGlobalState: AppRootStateType = {
  todolists: [
    {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
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
      },
    ],
  },
  app: {
    status: 'loading',
    error: null as null | string
  },
}

export const storyBookStore = createStore(rootReducer, initialGlobalState)