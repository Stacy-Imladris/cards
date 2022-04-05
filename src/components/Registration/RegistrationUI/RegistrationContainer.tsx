import {memo, useCallback, useEffect, useState} from 'react';
import {Registration} from './Registration';
import {useDispatch} from 'react-redux';
import {registrationActions, signUp} from '../RegistrationBLL/registration-reducer';
import {useAppSelector} from '../../../bll/store';
import {Navigate, useNavigate} from 'react-router-dom';
import {PATH} from '../../../app/AllRoutes';

export const RegistrationContainer = memo(() => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')

    const error = useAppSelector(state => state.registration.error)
    const isLoading = useAppSelector(state => state.registration.isLoading)
    const toLogin = useAppSelector(state => state.registration.toLogIn)
    const theme = useAppSelector(state => state.theme.theme)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const toSignUp = useCallback(() => {
        dispatch(signUp({email, password, password2}))
    }, [dispatch, email, password, password2])

    useEffect(() => {
        return () => {
            dispatch(registrationActions.setRegistrationError(''))
        }
    }, [])

    if (toLogin) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return <Registration
        signUp={toSignUp} navigate={navigate}
        email={email} setEmail={setEmail}
        password={password} setPassword={setPassword}
        password2={password2} setPassword2={setPassword2}
        error={error} isLoading={isLoading} theme={theme}
    />
})