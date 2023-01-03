import {appReducer, setAppErrorAC, setAppStatusAC} from './app-reducer'
import {RequestStatusType} from '../types/types'

let startState: {
  status: RequestStatusType,
  error: null | string,
  isInitialized: boolean,
}

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    isInitialized: false
  }
})

test('correct error message should be set', () => {
  const action = setAppErrorAC({error: 'Some error'})

  const endState = appReducer(startState, action)

  expect(endState.error).toBe('Some error')
})

test('correct status should be set', () => {
  const action = setAppStatusAC({status: 'loading'})

  const endState = appReducer(startState, action)

  expect(endState.status).toBe('loading')
})