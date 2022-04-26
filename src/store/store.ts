import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {themeReducer} from './themeReducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {ProfileActionTypes, profileReducer} from '../components/Profile/ProfileBLL/profile-reducer'
import {RegistrationActionTypes, registrationReducer
} from '../components/Auth/Registration/RegistrationBLL/registration-reducer';
import {LoginActionsType, loginReducer} from '../components/Auth/Login/LoginBLL/loginReducer';
import {RecoveryActionTypes, recoveryReducer
} from '../components/Auth/Recovery/RecoveryBLL/recovery-reducer';
import {NewPasswordActionTypes, newPasswordReducer
} from '../components/Auth/NewPassword/NewPasswordBLL/new-password-reducer';
import {loadValue} from '../utils/localstorage';
import {PacksActionTypes, packsReducer} from '../components/Packs/PacksBLL/packs-reducer';
import {CardsActionTypes, cardsReducer} from '../components/Cards/CardsBLL/cards-reducer';
import {AppActionTypes, appReducer} from '../app/appReducer';
import {LearnActionTypes, learnReducer} from './learnReducer';

const rootReducer = combineReducers({
    theme: themeReducer,
    profile: profileReducer,
    registration: registrationReducer,
    recovery: recoveryReducer,
    newPassword: newPasswordReducer,
    login: loginReducer,
    packs: packsReducer,
    cards: cardsReducer,
    app: appReducer,
    learn: learnReducer,
})

const preloadedState = {theme: {theme: loadValue() ? loadValue() : '☀'}}

export const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof store.getState>
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = RegistrationActionTypes | RecoveryActionTypes
    | NewPasswordActionTypes | LoginActionsType | ProfileActionTypes
    | PacksActionTypes | CardsActionTypes | AppActionTypes | LearnActionTypes
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store