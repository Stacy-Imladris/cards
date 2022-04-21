import axios from 'axios';
import {recoveryAPI} from '../RecoveryAPI/recovery-api';
import {AppThunk, InferActionTypes} from '../../../../store/store';

const recoveryInitialState = {
    error: '',
    isLoading: false,
    check: false,
}

export const recoveryReducer = (state: RecoveryInitialStateType = recoveryInitialState, action: RecoveryActionTypes): RecoveryInitialStateType => {
    switch (action.type) {
        case 'RECOVERY/SET_ERROR':
        case 'RECOVERY/SET_IS_LOADING':
        case 'RECOVERY/GET_CHECK_EMAIL':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const recoveryActions = {
    setRecoveryError: (error: string) => ({type: 'RECOVERY/SET_ERROR', payload: {error}} as const),
    setRecoveryIsLoading: (isLoading: boolean) => ({type: 'RECOVERY/SET_IS_LOADING', payload: {isLoading}} as const),
    getCheckEmail: (check: boolean) => ({type: 'RECOVERY/GET_CHECK_EMAIL', payload: {check}} as const),
}

//thunk
export const toSendInstructions = (email: string): AppThunk => async dispatch => {
    dispatch(recoveryActions.setRecoveryIsLoading(true))
    dispatch(recoveryActions.setRecoveryError(''))
    try {
        await recoveryAPI.toSendInstructions(email)
        dispatch(recoveryActions.getCheckEmail(true))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(recoveryActions.setRecoveryError(e.response ? e.response.data.error : e.message))
        } else {
            dispatch(recoveryActions.setRecoveryError('Some error occurred'))
        }
    } finally {
        dispatch(recoveryActions.setRecoveryIsLoading(false))
    }
}

//types
export type RecoveryInitialStateType = typeof recoveryInitialState
export type RecoveryActionTypes = InferActionTypes<typeof recoveryActions>