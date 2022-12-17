import {ActionsType} from '../types/types';
import {TaskStateType} from '../App';
import {TaskType, todolistAPI, UpdateTaskModelType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';

const initialState: TaskStateType = {};

export type UpdateDomainTaskModelType = {
  description?: string
  title?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}

export const tasksReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE_TASK': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      };
    }
    case 'ADD_TASK': {
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
      };
    }
    case 'UPDATE_TASK': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId]
          .map(task => task.id === action.taskId ? {...task, ...action.model} : task)
      };
    }
    case 'ADD_TODOLIST': {
      return {
        ...state,
        [action.todolist.id]: []
      };
    }
    case 'REMOVE_TODOLIST': {
      const stateCopy = {...state};
      delete stateCopy[action.todolistId];
      return stateCopy;
    }
    case 'SET_TODOS': {
      const stateCopy = {...state};
      action.todolists.forEach(tl => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    }
    case 'SET_TASKS': {
      const stateCopy = {...state};
      stateCopy[action.todolistId] = action.tasks;
      return stateCopy;
    }
    default:
      return state;
  }
};

// action creators
export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {type: 'REMOVE_TASK', taskId, todolistId} as const;
};
export const addTaskAC = (task: TaskType) => {
  return {type: 'ADD_TASK', task} as const;
};
export const updateTaskAC = (taskId: string, todolistId: string, model: UpdateDomainTaskModelType) => {
  return {type: 'UPDATE_TASK', taskId, todolistId, model} as const;
};
export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
  return {
    type: 'SET_TASKS',
    tasks,
    todolistId
  } as const;
};

// thunk creators
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistAPI.getTasks(todolistId)
    .then(res => {
      dispatch(setTasksAC(res.data.items, todolistId));
    });
};
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
  todolistAPI.deleteTask(todolistId, taskId)
    .then(res => {
      dispatch(removeTaskAC(taskId, todolistId));
    });
};
export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  todolistAPI.createTask(todolistId, title)
    .then(res => {
      dispatch(addTaskAC(res.data.data.item));
    });
};
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
  const task = getState().tasks[todolistId].find(t => t.id === taskId);

  if (!task) console.warn('Task not found in the state')
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
