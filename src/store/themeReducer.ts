import {InferActionTypes} from './store';

const themeInitialState = {
    theme: '☀' as ThemeType
}

export const themeReducer = (state: ThemeInitialState = themeInitialState, action: ThemeActions): ThemeInitialState => {
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
export type ThemeInitialState = typeof themeInitialState
export type ThemeActions = InferActionTypes<typeof themeActions>