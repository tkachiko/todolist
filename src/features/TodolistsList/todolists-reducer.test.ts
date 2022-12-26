import {
  addTodolistAC, changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
  todolistsReducer,
} from './todolists-reducer'
import {v1} from 'uuid';
import {FilterType, RequestStatusType, TodolistDomainType} from '../../types/types'

const todolistId1 = v1();
const todolistId2 = v1();
const startState: Array<TodolistDomainType> = [
  {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
  {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'}
];

test('correct todolist should be removed', () => {
  const action = removeTodolistAC(todolistId1);

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
  let newTodolist = {id: todolistId1, title: 'New todolist title', filter: 'all', order: 0, addedDate: ''};

  const action = addTodolistAC(newTodolist);

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe('New todolist title');
});
test('correct filter of todolist should be changed', () => {
  let newFilter: FilterType = 'completed';

  const action = changeTodolistFilterAC(todolistId2, newFilter);

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
});
test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist';

  const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});
test('TodolistsList should be set to the state', () => {
  const action = setTodolistsAC(startState);

  const endState = todolistsReducer([], action);

  expect(endState.length).toBe(2);
});
test('correct entity status of todolist should be changed', () => {
  let newStatus: RequestStatusType = 'loading';

  const action = changeTodolistEntityStatusAC(todolistId2, newStatus);

  const endState = todolistsReducer(startState, action);

  expect(endState[0].entityStatus).toBe('idle');
  expect(endState[1].entityStatus).toBe(newStatus);
});