import {memo, useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Recovery} from './Recovery';
import {recoveryActions, toSendInstructions} from '../RecoveryBLL/recovery-reducer';
import {useAppSelector} from '../../../bll/store';

export const RecoveryContainer = memo(() => {
    const [email, setEmail] = useState<string>('')

    const isLoading = useAppSelector(state => state.recovery.isLoading)
    const error = useAppSelector(state => state.recovery.error)
    const check = useAppSelector(state => state.recovery.check)
    const theme = useAppSelector(state => state.theme.theme)

    const dispatch = useDispatch()

    const toSendInstructionsOnEmail = useCallback(() => {
        dispatch(toSendInstructions(email))
    }, [dispatch, email])

    useEffect(() => {
        return () => {
            dispatch(recoveryActions.setRecoveryError(''))
        }
    }, [])

    return <Recovery toSendInstructions={toSendInstructionsOnEmail} email={email} setEmail={setEmail}
                     isLoading={isLoading} error={error} check={check} theme={theme}/>
})