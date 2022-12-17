import {FC, memo, useCallback, useEffect, useMemo} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, IconButton, List, Typography} from '@mui/material';
import {RemoveCircle} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from '../state/store';
import {createTaskTC, getTasksTC} from '../state/tasks-reducer';
import {changeTodolistFilterAC, changeTodolistTitleTC, FilterType, removeTodolistTC,} from '../state/todolists-reducer';
import {Task} from './Task';
import {TaskStatuses, TaskType, TodolistType} from '../api/todolist-api';

type TodolistPropsType = {
  todolist: TodolistType
  filter: FilterType
}

export const TodolistWithRedux: FC<TodolistPropsType> = memo(({todolist, filter}) => {
  const {id, title} = todolist;

  let tasks = useAppSelector<Array<TaskType>>(state => state.tasks[id]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasksTC(id));
  }, [dispatch, id]);

  const addTask = useCallback((title: string) => {
    dispatch(createTaskTC(id, title));
  }, [dispatch, id]);
  const removeTodolist = useCallback(() => {
    dispatch(removeTodolistTC(id));
  }, [dispatch, id]);
  const changeTodolistTitle = useCallback((title: string) => {
    dispatch(changeTodolistTitleTC(id, title));
  }, [dispatch, id]);
  const handlerCreator = useCallback((filter: FilterType) => () => {
    dispatch(changeTodolistFilterAC(id, filter));
  }, [dispatch, id]);

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

  const filteredTasks = useMemo(() => getFilteredTasks(tasks, filter), [tasks, filter]);

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
          return <Task key={t.id} task={t} todolistId={id}/>;
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
