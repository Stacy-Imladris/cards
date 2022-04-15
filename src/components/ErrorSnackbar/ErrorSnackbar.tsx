import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch} from 'react-redux';
import {forwardRef, SyntheticEvent} from 'react';
import {useAppSelector} from '../../bll/store';
import {appActions} from '../../bll/appReducer';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref,) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

export const ErrorSnackbar = () => {
    const error = useAppSelector(state => state.app.error)
    const status = useAppSelector(state => state.app.status)

    const dispatch = useDispatch()

    const handleErrorClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        dispatch(appActions.setAppError(''))
    }

    const handleStatusClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        dispatch(appActions.setAppStatus(''))
    }

    return (
        <>
            <Snackbar open={!!error && error !== 'you are not authorized /ᐠ-ꞈ-ᐟ\\'} autoHideDuration={7000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error" sx={{width: '100%'}}>
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar open={!!status} autoHideDuration={7000} onClose={handleStatusClose}>
                <Alert onClose={handleStatusClose} severity="success" sx={{width: '100%'}}>
                    {status}
                </Alert>
            </Snackbar>
        </>
    )
}