import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC
} from '../state/todolists-reducer';
import {addTaskAC, removeTaskAC, setTasksAC, updateTaskAC} from '../state/tasks-reducer';

export type ActionsType =
  ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof setTodolistsAC>
  | ReturnType<typeof setTasksAC>