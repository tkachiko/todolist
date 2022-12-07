import {FC, memo, useCallback, useMemo} from 'react';
import {FilterType, TodolistType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, IconButton, List, Typography} from '@mui/material';
import {RemoveCircle} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {addTaskAC} from '../state/tasks-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from '../state/todolists-reducer';
import {Task} from './Task';

type TodolistPropsType = {
  todolist: TodolistType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export const TodolistWithRedux: FC<TodolistPropsType> = memo(({todolist}) => {
  const {id, title, filter} = todolist;

  let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id]);
  const dispatch = useDispatch();

  const addTask = useCallback((title: string) => {
    dispatch(addTaskAC(id, title));
  }, [dispatch, id]);
  const removeTodolist = useCallback(() => {
    dispatch(removeTodolistAC(id));
  }, [dispatch, id]);
  const changeTodolistTitle = useCallback((title: string) => {
    dispatch(changeTodolistTitleAC(id, title));
  }, [dispatch, id]);
  const handlerCreator = useCallback((filter: FilterType) => () => {
    dispatch(changeTodolistFilterAC(id, filter));
  }, [dispatch, id]);

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

  const filteredTasks = useMemo(() => getFilteredTasks(tasks, filter), [tasks, filter])

  return (
    <div>
      <Typography
        variant={'h5'}
        align={'center'}
        style={{fontWeight: 'bold', marginBottom: '20px'}}
      >
        <EditableSpan value={title} onChange={changeTodolistTitle}/>
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
        ? <List>{filteredTasks.map(t => {
          return <Task key={t.id} task={t} todolistId={id}/>
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
});
