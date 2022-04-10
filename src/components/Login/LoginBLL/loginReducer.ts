import {profileActions} from '../../../bll/profile-reducer';
import {AppThunk} from '../../../bll/store';
import {loginApi, LoginType} from '../LoginAPI/login-api';

export const initialState = {
    isLoggedIn: false,
    error: '',
    isLogin: false
}

export type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case "login/SET-ERROR":
            return {...state, error: action.error}
        case "login/SET-LOGIN":
            return {...state, isLogin: action.value}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setLoginErrorAC = (error: string) =>
    ({type: 'login/SET-ERROR', error} as const)
export const setLoginAC = (value: boolean) =>
    ({type: 'login/SET-LOGIN', value} as const)

// thunks
export const loginTC = (login: LoginType): AppThunk => dispatch => {
    dispatch(setLoginAC(true))
    loginApi.login(login)
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
            dispatch(profileActions.setUserData(res.data))
            dispatch(setLoginAC(false))
        })
        .catch((err) => {
            dispatch(setLoginAC(false))
            dispatch(setLoginErrorAC(err.response ? err.response.data.error : err.message))
        })
}

export const logoutTC = (): AppThunk => dispatch => {
    loginApi.logout()
        .then(() => {
            dispatch(setIsLoggedInAC(false))
        })
}

// types
export type LoginActionsType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setLoginAC>
    | ReturnType<typeof setLoginErrorAC>
    | ReturnType<typeof profileActions.setUserData>