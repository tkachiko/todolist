import React, {Reducer, useReducer} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {ActionsType} from './types/types';

export type TodolistType = {
  id: string
  title: string
  filter: FilterType
}
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TaskStateType = {
  [todolistId: string]: Array<TaskType>
}
export type FilterType = 'all' | 'active' | 'completed'

export const AppWithReducer: React.FC = () => {
  const todolistId_1 = v1();
  const todolistId_2 = v1();
  const [todolists, dispatchToTodolists] = useReducer<Reducer<TodolistType[], ActionsType>>(todolistsReducer, [
    {id: todolistId_1, title: 'What to learn', filter: 'all'},
    {id: todolistId_2, title: 'What to buy', filter: 'all'},
  ]);

  const [tasks, dispatchToTasks] = useReducer<Reducer<TaskStateType, ActionsType>>(tasksReducer, {
    [todolistId_1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
      {id: v1(), title: 'Rest API', isDone: false},
      {id: v1(), title: 'GraphQL', isDone: false},
    ],
    [todolistId_2]: [
      {id: v1(), title: 'Water', isDone: true},
      {id: v1(), title: 'Beer', isDone: true},
      {id: v1(), title: 'Toilet paper', isDone: false},
      {id: v1(), title: 'Buckwheat', isDone: false},
      {id: v1(), title: 'Meat', isDone: false},
    ],
  });

  // tasks
  const removeTask = (taskId: string, todolistId: string) => {
    const action = removeTaskAC(taskId, todolistId);
    dispatchToTasks(action);
  };
  const addTask = (todolistId: string, newTaskTitle: string): void => {
    const action = addTaskAC(todolistId, newTaskTitle);
    dispatchToTasks(action);
  };
  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    const action = changeTaskStatusAC(taskId, isDone, todolistId);
    dispatchToTasks(action);
  };
  const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
    const action = changeTaskTitleAC(taskId, title, todolistId);
    dispatchToTasks(action);
  };

  //todolists
  const addTodolist = (title: string): void => {
    const action = addTodolistAC(title);
    dispatchToTodolists(action);
    dispatchToTasks(action)
  };
  const removeTodolist = (todolistId: string): void => {
    const action = removeTodolistAC(todolistId);
    dispatchToTodolists(action);
    dispatchToTasks(action)
  };
  const changeTodolistFilter = (filter: FilterType, todolistId: string): void => {
    const action = changeTodolistFilterAC(todolistId, filter);
    dispatchToTodolists(action);
  };
  const changeTodolistTitle = (title: string, todolistId: string): void => {
    const action = changeTodolistTitleAC(todolistId, title);
    dispatchToTodolists(action);
  };

  const getFilteredTasks = (task: Array<TaskType>, filter: FilterType): Array<TaskType> => {
    let tasksForTodolist = task;
    if (filter === 'active') {
      tasksForTodolist = task.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
      tasksForTodolist = task.filter(t => t.isDone);
    }
    return tasksForTodolist;
  };

  const todolist = todolists.map(tl => {
    const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter);
    return (
      <Grid
        item
        key={tl.id}>
        <Paper
          elevation={16}
          style={{maxWidth: '280px', width: '100%', margin: '20px', padding: '20px'}}
        >
          <Todolist
            todolistId={tl.id}
            title={tl.title}
            filter={tl.filter}
            tasks={filteredTasks}
            removeTask={removeTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            changeTodolistFilter={changeTodolistFilter}
            changeTodolistTitle={changeTodolistTitle}
            removeTodolist={removeTodolist}
            changeTaskTitle={changeTaskTitle}
          />
        </Paper>
      </Grid>
    );
  });

  return (
    <div className="App">
      <AppBar position={'static'}>
        <Toolbar>
          <IconButton
            edge={'start'}
            color={'inherit'}
            aria-label={'menu'}
            sx={{mr: 2}}
          >
            <Menu/>
          </IconButton>
          <Typography
            variant={'h6'}
            component={'div'}
            sx={{flexGrow: 1}}
          >
            Todolists
          </Typography>
          <Button
            color={'inherit'}
            variant={'outlined'}
          >Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px 0'}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {todolist}
        </Grid>
      </Container>
    </div>
  );
};
