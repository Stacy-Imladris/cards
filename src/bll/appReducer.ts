import {InferActionTypes} from './store';

const appInitialState = {}

export const appReducer = (state: AppInitialStateType = appInitialState, action: AppActionTypes): AppInitialStateType => {
    switch (action.type) {
        case 'APP/TEST_TYPE':
            return {...state}
        default:
            return state
    }
}

export const appActions = {
    test: () => ({type: 'APP/TEST_TYPE'} as const),
}

export type AppInitialStateType = typeof appInitialState
export type AppActionTypes = InferActionTypes<typeof appActions>