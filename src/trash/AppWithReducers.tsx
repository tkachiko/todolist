import React, {Reducer, useReducer} from 'react'
import '../app/App.css'
import {Todolist} from './Todolist'
import {v1} from 'uuid'
import {AddItemForm} from '../components/AddItemForm/AddItemForm'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Menu from '@mui/icons-material/Menu'
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from '../features/TodolistsList/todolists-reducer'
import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from '../features/TodolistsList/tasks-reducer'
import {
  FilterType,
  TaskPriorities,
  TasksActionsType,
  TaskStateType,
  TaskStatuses,
  TaskType,
  TodolistDomainType,
  TodolistsActionsType,
} from '../types/types'

export const AppWithReducers: React.FC = () => {
  const todolistId_1 = v1()
  const todolistId_2 = v1()
  const [todolists, dispatchToTodolists] = useReducer<Reducer<TodolistDomainType[], TodolistsActionsType>>(todolistsReducer, [
    {id: todolistId_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    {id: todolistId_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
  ])

  const [tasks, dispatchToTasks] = useReducer<Reducer<TaskStateType, TasksActionsType>>(tasksReducer, {
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
        description: '',
        entityStatus: 'idle',
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
        description: '',
        entityStatus: 'idle',
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
        description: '',
        entityStatus: 'idle',
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
        description: '',
        entityStatus: 'idle',
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
        description: '',
        entityStatus: 'idle',
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
        description: '',
        entityStatus: 'idle',
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
        description: '',
        entityStatus: 'idle',
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
        description: '',
        entityStatus: 'idle',
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
        description: '',
        entityStatus: 'idle',
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
        description: '',
        entityStatus: 'idle',
      },
    ],
  })

  // tasks
  const removeTask = (taskId: string, todolistId: string) => {
    const action = removeTaskAC({taskId, todolistId})
    dispatchToTasks(action)
  }
  const addTask = (todolistId: string, title: string): void => {
    const action = addTaskAC({
      task: {
        id: '1',
        title: title,
        status: TaskStatuses.New,
        todoListId: todolistId,
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
    })
    dispatchToTasks(action)
  }
  const changeTaskStatus = (taskId: string, todolistId: string, status: TaskStatuses) => {
    const action = updateTaskAC({taskId, todolistId, model: {status}})
    dispatchToTasks(action)
  }
  const changeTaskTitle = (taskId: string, title: string, todolistId: string) => {
    const action = updateTaskAC({taskId, todolistId, model: {title}})
    dispatchToTasks(action)
  }

  //TodolistsList
  const addTodolist = (title: string): void => {
    const action = addTodolistAC({todolist: {id: 'todolistId_1', title: title, order: 0, addedDate: ''}})
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }
  const removeTodolist = (todolistId: string): void => {
    const action = removeTodolistAC({id: todolistId})
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }
  const changeTodolistFilter = (filter: FilterType, todolistId: string): void => {
    const action = changeTodolistFilterAC({id: todolistId, filter})
    dispatchToTodolists(action)
  }
  const changeTodolistTitle = (title: string, todolistId: string): void => {
    const action = changeTodolistTitleAC({id: todolistId, title})
    dispatchToTodolists(action)
  }

  const getFilteredTasks = (task: Array<TaskType>, filter: FilterType): Array<TaskType> => {
    let tasksForTodolist = task
    if (filter === 'active') {
      tasksForTodolist = task.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
      tasksForTodolist = task.filter(t => t.status === TaskStatuses.Completed)
    }
    return tasksForTodolist
  }

  const todolist = todolists.map(tl => {
    const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter)
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
    )
  })

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
            <Menu />
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
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolist}
        </Grid>
      </Container>
    </div>
  )
}
