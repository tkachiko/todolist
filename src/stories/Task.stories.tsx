import React, {ChangeEvent, useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from '../components/Task';
import {action} from '@storybook/addon-actions';
import {useDispatch} from 'react-redux';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from '../components/EditableSpan';
import {Delete} from '@mui/icons-material';
import {removeTaskAC} from '../state/tasks-reducer';
import {ReduxStoreProviderDecorator} from '../state/ReduxStoreProviderDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/Task',
  component: Task,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    changeTaskStatus: action('changeTaskStatus'),
    changeTaskTitle: action('changeTaskTitle'),
    removeTask: action('changeTaskStatus'),
    task: {id: 'taskId', title: 'taskTitle', isDone: true},
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
  task: {id: 'taskId', title: 'taskTitle', isDone: false},
};

// const TemplateWork: ComponentStory<typeof Task> = (args) => {
//   const [task, setTask] = useState(args.task);
//   const dispatch = useDispatch();
//
//   const onClickHandler = () => dispatch(removeTaskAC(task.id, 'asfeafrgqwr'))
//   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     let newIsDoneValue = e.currentTarget.checked;
//     setTask({...task, isDone: newIsDoneValue});
//   };
//   const onTitleChangeHandler = (newValue: string) => {
//     setTask({...task, title: newValue});
//   };
//
//   console.log('Task');
//
//   return (
//     <div key={task.id} className={task.isDone ? 'is-done' : ''}>
//       <Checkbox
//         checked={task.isDone}
//         color="primary"
//         onChange={onChangeHandler}
//       />
//
//       <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
//       <IconButton onClick={onClickHandler}>
//         <Delete/>
//       </IconButton>
//     </div>
//   );
// };
//
// export const TaskWorkStory = TemplateWork.bind({
//   removeTask: action('changeTaskStatus'),
// });
