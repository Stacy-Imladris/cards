import {InferActionTypes} from './store';

const themeInitialState = {
    theme: '☀' as ThemeType
}

export const themeReducer = (state: ThemeInitialStateType = themeInitialState, action: ThemeActionTypes): ThemeInitialStateType => {
    switch (action.type) {
        case 'THEME/CHANGE_THEME':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const themeActions = {
    changeTheme: (theme: ThemeType) => ({type: 'THEME/CHANGE_THEME', payload: {theme}} as const),
}

export type ThemeType = '☀' | '☽'
export type ThemeInitialStateType = typeof themeInitialState
export type ThemeActionTypes = InferActionTypes<typeof themeActions>