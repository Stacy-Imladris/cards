import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Recovery} from './Recovery';
import {recoveryActions, toSendInstructions} from '../RecoveryBLL/recovery-reducer';
import {
    selectRecoveryCheck,
    selectRecoveryError,
    selectRecoveryIsLoading, selectTheme
} from '../../../../store/selectors';
import {useAppSelector} from '../../../../store/store';

export const RecoveryContainer = () => {
    const [email, setEmail] = useState<string>('')

    const theme = useAppSelector(selectTheme)
    const isLoading = useAppSelector(selectRecoveryIsLoading)
    const error = useAppSelector(selectRecoveryError)
    const check = useAppSelector(selectRecoveryCheck)

    const dispatch = useDispatch()

    const toSendInstructionsOnEmail = useCallback(() => {
        dispatch(toSendInstructions(email))
    }, [dispatch, email])

    useEffect(() => {
        return () => {
            dispatch(recoveryActions.setRecoveryError(''))
            dispatch(recoveryActions.getCheckEmail(false))
        }
    }, [dispatch])

    return <Recovery toSendInstructions={toSendInstructionsOnEmail}
                     email={email} setEmail={setEmail} theme={theme}
                     isLoading={isLoading} error={error} check={check}/>
}