import {
  TasksReducerActionsType,
  TaskStateType,
  TaskType,
  UpdateDomainTaskModelType,
  UpdateTaskModelType
} from '../../types/types';
import {todolistAPI} from '../../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../app/store';

const initialState: TaskStateType = {};

export const tasksReducer = (state = initialState, action: TasksReducerActionsType) => {
  const stateCopy = {...state};

  switch (action.type) {
    case 'REMOVE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      };
    case 'ADD_TASK':
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId]
          .map(task => task.id === action.taskId ? {...task, ...action.model} : task)
      };
    case 'ADD_TODOLIST':
      return {...state, [action.todolist.id]: []};
    case 'REMOVE_TODOLIST':
      delete stateCopy[action.id];
      return stateCopy;
    case 'SET_TODOS':
      action.todolists.forEach(tl => stateCopy[tl.id] = []);
      return stateCopy;
    case 'SET_TASKS':
      return {...state, [action.todolistId]: action.tasks};
    default:
      return state;
  }
};

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({type: 'REMOVE_TASK', taskId, todolistId} as const);
export const addTaskAC = (task: TaskType) =>
  ({type: 'ADD_TASK', task} as const);
export const updateTaskAC = (taskId: string, todolistId: string, model: UpdateDomainTaskModelType) =>
  ({type: 'UPDATE_TASK', taskId, todolistId, model} as const);
export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
  ({type: 'SET_TASKS', tasks, todolistId} as const);

// thunks
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch<TasksReducerActionsType>) => {
  todolistAPI.getTasks(todolistId)
    .then(res => {
      dispatch(setTasksAC(res.data.items, todolistId));
    });
};
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<TasksReducerActionsType>) => {
  todolistAPI.deleteTask(todolistId, taskId)
    .then(res => {
      dispatch(removeTaskAC(taskId, todolistId));
    });
};
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<TasksReducerActionsType>) => {
  todolistAPI.createTask(todolistId, title)
    .then(res => {
      dispatch(addTaskAC(res.data.data.item));
    });
};
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch<TasksReducerActionsType>, getState: () => AppRootStateType) => {
  const task = getState().tasks[todolistId].find(t => t.id === taskId);

  if (!task) console.warn('Task not found in the state');
  if (task) {
    const apiModel: UpdateTaskModelType = {
      title: task.title,
      status: task.status,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...domainModel
    };
    todolistAPI.updateTask(todolistId, taskId, apiModel)
      .then(res => {
        dispatch(updateTaskAC(taskId, todolistId, domainModel));
      });
  }
};
