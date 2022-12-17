import {ActionsType} from '../types/types';
import {todolistAPI, TodolistType} from '../api/todolist-api';
import {Dispatch} from 'redux';

const initialState: TodolistDomainType[] = [];

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterType
}

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case 'REMOVE_TODOLIST': {
      return state.filter(tl => tl.id !== action.todolistId);
    }
    case 'ADD_TODOLIST': {
      const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
      return [newTodolist, ...state];
    }
    case 'CHANGE_TODOLIST_FILTER': {
      return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl);
    }
    case 'CHANGE_TODOLIST_TITLE': {
      return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl);
    }
    case 'SET_TODOS': {
      return action.todolists.map(tl => ({
        ...tl,
        filter: 'all'
      }))
    }
    default:
      return state;
  }
};

// action creators
export const removeTodolistAC = (todolistId: string) => {
  return {type: 'REMOVE_TODOLIST', todolistId} as const;
};
export const addTodolistAC = (todolist: TodolistType) => {
  return {type: 'ADD_TODOLIST', todolist} as const;
};
export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) => {
  return {type: 'CHANGE_TODOLIST_FILTER', todolistId, filter} as const;
};
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return {type: 'CHANGE_TODOLIST_TITLE', todolistId, title} as const;
};
export const setTodolistsAC = (todolists: TodolistType[]) => {
  return {
    type: 'SET_TODOS',
    todolists
  } as const;
};

// thunk creators
export const getTodolistsTC = () => (dispatch: Dispatch) => {
  todolistAPI.getTodolist()
    .then(res => {
      dispatch(setTodolistsAC(res.data))
    })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistAPI.deleteTodolist(todolistId)
    .then(res => {
      dispatch(removeTodolistAC(todolistId))
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistAPI.createTodolist(title)
    .then(res => {
      dispatch(addTodolistAC(res.data.data.item))
    })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  todolistAPI.updateTodolist(todolistId, title)
    .then(res => {
      dispatch(changeTodolistTitleAC(todolistId, title))
    })
}
export const changeTodolistFilterTC = (title: string) => (dispatch: Dispatch) => {
  todolistAPI.createTodolist(title)
    .then(res => {
      dispatch(addTodolistAC(res.data.data.item))
    })
}