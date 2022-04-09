import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {themeReducer} from './themeReducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {ProfileActionTypes, profileReducer} from './profile-reducer'
import {RegistrationActionTypes, registrationReducer} from '../components/Registration/RegistrationBLL/registration-reducer';
import {LoginActionsType, loginReducer} from '../components/Login/LoginBLL/loginReducer';
import {RecoveryActionTypes, recoveryReducer} from '../components/Recovery/RecoveryBLL/recovery-reducer';
import {NewPasswordActionTypes, newPasswordReducer} from '../components/NewPassword/NewPasswordBLL/new-password-reducer';
import {loadValue} from '../utils/localstorage';
import {UserType} from '../components/Profile/profile-api';
import {PacksActionTypes, packsReducer, PackType, ParamsType} from './packs-reducer';

const rootReducer = combineReducers({
    theme: themeReducer,
    profile: profileReducer,
    registration: registrationReducer,
    recovery: recoveryReducer,
    newPassword: newPasswordReducer,
    login: loginReducer,
    packs: packsReducer,
})

const preloadedState = {
    theme: {
        theme: loadValue() ? loadValue() : 'day',
    },
    profile: {
        user: {} as UserType,
        error: '',
        editMode: false,
        isFetching: false,
        isInitialized: false,
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
        error: '',
        isLogin: false
    },
    packs: {
        packs: [] as PackType[],
        user_id: '',
        error: '',
        isLoading: false,
        isPacksSet: false,
        params: {
            packName: 'english',
            min: 3,
            max: 9,
            sortPacks: '0updated',
            page: 1,
            pageCount: 7,
            user_id: '',
        } as ParamsType,
    }
}

export const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof store.getState>
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = RegistrationActionTypes | RecoveryActionTypes | NewPasswordActionTypes
    | LoginActionsType | ProfileActionTypes | PacksActionTypes
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store