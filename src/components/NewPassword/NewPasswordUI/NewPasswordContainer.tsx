import {memo, useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {NewPassword} from './NewPassword';
import {changePassword, newPasswordActions} from '../NewPasswordBLL/new-password-reducer';
import {Navigate, useParams} from 'react-router-dom';
import {useAppSelector} from '../../../bll/store';
import {PATH} from '../../../app/AllRoutes';

export const NewPasswordContainer = memo(() => {
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')

    const isLoading = useAppSelector(state => state.newPassword.isLoading)
    const error = useAppSelector(state => state.newPassword.error)
    const toLogin = useAppSelector(state => state.newPassword.toLogIn)
    const theme = useAppSelector(state => state.theme.theme)

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

    return <NewPassword changePassword={toChangePassword} isLoading={isLoading} error={error} theme={theme}
                        password={password} setPassword={setPassword} password2={password2} setPassword2={setPassword2}
    />
})