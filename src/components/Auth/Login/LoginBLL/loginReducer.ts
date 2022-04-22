import {profileActions} from '../../../Profile/ProfileBLL/profile-reducer';
import {loginAPI, LoginType} from '../LoginAPI/login-api';
import axios from 'axios';
import {packsActions} from '../../../Packs/PacksBLL/packs-reducer';
import {UserType} from '../../../Profile/ProfileAPI/profile-api';
import {AppThunk, InferActionTypes} from '../../../../store/store';

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
        //dispatch(packsActions.setPacksForUser(res._id))
        dispatch(loginActions.setIsLoggedIn(true))
        dispatch(profileActions.setUserData(res))
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
        dispatch(loginActions.setLoginError(''))
        dispatch(profileActions.setEditMode(false))
        dispatch(loginActions.setIsLoggedIn(false))
        dispatch(profileActions.setUserData({} as UserType))
        dispatch(packsActions.setPacks([]))
        dispatch(packsActions.setTitleForSearch(''))
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