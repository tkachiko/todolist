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
  FilterType,
  removeTodolistAC,
  TodolistDomainType,
  todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {ActionsType} from './types/types';
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolist-api';

export type TaskStateType = {
  [todolistId: string]: Array<TaskType>
}

export const AppWithReducer: React.FC = () => {
  const todolistId_1 = v1();
  const todolistId_2 = v1();
  const [todolists, dispatchToTodolists] = useReducer<Reducer<TodolistDomainType[], ActionsType>>(todolistsReducer, [
    {id: todolistId_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
  ]);

  const [tasks, dispatchToTasks] = useReducer<Reducer<TaskStateType, ActionsType>>(tasksReducer, {
    [todolistId_1]: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TaskStatuses.Completed,
        todoListId: todolistId_1,
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
      },
      {
        id: v1(),
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: todolistId_1,
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
      },
      {
        id: v1(),
        title: 'ReactJS',
        status: TaskStatuses.New,
        todoListId: todolistId_1,
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
      },
      {
        id: v1(),
        title: 'Rest API',
        status: TaskStatuses.New,
        todoListId: todolistId_1,
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
      },
      {
        id: v1(),
        title: 'GraphQL',
        status: TaskStatuses.New,
        todoListId: todolistId_1,
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
      },
    ],
    [todolistId_2]: [
      {
        id: v1(),
        title: 'Water',
        status: TaskStatuses.Completed,
        todoListId: todolistId_2,
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
      },
      {
        id: v1(),
        title: 'Beer',
        status: TaskStatuses.Completed,
        todoListId: todolistId_2,
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
      },
      {
        id: v1(),
        title: 'Toilet paper',
        status: TaskStatuses.New,
        todoListId: todolistId_2,
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
      },
      {
        id: v1(),
        title: 'Buckwheat',
        status: TaskStatuses.New,
        todoListId: todolistId_2,
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
      },
      {
        id: v1(),
        title: 'Meat',
        status: TaskStatuses.New,
        todoListId: todolistId_2,
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
      },
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
  const changeTaskStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
    const action = changeTaskStatusAC(taskId, status, todolistId);
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
    dispatchToTasks(action);
  };
  const removeTodolist = (todolistId: string): void => {
    const action = removeTodolistAC(todolistId);
    dispatchToTodolists(action);
    dispatchToTasks(action);
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
      tasksForTodolist = task.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === 'completed') {
      tasksForTodolist = task.filter(t => t.status === TaskStatuses.Completed);
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
