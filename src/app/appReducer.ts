import type {InferActionTypes} from 'store/store';

const initialState = {
    status: '',
    error: '',
    isLoading: false,
}

export const appReducer = (state: AppInitialState = initialState, action: AppActions): AppInitialState => {
    switch (action.type) {
        case 'APP/SET_STATUS':
        case 'APP/SET_ERROR':
        case 'APP/SET_IS_LOADING':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const appActions = {
    setAppStatus: (status: string) => ({type: 'APP/SET_STATUS', payload: {status}} as const),
    setAppError: (error: string) => ({type: 'APP/SET_ERROR', payload: {error}} as const),
    setAppIsLoading: (isLoading: boolean) => ({type: 'APP/SET_IS_LOADING', payload: {isLoading}} as const),
}

export type AppInitialState = typeof initialState
export type AppActions = InferActionTypes<typeof appActions>