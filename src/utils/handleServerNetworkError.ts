import axios from 'axios';
import {Dispatch} from 'redux';
import {appActions, AppActions} from '../app/appReducer';

export const handleServerNetworkError = (dispatch: Dispatch<AppActions>, e: Error) => {
    if (axios.isAxiosError(e)) {
        dispatch(appActions.setAppError(e.response ? e.response.data.error : e.message))
    } else {
        dispatch(appActions.setAppError('Some error occurred'))
    }
}