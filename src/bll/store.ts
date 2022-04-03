import {applyMiddleware, combineReducers, createStore} from 'redux';
import {AppActionTypes, appReducer} from './appReducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {themeReducer} from './themeReducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {profileReducer} from './profileReducer'
import {
    RegistrationActionTypes,
    registrationReducer
} from '../components/Registration/RegistrationBLL/registration-reducer';
import {RecoveryActionTypes, recoveryReducer} from '../components/PasswordPages/Recovery/RecoveryBLL/recovery-reducer';
import {
    NewPasswordActionTypes,
    newPasswordReducer
} from '../components/PasswordPages/NewPassword/NewPasswordBLL/new-password-reducer';
import {LoginActionsType, loginReducer} from "../components/Login/loginReducer";


const rootReducer = combineReducers({
    app: appReducer,
    profile: profileReducer,
    theme: themeReducer,
    registration: registrationReducer,
    recovery: recoveryReducer,
    newPassword: newPasswordReducer,
    login: loginReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof store.getState>
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = AppActionTypes | RegistrationActionTypes | RecoveryActionTypes | NewPasswordActionTypes | LoginActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store