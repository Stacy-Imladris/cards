import {Dispatch} from "redux";
import {cardsApi, LoginType} from "../../api/api";
import {ActionsType, AppThunk} from "../../bll/store";


const initialState = {
    isLoggedIn: false,
    error: null as NullableType<string>
}

export type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}

        case "login/SET-ERROR": {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setLoginError = (error: string) =>
    ({type: 'login/SET-ERROR', error} as const)

// thunk
export const loginTC = (data: LoginType): AppThunk => dispatch => {
    cardsApi.login(data)
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
        })
        .catch((err) => {
            dispatch(setLoginError(err.response.data.error))
        })
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    cardsApi.logout()
        .then((res) => {
            dispatch(setIsLoggedInAC(false))
        })
}

// types
export type LoginActionsType = ReturnType<typeof setIsLoggedInAC>
| ReturnType<typeof setLoginError>

export type NullableType<T> = null | T