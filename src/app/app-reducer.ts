export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type setStatusActionType = ReturnType<typeof setAppStatusAC>

const initialState = {
  status: 'loading' as RequestStatusType,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: setStatusActionType): InitialStateType => {
  switch (action.type) {
    case 'SET_STATUS':
      return {...state, status: action.status}
    default:
      return state
  }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) =>
  ({type: 'SET_STATUS', status} as const)