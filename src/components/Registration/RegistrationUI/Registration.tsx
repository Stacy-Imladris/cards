import React from 'react';
import SuperInputText from '../../../common/super-components/c1-SuperInputText/SuperInputText';
import SuperButton from '../../../common/super-components/c2-SuperButton/SuperButton';
import s from './Registration.module.css'
import {Preloader} from '../../../common/preloader/Preloader';
import {useAppSelector} from '../../../bll/store';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../../app/AllRoutes';
import {registrationActions} from '../RegistrationBLL/registration-reducer';
import {useDispatch} from 'react-redux';

type RegistrationPropsType = {
    toSignUp: () => void
    email: string
    password: string
    password2: string
    setEmail: (value: string) => void
    setPassword: (value: string) => void
    setPassword2: (value: string) => void
    disabled: boolean
}

export const Registration = ({toSignUp, email, password, password2, setEmail, setPassword, setPassword2, disabled}: RegistrationPropsType) => {
    const error = useAppSelector(state => state.registration.error)
    const isLoading = useAppSelector(state => state.registration.isLoading)
    const redirect = useAppSelector(state => state.registration.redirect)
    const dispatch = useDispatch()

    if (redirect) {
        return <Navigate to={PATH.LOGIN}/>

    }
    const onCancelClick = () => {
        dispatch(registrationActions.getRedirect(true))
    }

    return (
        <div className={s.registrationContainer}>
            <div className={s.preloader}>{isLoading && <Preloader/>}</div>
            <div className={s.mainText}>Sign up</div>
            <span>Email</span>
            <div><SuperInputText value={email} onChangeText={setEmail}/></div>
            <span>Password</span>
            <div><SuperInputText value={password} onChangeText={setPassword}/></div>
            <span>Confirm password</span>
            <div><SuperInputText value={password2} onChangeText={setPassword2}/></div>
            <div>
                <SuperButton onClick={onCancelClick}>Cancel</SuperButton>
                <SuperButton disabled={disabled} onClick={toSignUp}>Register</SuperButton>
            </div>
            <div className={s.error}>{error}</div>
        </div>
    )
}