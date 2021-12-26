const initialState: InitialStateType = {
  loading: false,
  error: '',
}

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "APP/SET_LOADING_STATUS":
      return {...state, loading: action.value}
    case "APP/SET_ERROR":
      return {...state, error: action.value}
    default:
      return state;
  }
}

export const setAppLoading = (value: boolean) =>
  ({type: 'APP/SET_LOADING_STATUS', value} as const)

export const setError = (value: string) =>
  ({type: 'APP/SET_ERROR', value} as const)

type InitialStateType = {
  loading: boolean
  error: string
}
type ActionsType = ReturnType<typeof setAppLoading> | ReturnType<typeof setError>