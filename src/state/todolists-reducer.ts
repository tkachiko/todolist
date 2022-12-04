import {FilterType, TodolistType} from '../App';
import {v1} from 'uuid';
import {ActionsType} from '../types/types';

const initialState: Array<TodolistType> = [];

export const todolistsReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE_TODOLIST': {
      return state.filter(tl => tl.id !== action.todolistId);
    }
    case 'ADD_TODOLIST': {
      const newTodolist: TodolistType = {
        id: action.todolistId,
        title: action.title,
        filter: 'all'
      };
      return [newTodolist, ...state];
    }
    case 'CHANGE_TODOLIST_FILTER': {
      return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl);
    }
    case 'CHANGE_TODOLIST_TITLE': {
      return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl);
    }
    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string) => {
  return {type: 'REMOVE_TODOLIST', todolistId} as const;
};
export const addTodolistAC = (newTodolistTitle: string) => {
  return {type: 'ADD_TODOLIST', title: newTodolistTitle, todolistId: v1()} as const;
};
export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) => {
  return {type: 'CHANGE_TODOLIST_FILTER', todolistId, filter} as const;
};
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return {type: 'CHANGE_TODOLIST_TITLE', todolistId, title} as const;
};