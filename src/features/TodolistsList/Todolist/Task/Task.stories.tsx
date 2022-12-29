import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';
import {ReduxStoreProviderDecorator} from '../../../../stories/ReduxStoreProviderDecorator';
import {TaskPriorities, TaskStatuses} from '../../../../types/types';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/Task',
  component: Task,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    changeTaskStatus: action('changeTaskStatus'),
    changeTaskTitle: action('changeTaskTitle'),
    removeTask: action('changeTaskStatus'),
    task: {
      id: 'taskId',
      title: 'taskTitle',
      status: TaskStatuses.New,
      todoListId: 'todolistId_1',
      addedDate: '',
      startDate: '',
      deadline: '',
      order: 0,
      priority: TaskPriorities.Low,
      description: '',
      entityStatus: 'idle'
    },
    todolistId: 'todolistId',
  },
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
  task: {
    id: 'taskId',
    title: 'taskTitle',
    status: TaskStatuses.New,
    todoListId: 'todolistId_1',
    addedDate: '',
    startDate: '',
    deadline: '',
    order: 0,
    priority: TaskPriorities.Low,
    description: '',
    entityStatus: 'idle'
  },
};