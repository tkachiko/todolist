import {ThunkAppDispatchType, FilterType, TodolistDomainType, TodolistsActionsType, TodolistType} from '../../types/types'
import {todolistAPI} from '../../api/todolist-api'

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
  switch (action.type) {
    case 'REMOVE_TODOLIST':
      return state.filter(tl => tl.id !== action.id)
    case 'ADD_TODOLIST':
      return [{...action.todolist, filter: 'all'}, ...state]
    case 'CHANGE_TODOLIST_FILTER':
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    case 'CHANGE_TODOLIST_TITLE':
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case 'SET_TODOS':
      return action.todolists.map(tl => ({...tl, filter: 'all'}))
    default:
      return state
  }
}

// actions
export const removeTodolistAC = (id: string) =>
  ({type: 'REMOVE_TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) =>
  ({type: 'ADD_TODOLIST', todolist} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterType) =>
  ({type: 'CHANGE_TODOLIST_FILTER', id, filter} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
  ({type: 'CHANGE_TODOLIST_TITLE', id, title} as const)
export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({type: 'SET_TODOS', todolists} as const)

// thunks
export const getTodolistsTC = (): ThunkAppDispatchType => async dispatch => {
  try {
    const res = await todolistAPI.getTodolist()
    dispatch(setTodolistsAC(res.data))
  } catch (e) {
    console.log(e)
    throw new Error()
  }
}
export const removeTodolistTC = (id: string): ThunkAppDispatchType => (dispatch) => {
  todolistAPI.deleteTodolist(id)
    .then(() => {
      dispatch(removeTodolistAC(id))
    })
}
export const addTodolistTC = (title: string): ThunkAppDispatchType => (dispatch) => {
  todolistAPI.createTodolist(title)
    .then(res => {
      dispatch(addTodolistAC(res.data.data.item))
    })
}
export const changeTodolistTitleTC = (id: string, title: string): ThunkAppDispatchType => (dispatch) => {
  todolistAPI.updateTodolist(id, title)
    .then(() => {
      dispatch(changeTodolistTitleAC(id, title))
    })
}