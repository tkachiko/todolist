import React, {ChangeEvent} from 'react';
import {FilterType, TaskType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from '@mui/material';
import {RemoveCircle} from '@mui/icons-material';

type TodolistPropsType = {
  todolistId: string
  title: string
  tasks: TaskType[]
  filter: FilterType
  removeTask: (taskId: string, todolistId: string) => void
  addTask: (todolistId: string, newTaskTitle: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTodolistFilter: (filter: FilterType, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
  changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

  const getTasksListItem = (t: TaskType) => {
    const removeTask = () => props.removeTask(t.id, props.todolistId);
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId);
    const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todolistId);

    return (
      <ListItem
        key={t.id}
        className={t.isDone ? 'isDone' : 'notIsDone'}
        style={{
          padding: '0px',
          justifyContent: 'space-between',
          textDecoration: t.isDone ? 'line-through' : 'none'
        }}
      >
        <Checkbox
          checked={t.isDone}
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
