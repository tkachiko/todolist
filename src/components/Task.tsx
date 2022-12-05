import {Checkbox, IconButton, ListItem} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import {RemoveCircle} from '@mui/icons-material';
import {FC, memo} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasks-reducer';
import {useDispatch} from 'react-redux';
import {TaskType} from './TodolistWithRedux';

type TaskPropsType = {
  task: TaskType
  todolistId: string
}

export const Task: FC<TaskPropsType> = memo(({task, todolistId}) => {
  const dispatch = useDispatch();

  const removeTask = () => {
    dispatch(removeTaskAC(task.id, todolistId));
  };
  const changeTaskStatus = () => {
    dispatch(changeTaskStatusAC(task.id, task.isDone, todolistId));
  };
  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC(task.id, title, todolistId));
  };

  return (
    <ListItem
      key={task.id}
      className={task.isDone ? 'isDone' : 'notIsDone'}
      style={{
        padding: '0px',
        justifyContent: 'space-between',
        textDecoration: task.isDone ? 'line-through' : 'none'
      }}
    >
      <Checkbox
        checked={task.isDone}
        onChange={changeTaskStatus}
        size={'small'}
      />
      <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
      <IconButton onClick={removeTask}>
        <RemoveCircle
          color={'secondary'}
          fontSize={'small'}
        />
      </IconButton>
    </ListItem>
  );
});