import axios from 'axios';
import {appActions, AppActionTypes} from '../bll/appReducer';
import {Dispatch} from 'redux';

export const handleServerNetworkError = (dispatch: Dispatch<AppActionTypes>, e: Error) => {
    if (axios.isAxiosError(e)) {
        dispatch(appActions.setAppError(e.response ? e.response.data.error : e.message))
    } else {
        dispatch(appActions.setAppError('Some error occurred'))
    }
}