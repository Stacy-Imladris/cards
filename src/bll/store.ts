import {applyMiddleware, combineReducers, createStore} from 'redux';
import {AppActionTypes, appReducer} from './appReducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {themeReducer} from './themeReducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {
    RegistrationActionTypes,
    registrationReducer
} from '../components/Registration/RegistrationBLL/registration-reducer';

const rootReducer = combineReducers({
    app: appReducer,
    theme: themeReducer,
    registration: registrationReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof store.getState>
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = AppActionTypes | RegistrationActionTypes
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store