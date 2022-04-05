import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {themeReducer} from './themeReducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {profileReducer} from './profileReducer'
import {RegistrationActionTypes, registrationReducer} from '../components/Registration/RegistrationBLL/registration-reducer';
import {LoginActionsType, loginReducer} from '../components/Login/LoginBLL/loginReducer';
import {RecoveryActionTypes, recoveryReducer} from '../components/Recovery/RecoveryBLL/recovery-reducer';
import {NewPasswordActionTypes, newPasswordReducer} from '../components/NewPassword/NewPasswordBLL/new-password-reducer';
import {loadValue} from '../utils/localstorage';

const rootReducer = combineReducers({
    theme: themeReducer,
    profile: profileReducer,
    registration: registrationReducer,
    recovery: recoveryReducer,
    newPassword: newPasswordReducer,
    login: loginReducer
})

const preloadedState = {
    theme: {
        theme: loadValue() ? loadValue() : 'day',
    },
    profile: {
        user: {
            _id: '',
            email: 'mail@mail.com',
            name: 'Barbaris',
            avatar: '',
            publicCardPacksCount: 0,
            created: new Date(),
            updated: new Date(),
            isAdmin: false,
            verified: false,
            rememberMe: false,
            error: ''
        },
        error: '',
        editMode: false,
        isFetching: false,
    },
    registration: {
        error: '',
        isLoading: false,
        toLogIn: false,
    },
    recovery: {
        error: '',
        isLoading: false,
        check: false,
    },
    newPassword: {
        error: '',
        isLoading: false,
        toLogIn: false,
    },
    login: {
        isLoggedIn: false,
        error: null,
        isLogin: false
    },
}

export const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof store.getState>
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = RegistrationActionTypes | RecoveryActionTypes | NewPasswordActionTypes | LoginActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store