import {
  ThunkAppDispatchType,
  FilterType,
  TodolistDomainType,
  TodolistsActionsType,
  TodolistType,
} from '../../types/types'
import {todolistAPI} from '../../api/todolist-api'
import {setAppStatusAC} from '../../app/app-reducer'

export const REMOVE_TODOLIST = 'todolist/todolists/REMOVE_TODOLIST'
export const ADD_TODOLIST = 'todolist/todolists/ADD_TODOLIST'
export const CHANGE_TODOLIST_FILTER = 'todolist/todolists/CHANGE_TODOLIST_FILTER'
export const CHANGE_TODOLIST_TITLE = 'todolist/todolists/CHANGE_TODOLIST_TITLE'
export const SET_TODOS = 'todolist/todolists/SET_TODOS'

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case REMOVE_TODOLIST:
      return state.filter(tl => tl.id !== action.id)
    case ADD_TODOLIST:
      return [{...action.todolist, filter: 'all'}, ...state]
    case CHANGE_TODOLIST_FILTER:
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    case CHANGE_TODOLIST_TITLE:
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case SET_TODOS:
      return action.todolists.map(tl => ({...tl, filter: 'all'}))
    default:
      return state
  }
}

// actions
export const removeTodolistAC = (id: string) =>
  ({type: REMOVE_TODOLIST, id} as const)
export const addTodolistAC = (todolist: TodolistType) =>
  ({type: ADD_TODOLIST, todolist} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterType) =>
  ({type: CHANGE_TODOLIST_FILTER, id, filter} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
  ({type: CHANGE_TODOLIST_TITLE, id, title} as const)
export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({type: SET_TODOS, todolists} as const)

// thunks
export const getTodolistsTC = (): ThunkAppDispatchType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await todolistAPI.getTodolist()
    dispatch(setTodolistsAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    console.log(e)
    throw new Error()
  }
}
export const removeTodolistTC = (id: string): ThunkAppDispatchType => async (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  await todolistAPI.deleteTodolist(id)
  dispatch(removeTodolistAC(id))
  dispatch(setAppStatusAC('succeeded'))
}
export const addTodolistTC = (title: string): ThunkAppDispatchType => async (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  const res = await todolistAPI.createTodolist(title)
  dispatch(addTodolistAC(res.data.data.item))
  dispatch(setAppStatusAC('succeeded'))
}
export const changeTodolistTitleTC = (id: string, title: string): ThunkAppDispatchType => async (dispatch) => {
  dispatch(setAppStatusAC('loading'))
  await todolistAPI.updateTodolist(id, title)
  dispatch(changeTodolistTitleAC(id, title))
  dispatch(setAppStatusAC('succeeded'))
}