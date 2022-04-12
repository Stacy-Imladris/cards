import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk, {ThunkAction} from 'redux-thunk'
import {themeReducer} from './themeReducer'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {ProfileActionTypes, profileReducer} from './profile-reducer'
import {
    RegistrationActionTypes,
    registrationReducer
} from '../components/Registration/RegistrationBLL/registration-reducer'
import {LoginActionsType, loginReducer} from '../components/Login/LoginBLL/loginReducer'
import {RecoveryActionTypes, recoveryReducer} from '../components/Recovery/RecoveryBLL/recovery-reducer'
import {NewPasswordActionTypes, newPasswordReducer} from '../components/NewPassword/NewPasswordBLL/new-password-reducer'
import {loadValue} from '../utils/localstorage'
import {UserType} from '../components/Profile/profile-api'
import {PacksActionTypes, packsReducer, ParamsType} from './packs-reducer'
import {PackType} from '../api/packs-api'
import {CardsActionTypes, cardsReducer} from './cards-reducer'

const rootReducer = combineReducers({
    theme: themeReducer,
    profile: profileReducer,
    registration: registrationReducer,
    recovery: recoveryReducer,
    newPassword: newPasswordReducer,
    login: loginReducer,
    packs: packsReducer,
    cards: cardsReducer
})

const preloadedState = {
    theme: {
        theme: loadValue() ? loadValue() : 'day'
    },
    profile: {
        user: {} as UserType,
        error: '',
        editMode: false,
        isFetching: false,
        isInitialized: false
    },
    registration: {
        error: '',
        isLoading: false,
        toLogIn: false
    },
    recovery: {
        error: '',
        isLoading: false,
        check: false
    },
    newPassword: {
        error: '',
        isLoading: false,
        toLogIn: false
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
        isPacksSet: false,
        params: {
            packName: 'english',
            min: 3,
            max: 9,
            sortPacks: '0updated',
            page: 1,
            pageCount: 7,
            user_id: ''
        } as ParamsType,
        cardPacksTotalCount: 0
    },
    cards: {
        cardPacks: [
            {
                answer: '',
                question: '',
                cardsPack_id: '',
                grade: 4.987525071790364,
                shots: 1,
                user_id: '',
                created: '2020-05-13T11:05:44.867Z',
                updated: '2020-05-13T11:05:44.867Z',
                _id: ''
            }
        ],
        cardsTotalCount: 3,
        maxGrade: 4.987525071790364,
        minGrade: 2.0100984354076568,
        page: 1,
        pageCount: 4,
        packUserId: '',

        params: {
            cardAnswer: '',
            cardQuestion: '',
            cardsPack_id: '',
            min: 1,
            max: 10,
            sortCards: '0updated',
            page: 1,
            pageCount: 10
        },

        error: '',
        isLoading: false
    }
}

export const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof store.getState>
export type InferActionTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = RegistrationActionTypes | RecoveryActionTypes
    | NewPasswordActionTypes | LoginActionsType
    | ProfileActionTypes | PacksActionTypes
    | CardsActionTypes
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store