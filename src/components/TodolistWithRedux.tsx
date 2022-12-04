import React from 'react';
import {FilterType, TaskType, TodolistType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from '@mui/material';
import {RemoveCircle} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasks-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from '../state/todolists-reducer';

type TodolistPropsType = {
  todolist: TodolistType
}

export const TodolistWithRedux: React.FC<TodolistPropsType> = ({todolist}) => {
  const {id, title, filter} = todolist;

  let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id]);
  const dispatch = useDispatch();

  const addTask = (title: string) => {
    dispatch(addTaskAC(id, title));
  };
  const removeTodolist = () => {
    dispatch(removeTodolistAC(id));
  };
  const changeTodolistTitle = (title: string) => dispatch(changeTodolistTitleAC(id, title));
  const handlerCreator = (filter: FilterType) => () => {
    dispatch(changeTodolistFilterAC(id, filter));
  };

  if (filter === 'active') {
    tasks = tasks.filter(t => !t.isDone);
  }
  if (filter === 'completed') {
    tasks = tasks.filter(t => t.isDone);
  }

  return (
    <div>
      <Typography
        variant={'h5'}
        align={'center'}
        style={{fontWeight: 'bold', marginBottom: '20px'}}
      >
        <EditableSpan title={title} changeTitle={changeTodolistTitle}/>
        <IconButton
          size={'small'}
          onClick={removeTodolist}
        ><RemoveCircle
          color={'secondary'}
          fontSize={'small'}
        /></IconButton>
      </Typography>
      <AddItemForm addItem={addTask}/>
      {tasks.length
        ? <List>{tasks.map(t => {

          const removeTask = () => dispatch(removeTaskAC(t.id, id));
          const changeTaskStatusHandler = () => dispatch(changeTaskStatusAC(t.id, t.isDone, id));
          const changeTaskTitle = (title: string) => dispatch(changeTaskTitleAC(t.id, title, id));

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
              <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
              <IconButton onClick={removeTask}>
                <RemoveCircle
                  color={'secondary'}
                  fontSize={'small'}
                />
              </IconButton>
            </ListItem>
          );
        })}
        </List>
        : <div style={{margin: '10px 0'}}>Your task list is empty :(</div>}
      <div>
        <ButtonGroup
          variant={'contained'}
          size={'small'}
          fullWidth={true}
        >
          <Button
            color={filter === 'all' ? 'secondary' : 'primary'}
            onClick={handlerCreator('all')}
            style={{fontSize: '.7em', marginRight: '3px'}}
          >All
          </Button>
          <Button
            color={filter === 'active' ? 'secondary' : 'primary'}
            onClick={handlerCreator('active')}
            style={{fontSize: '.7em', marginRight: '3px'}}
          >Active
          </Button>
          <Button
            color={filter === 'completed' ? 'secondary' : 'primary'}
            onClick={handlerCreator('completed')}
            style={{fontSize: '.7em'}}
          >Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
