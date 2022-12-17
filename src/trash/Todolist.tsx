import React, {ChangeEvent, useEffect} from 'react';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../components/EditableSpan/EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from '@mui/material';
import {RemoveCircle} from '@mui/icons-material';
import {getTasksTC} from '../features/TodolistsList/tasks-reducer';
import {FilterType, TaskStatuses, TaskType} from '../types/types';
import {useAppDispatch} from '../app/hooks'

type TodolistPropsType = {
  todolistId: string
  title: string
  tasks: TaskType[]
  filter: FilterType
  removeTask: (taskId: string, todolistId: string) => void
  addTask: (todolistId: string, newTaskTitle: string) => void
  changeTaskStatus: (taskId: string, todolistId: string, status: TaskStatuses) => void
  changeTodolistFilter: (filter: FilterType, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
  changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasksTC(props.todolistId));
  }, []);

  const getTasksListItem = (t: TaskType) => {
    const removeTask = () => props.removeTask(t.id, props.todolistId);
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, props.todolistId, (e.currentTarget.checked ? TaskStatuses.New : TaskStatuses.Completed));
    const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todolistId);

    const isDone = t.status === TaskStatuses.Completed;

    return (
      <ListItem
        key={t.id}
        className={isDone ? 'isDone' : 'notIsDone'}
        style={{
          padding: '0px',
          justifyContent: 'space-between',
          textDecoration: isDone ? 'line-through' : 'none'
        }}
      >
        <Checkbox
          checked={isDone}
          onChange={changeTaskStatusHandler}
          size={'small'}
        />
        <EditableSpan value={t.title} onChange={changeTaskTitle}/>
        <IconButton onClick={removeTask}>
          <RemoveCircle
            color={'secondary'}
            fontSize={'small'}
          />
        </IconButton>
      </ListItem>
    );
  };

  const tasksList = props.tasks.length
    ? <List>{props.tasks.map(getTasksListItem)}</List>
    : <div style={{margin: '10px 0'}}>Your task list is empty :(</div>;
  const handlerCreator = (filter: FilterType) => () => {
    props.changeTodolistFilter(filter, props.todolistId);
  };
  const addTask = (title: string) => {
    props.addTask(props.todolistId, title);
  };
  const removeTodolist = () => {
    props.removeTodolist(props.todolistId);
  };
  const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.todolistId);

  return (
    <div>
      <Typography
        variant={'h5'}
        align={'center'}
        style={{fontWeight: 'bold', marginBottom: '20px'}}
      >
        <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
        <IconButton
          size={'small'}
          onClick={removeTodolist}
        ><RemoveCircle
          color={'secondary'}
          fontSize={'small'}
        /></IconButton>
      </Typography>
      <AddItemForm addItem={addTask}/>
      {tasksList}
      <div>
        <ButtonGroup
          variant={'contained'}
          size={'small'}
          fullWidth={true}
        >
          <Button
            color={props.filter === 'all' ? 'secondary' : 'primary'}
            onClick={handlerCreator('all')}
            style={{fontSize: '.7em', marginRight: '3px'}}
          >All
          </Button>
          <Button
            color={props.filter === 'active' ? 'secondary' : 'primary'}
            onClick={handlerCreator('active')}
            style={{fontSize: '.7em', marginRight: '3px'}}
          >Active
          </Button>
          <Button
            color={props.filter === 'completed' ? 'secondary' : 'primary'}
            onClick={handlerCreator('completed')}
            style={{fontSize: '.7em'}}
          >Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
