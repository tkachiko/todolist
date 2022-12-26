import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from './app-reducer'

let startState: InitialStateType

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
  }
})

test('correct error message should be set', () => {
  const action = setAppErrorAC('Some error')

  const endState = appReducer(startState, action)

  expect(endState.error).toBe('Some error')
})

test('correct status should be set', () => {
  const action = setAppStatusAC('loading')

  const endState = appReducer(startState, action)

  expect(endState.status).toBe('loading')
})