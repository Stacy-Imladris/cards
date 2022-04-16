import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch} from 'react-redux';
import {forwardRef, SyntheticEvent} from 'react';
import {useAppSelector} from '../../../bll/store';
import {appActions} from '../../../bll/appReducer';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref,) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

export const AppSnackbar = () => {
    const error = useAppSelector(state => state.app.error)
    const status = useAppSelector(state => state.app.status)

    const dispatch = useDispatch()

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        dispatch(appActions.setAppError(''))
        dispatch(appActions.setAppStatus(''))
    }

    return (
        <>
            <Snackbar open={!!error && error !== 'you are not authorized /ᐠ-ꞈ-ᐟ\\'} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar open={!!status} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {status}
                </Alert>
            </Snackbar>
        </>
    )
}