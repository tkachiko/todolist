import {
  addTaskAC,
  changeTaskEntityStatusAC,
  removeTaskAC,
  setTasksAC,
  tasksReducer,
  updateTaskAC,
} from './tasks-reducer'
import {addTodolistAC, removeTodolistAC, setTodolistsAC, todolistsReducer} from './todolists-reducer'
import {RequestStatusType, TaskPriorities, TaskStateType, TaskStatuses, TodolistDomainType} from '../../types/types'

let startState: TaskStateType

beforeEach(() => {
  startState = {
    'todolistId1': [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
    ],
    'todolistId2': [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
    ],
  }
})

test('correct task should be deleted from the correct array', () => {
  const action = removeTaskAC({taskId: '2', todolistId: 'todolistId2'})

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todolistId1': [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId1',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        todoListId: 'todolistId1',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
    ],
    'todolistId2': [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        todoListId: 'todolistId2',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.Completed,
        todoListId: 'todolistId2',
        addedDate: '',
        startDate: '',
        deadline: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: '',
        entityStatus: 'idle',
      },
    ],
  })
})
test('correct task should be added to the correct array', () => {
  const action = addTaskAC({task: {
    id: '1',
    title: 'juice',
    addedDate: '',
    order: 0,
    status: TaskStatuses.New,
    todoListId: 'todolistId1',
    startDate: '',
    deadline: '',
    priority: TaskPriorities.Low,
    description: '',
    entityStatus: 'idle',
  }})

  const endState: TaskStateType = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(4)
  expect(endState['todolistId2'].length).toBe(3)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId1'][0].title).toBe('juice')
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {
  const action = updateTaskAC({taskId: '2', todolistId: 'todolistId2', model: {status: TaskStatuses.New}})

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
  expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})
test('title of specified task should be changed', () => {
  const action = updateTaskAC({taskId: '2', todolistId: 'todolistId2', model: {title: 'beer'}})

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].title).toBe('beer')
  expect(endState['todolistId1'][1].title).toBe('JS')
})
test('new array should be added when new todolist is added', () => {
  const action = addTodolistAC({todolist: {id: 'todolistId3', title: 'New todolist title', order: 0, addedDate: ''}})

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})
test('ids should be equals', () => {
  const startTasksState: TaskStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const action = addTodolistAC({todolist: {id: 'todolistId3', title: 'New todolist title', order: 0, addedDate: ''}})

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
test('property with todolistId should be deleted', () => {
  const action = removeTodolistAC({id: 'todolistId2'})

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})
test('empty arrays should be added when we set TodolistsList', () => {
  const action = setTodolistsAC({
    todolists: [
      {id: '1', title: 'title 1', order: 0, addedDate: ''},
      {id: '2', title: 'title 2', order: 0, addedDate: ''},
    ],
  })

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['1']).toStrictEqual([])
  expect(endState['2']).toStrictEqual([])
})
test('tasks should be added for todolist', () => {
  const action = setTasksAC({tasks: startState['todolistId1'], todolistId: 'todolistId1'})

  const endState = tasksReducer({
    'todolistId2': [],
    'todolistId1': [],
  }, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(0)
})
test('correct entity status of task should be changed', () => {
  let newStatus: RequestStatusType = 'loading'

  const action = changeTaskEntityStatusAC({taskId: '1', todolistId: 'todolistId2', entityStatus: newStatus})

  const endState = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].entityStatus).toBe('idle')
  expect(endState['todolistId2'][0].entityStatus).toBe('loading')
})