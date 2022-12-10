import {v1} from 'uuid';
import {ActionsType} from '../types/types';
import {TaskStateType} from '../App';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/todolist-api';

const initialState: TaskStateType = {};

export const tasksReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE_TASK': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      };
    }
    case 'ADD_TASK': {
      const newTask: TaskType = {
        id: v1(),
        title: action.title,
        status: TaskStatuses.New,
        todoListId: action.todolistId,
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
      };
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]]
      };
    }
    case 'CHANGE_TASK_STATUS': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId]
          .map(task => task.id === action.taskId ? {...task, status: action.status} : task)
      };
    }
    case 'CHANGE_TASK_TITLE': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId]
          .map(task => task.id === action.taskId ? {...task, title: action.title} : task)
      };
    }
    case 'ADD_TODOLIST': {
      return {
        ...state,
        [action.todolistId]: []
      };
    }
    case 'REMOVE_TODOLIST': {
      const stateCopy = {...state};
      delete stateCopy[action.todolistId];
      return stateCopy;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {type: 'REMOVE_TASK', taskId, todolistId} as const;
};
export const addTaskAC = (todolistId: string, newTaskTitle: string) => {
  return {type: 'ADD_TASK', todolistId, title: newTaskTitle} as const;
};
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
  return {type: 'CHANGE_TASK_STATUS', taskId, status, todolistId} as const;
};
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
  return {type: 'CHANGE_TASK_TITLE', taskId, title, todolistId} as const;
};