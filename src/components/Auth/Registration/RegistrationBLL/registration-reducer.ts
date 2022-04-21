import {RegDataType, registrationAPI} from '../RegistrationAPI/registration-api';
import axios from 'axios';
import {AppThunk, InferActionTypes} from '../../../../store/store';

const registrationInitialState = {
    error: '',
    isLoading: false,
    toLogIn: false,
}

export const registrationReducer = (state: RegistrationInitialStateType = registrationInitialState, action: RegistrationActionTypes): RegistrationInitialStateType => {
    switch (action.type) {
        case 'REGISTRATION/SET_ERROR':
        case 'REGISTRATION/SET_IS_LOADING':
        case 'REGISTRATION/TO_LOG_IN':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const registrationActions = {
    setRegistrationError: (error: string) => ({type: 'REGISTRATION/SET_ERROR', payload: {error}} as const),
    setRegistrationIsLoading: (isLoading: boolean) => ({type: 'REGISTRATION/SET_IS_LOADING', payload: {isLoading}} as const),
    toLogIn: (toLogIn: boolean) => ({type: 'REGISTRATION/TO_LOG_IN', payload: {toLogIn}} as const),
}

//thunk
export const signUp = ({email, password, password2}: RegDataType): AppThunk => async dispatch => {
    dispatch(registrationActions.setRegistrationIsLoading(true))
    dispatch(registrationActions.setRegistrationError(''))
    if (password !== password2) {
        dispatch(registrationActions.setRegistrationError('Password confirmation failed!'))
        dispatch(registrationActions.setRegistrationIsLoading(false))
    } else {
        try {
            await registrationAPI.signUp({email, password})
            dispatch(registrationActions.toLogIn(true))
        } catch (e) {
            if (axios.isAxiosError(e)){
                dispatch(registrationActions.setRegistrationError(e.response ? e.response.data.error : e.message))
            } else {
                dispatch(registrationActions.setRegistrationError('Some error occurred'))
            }
        } finally {
            dispatch(registrationActions.setRegistrationIsLoading(false))
        }
    }
}

//types
export type RegistrationInitialStateType = typeof registrationInitialState
export type RegistrationActionTypes = InferActionTypes<typeof registrationActions>