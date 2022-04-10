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
import {PacksActionTypes, PacksParamsType, packsReducer} from './packs-reducer';
import {PackType} from '../api/packs-api';
import {CardsActionTypes, CardsParamsType, cardsReducer} from './cards-reducer';
import {CardType} from '../api/cards-api';

const rootReducer = combineReducers({
    theme: themeReducer,
    profile: profileReducer,
    registration: registrationReducer,
    recovery: recoveryReducer,
    newPassword: newPasswordReducer,
    login: loginReducer,
    packs: packsReducer,
    cards: cardsReducer,
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
        error: '',
        isLoading: false,
        params: {
            packName: 'english',
            min: 3,
            max: 9,
            sortPacks: '0updated',
            page: 1,
            pageCount: 7,
            user_id: '',
        } as PacksParamsType,
        cardPacksTotalCount: 0,
    },
    cards: {
        cards: [] as CardType[],
        error: '',
        isLoading: false,
        params: {
            cardAnswer: '',
            cardQuestion: '',
            cardsPack_id: '5eb6a2f72f849402d46c6ac7',
            min: 1,
            max: 4,
            sortCards: '0grade',
            page: 1,
            pageCount: 7,
        } as CardsParamsType,
        cardsTotalCount: 0,
        packName: '',
        packId: '',
    },
}

export const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof store.getState>
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = RegistrationActionTypes | RecoveryActionTypes
    | NewPasswordActionTypes | LoginActionsType
    | ProfileActionTypes | PacksActionTypes | CardsActionTypes
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store