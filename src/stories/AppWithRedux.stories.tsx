import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AppWithRedux} from '../AppWithRedux';
import {ReduxStoreProviderDecorator} from '../state/ReduxStoreProviderDecorator';
import {combineReducers, createStore} from 'redux';
import {v1} from 'uuid';
import {tasksReducer} from '../state/tasks-reducer';
import {todolistsReducer} from '../state/todolists-reducer';
import {AppRootStateType} from '../state/store';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux {...args} />;

export const AppWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args


const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
});

const initialGlobalState = {
  todolists: [
    {id: 'todolistId1', title: 'What to learn', filter: 'all'},
    {id: 'todolistId2', title: 'What to buy', filter: 'all'}
  ],
  tasks: {
    ['todolistId1']: [
      {id: v1(), title: 'HTML&CSS', isDone: false},
      {id: v1(), title: 'JS', isDone: true}
    ],
    ['todolistId2']: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'React Book', isDone: false}
    ]
  }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);