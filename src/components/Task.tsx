import {Checkbox, IconButton, ListItem} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import {RemoveCircle} from '@mui/icons-material';
import {ChangeEvent, FC, memo} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasks-reducer';
import {useDispatch} from 'react-redux';
import {TaskStatuses, TaskType} from '../api/todolist-api';

type TaskPropsType = {
  task: TaskType
  todolistId: string
}

export const Task: FC<TaskPropsType> = memo(({task, todolistId}) => {
  const dispatch = useDispatch();

  const removeTask = () => {
    dispatch(removeTaskAC(task.id, todolistId));
  };
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC(task.id, (e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New), todolistId));
  };
  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC(task.id, title, todolistId));
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