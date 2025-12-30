import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch} from 'react-redux';
import {forwardRef, SyntheticEvent} from 'react';
import {useAppSelector} from 'store/store';
import {appActions} from 'app/appReducer';
import {selectAppError, selectAppStatus} from 'store/selectors';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

export const AppSnackbar = () => {
    const status = useAppSelector(selectAppStatus)
    const error = useAppSelector(selectAppError)

    const dispatch = useDispatch()

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        dispatch(appActions.setAppError(''))
        dispatch(appActions.setAppStatus(''))
    }

    return (
        <>
            <Snackbar open={!!status} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {status}
                </Alert>
            </Snackbar>
            <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </>
    )
}