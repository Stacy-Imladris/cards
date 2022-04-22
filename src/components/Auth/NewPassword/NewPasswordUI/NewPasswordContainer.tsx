import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {NewPassword} from './NewPassword';
import {changePassword, newPasswordActions} from '../NewPasswordBLL/new-password-reducer';
import {Navigate, useParams} from 'react-router-dom';
import {
    selectNewPasswordError,
    selectNewPasswordIsLoading, selectNewPasswordToLogin, selectTheme
} from '../../../../store/selectors';
import {PATH} from '../../../../enums/paths';
import {useAppSelector} from '../../../../store/store';

export const NewPasswordContainer = () => {
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')

    const theme = useAppSelector(selectTheme)
    const isLoading = useAppSelector(selectNewPasswordIsLoading)
    const error = useAppSelector(selectNewPasswordError)
    const toLogin = useAppSelector(selectNewPasswordToLogin)

    const dispatch = useDispatch()

    let {resetPasswordToken} = useParams<'resetPasswordToken'>()

    const toChangePassword = useCallback(() => {
        if (resetPasswordToken) {
            dispatch(changePassword({password, password2, resetPasswordToken}))
        }
    }, [dispatch, password, password2, resetPasswordToken])

    useEffect(() => {
        return () => {
            dispatch(newPasswordActions.setNewPasswordError(''))
        }
    }, [dispatch])

    if (toLogin) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return <NewPassword changePassword={toChangePassword} isLoading={isLoading}
                        error={error} theme={theme}
                        password={password} setPassword={setPassword}
                        password2={password2} setPassword2={setPassword2}/>
}