import {useCallback, useEffect, useState} from 'react';
import {Registration} from './Registration';
import {useDispatch} from 'react-redux';
import {registrationActions, signUp} from '../RegistrationBLL/registration-reducer';
import {Navigate, useNavigate} from 'react-router-dom';
import {
    selectRegistrationError, selectRegistrationIsLoading,
    selectRegistrationToLogin, selectTheme
} from '../../../../store/selectors';
import {PATH} from '../../../../enums/paths';
import {useAppSelector} from '../../../../store/store';

export const RegistrationContainer = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')

    const theme = useAppSelector(selectTheme)
    const error = useAppSelector(selectRegistrationError)
    const isLoading = useAppSelector(selectRegistrationIsLoading)
    const toLogin = useAppSelector(selectRegistrationToLogin)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const toSignUp = useCallback(() => {
        dispatch(signUp({email, password, password2}))
    }, [dispatch, email, password, password2])

    useEffect(() => {
        return () => {
            dispatch(registrationActions.setRegistrationError(''))
        }
    }, [dispatch])

    if (toLogin) return <Navigate to={PATH.LOGIN}/>

    return <Registration signUp={toSignUp} navigate={navigate}
        password={password} setPassword={setPassword} password2={password2} setPassword2={setPassword2}
        error={error} isLoading={isLoading} theme={theme} email={email} setEmail={setEmail}/>
}