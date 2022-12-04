import React from 'react';
import './App.css';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {addTodolistAC} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TodolistWithRedux} from './components/TodolistWithRedux';

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

export const AppWithRedux: React.FC = () => {
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
  const dispatch = useDispatch();

  const addTodolist = (title: string): void => {
    dispatch(addTodolistAC(title));
  };

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
          {todolists.map(tl => {
            return (
              <Grid
                item
                key={tl.id}>
                <Paper
                  elevation={16}
                  style={{maxWidth: '280px', width: '100%', margin: '20px', padding: '20px'}}
                >
                  <TodolistWithRedux todolist={tl}/>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};
