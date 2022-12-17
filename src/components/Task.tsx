import {Checkbox, IconButton, ListItem} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import {RemoveCircle} from '@mui/icons-material';
import {ChangeEvent, FC, memo} from 'react';
import {removeTaskTC, updateTaskTC} from '../state/tasks-reducer';
import {TaskStatuses, TaskType} from '../api/todolist-api';
import {useAppDispatch} from '../state/store';

type TaskPropsType = {
  task: TaskType
  todolistId: string
}

export const Task: FC<TaskPropsType> = memo(({task, todolistId}) => {
  const dispatch = useAppDispatch();

  const removeTask = () => {
    dispatch(removeTaskTC(task.id, todolistId));
  };
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = (e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New);
    dispatch(updateTaskTC(todolistId, task.id, {status}));
  };
  const changeTaskTitle = (title: string) => {
    dispatch(updateTaskTC(todolistId, task.id, {title}));
  };

  const isDone = task.status === TaskStatuses.Completed;

  return (
    <ListItem
      key={task.id}
      className={isDone ? 'isDone' : 'notIsDone'}
      style={{
        padding: '0px',
        justifyContent: 'space-between',
        textDecoration: isDone ? 'line-through' : 'none'
      }}
    >
      <Checkbox
        checked={isDone}
        onChange={changeTaskStatus}
        size={'small'}
      />
      <EditableSpan value={task.title} onChange={changeTaskTitle}/>
      <IconButton onClick={removeTask}>
        <RemoveCircle
          color={'secondary'}
          fontSize={'small'}
        />
      </IconButton>
    </ListItem>
  );
});