import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {themeReducer} from './themeReducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {ProfileActions, profileReducer} from '../components/Profile/ProfileBLL/profile-reducer'
import {RegistrationActions, registrationReducer
} from '../components/Auth/Registration/RegistrationBLL/registration-reducer';
import {LoginActions, loginReducer} from '../components/Auth/Login/LoginBLL/loginReducer';
import {RecoveryActions, recoveryReducer
} from '../components/Auth/Recovery/RecoveryBLL/recovery-reducer';
import {NewPasswordActionTypes, newPasswordReducer
} from '../components/Auth/NewPassword/NewPasswordBLL/new-password-reducer';
import {loadValue} from '../utils/localstorage';
import {PacksActionTypes, packsReducer} from '../components/Packs/PacksBLL/packs-reducer';
import {CardsActions, cardsReducer} from '../components/Cards/CardsBLL/cards-reducer';
import {AppActions, appReducer} from '../app/appReducer';
import {LearnActions, learnReducer} from './learnReducer';

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

export type RootState = ReturnType<typeof store.getState>
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = RegistrationActions | RecoveryActions
    | NewPasswordActionTypes | LoginActions | ProfileActions
    | PacksActionTypes | CardsActions | AppActions | LearnActions
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// @ts-ignore
window.store = store