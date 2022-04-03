import {AppThunk, InferActionTypes} from '../../../bll/store';
import {RegDataType, registrationAPI} from '../RegistrationAPI/registration-api';
import axios from 'axios';

const registrationInitialState = {
    error: '',
    isLoading: false,
    redirect: false,
}

export const registrationReducer = (state: RegistrationInitialStateType = registrationInitialState, action: RegistrationActionTypes): RegistrationInitialStateType => {
    switch (action.type) {
        case 'REGISTRATION/SET_ERROR':
        case 'REGISTRATION/SET_IS_LOADING':
        case 'REGISTRATION/GET_REDIRECT':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const registrationActions = {
    setRegistrationError: (error: string) => ({type: 'REGISTRATION/SET_ERROR', payload: {error}} as const),
    setRegistrationIsLoading: (isLoading: boolean) => ({type: 'REGISTRATION/SET_IS_LOADING', payload: {isLoading}} as const),
    getRedirect: (redirect: boolean) => ({type: 'REGISTRATION/GET_REDIRECT', payload: {redirect}} as const),
}

//thunk
export const signUp = ({email, password, password2}: RegDataType): AppThunk => async dispatch => {
    dispatch(registrationActions.setRegistrationIsLoading(true))
    if (password !== password2) {
        dispatch(registrationActions.setRegistrationError('Password confirmation failed!'))
        dispatch(registrationActions.setRegistrationIsLoading(false))
    } else {
        try {
            await registrationAPI.toSignUp({email, password})
            dispatch(registrationActions.setRegistrationError(''))
            dispatch(registrationActions.getRedirect(true))
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