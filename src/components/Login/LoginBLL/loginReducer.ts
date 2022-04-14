import {profileActions} from '../../../bll/profile-reducer';
import {AppThunk, InferActionTypes} from '../../../bll/store';
import {loginAPI, LoginType} from '../LoginAPI/login-api';
import axios from 'axios';
import {packsActions} from '../../../bll/packs-reducer';
import {cardsActions} from '../../../bll/cards-reducer';
import {UserType} from '../../Profile/profile-api';

export const loginInitialState = {
    isLoggedIn: false,
    error: '',
    isLoading: false
}

export const loginReducer = (state: LoginInitialStateType = loginInitialState, action: LoginActionsType): LoginInitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
        case 'LOGIN/SET-ERROR':
        case 'LOGIN/SET-LOGIN':
            return {...state, ...action.payload}
        default:
            return state
    }
}

// actions
export const loginActions = {
    setIsLoggedIn: (isLoggedIn: boolean) =>
        ({type: 'LOGIN/SET-IS-LOGGED-IN', payload: {isLoggedIn}} as const),
    setLoginError: (error: string) =>
        ({type: 'LOGIN/SET-ERROR', payload: {error}} as const),
    setIsLoading: (isLoading: boolean) =>
        ({type: 'LOGIN/SET-LOGIN', payload: {isLoading}} as const),
}

// thunks
export const login = (login: LoginType): AppThunk => async dispatch => {
    dispatch(loginActions.setIsLoading(true))
    try {
        const res = await loginAPI.login(login)
        dispatch(loginActions.setIsLoggedIn(true))
        dispatch(profileActions.setUserData(res.data))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(loginActions.setLoginError(e.response ? e.response.data.error : e.message))
        } else {
            dispatch(loginActions.setLoginError('Some error occurred'))
        }
    } finally {
        dispatch(loginActions.setIsLoading(false))
    }
}

export const logout = (): AppThunk => async dispatch => {
    try {
        await loginAPI.logout()
        dispatch(profileActions.setEditModeProfile(false))
        dispatch(loginActions.setIsLoggedIn(false))
        dispatch(profileActions.setUserData({} as UserType))
        dispatch(packsActions.setPacks([]))
        dispatch(cardsActions.setCards([]))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(loginActions.setLoginError(e.response ? e.response.data.error : e.message))
        } else {
            dispatch(loginActions.setLoginError('Some error occurred'))
        }
    }
}

// types
export type LoginInitialStateType = typeof loginInitialState
export type LoginActionsType = InferActionTypes<typeof loginActions>