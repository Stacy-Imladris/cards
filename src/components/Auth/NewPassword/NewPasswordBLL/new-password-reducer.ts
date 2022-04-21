import axios from 'axios';
import {newPasswordAPI, NewPasswordDataType} from '../NewPasswordAPI/new-password-api';
import {AppThunk, InferActionTypes} from '../../../../store/store';

const newPasswordInitialState = {
    error: '',
    isLoading: false,
    toLogIn: false,
}

export const newPasswordReducer = (state: NewPasswordInitialStateType = newPasswordInitialState, action: NewPasswordActionTypes): NewPasswordInitialStateType => {
    switch (action.type) {
        case 'NEW_PASSWORD/SET_ERROR':
        case 'NEW_PASSWORD/SET_IS_LOADING':
        case 'NEW_PASSWORD/TO_LOG_IN':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const newPasswordActions = {
    setNewPasswordError: (error: string) => ({type: 'NEW_PASSWORD/SET_ERROR', payload: {error}} as const),
    setNewPasswordIsLoading: (isLoading: boolean) => ({type: 'NEW_PASSWORD/SET_IS_LOADING', payload: {isLoading}} as const),
    toLogIn: (toLogIn: boolean) => ({type: 'NEW_PASSWORD/TO_LOG_IN', payload: {toLogIn}} as const),
}

//thunk
export const changePassword = ({password, password2, resetPasswordToken}: NewPasswordDataType): AppThunk => async dispatch => {
    dispatch(newPasswordActions.setNewPasswordIsLoading(true))
    dispatch(newPasswordActions.setNewPasswordError(''))
    if (password !== password2) {
        dispatch(newPasswordActions.setNewPasswordError('Password confirmation failed!'))
        dispatch(newPasswordActions.setNewPasswordIsLoading(false))
    } else {
        try {
            await newPasswordAPI.changePassword({password, resetPasswordToken})
            dispatch(newPasswordActions.toLogIn(true))
        } catch (e) {
            if (axios.isAxiosError(e)){
                dispatch(newPasswordActions.setNewPasswordError(e.response ? e.response.data.error : e.message))
            } else {
                dispatch(newPasswordActions.setNewPasswordError('Some error occurred'))
            }
        } finally {
            dispatch(newPasswordActions.setNewPasswordIsLoading(false))
        }
    }
}

//types
export type NewPasswordInitialStateType = typeof newPasswordInitialState
export type NewPasswordActionTypes = InferActionTypes<typeof newPasswordActions>
