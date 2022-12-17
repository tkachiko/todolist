import {FC, useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {addTodolistTC, getTodolistsTC, TodolistDomainType} from './state/todolists-reducer';
import {useAppDispatch, useAppSelector} from './state/store';
import {TodolistWithRedux} from './components/TodolistWithRedux';

export const AppWithRedux: FC = () => {
  const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists);
  const dispatch = useAppDispatch();

  const addTodolist = useCallback((title: string): void => {
    dispatch(addTodolistTC(title));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTodolistsTC());
  }, [dispatch]);

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
                  <TodolistWithRedux todolist={tl} filter={tl.filter}/>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};
