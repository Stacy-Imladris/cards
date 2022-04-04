import React from 'react';
import SuperInputText from '../../../common/super-components/c1-SuperInputText/SuperInputText';
import SuperButton from '../../../common/super-components/c2-SuperButton/SuperButton';
import s from '../../../common/styles/Forms.module.css'
import t from '../../../common/styles/Themes.module.css'
import {Preloader} from '../../../common/preloader/Preloader';
import {useAppSelector} from '../../../bll/store';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../../app/AllRoutes';
import {registrationActions} from '../RegistrationBLL/registration-reducer';
import {useDispatch} from 'react-redux';

type RegistrationPropsType = {
    signUp: () => void
    email: string
    password: string
    password2: string
    setEmail: (value: string) => void
    setPassword: (value: string) => void
    setPassword2: (value: string) => void
}

export const Registration = ({signUp, email, password, password2, setEmail, setPassword, setPassword2}: RegistrationPropsType) => {
    const error = useAppSelector(state => state.registration.error)
    const isLoading = useAppSelector(state => state.registration.isLoading)
    const toLogin = useAppSelector(state => state.registration.toLogIn)
    const theme = useAppSelector(state => state.theme.theme)
    const dispatch = useDispatch()

    if (toLogin) {
        return <Navigate to={PATH.LOGIN}/>
    }

    const onCancelClick = () => {
        dispatch(registrationActions.toLogIn(true))
    }


    return (
        <div className={`${s.container} ${t[theme + '-text']}`}>
            <div className={s.preloader}>{isLoading && <Preloader/>}</div>
            <div className={`${s.mainText} ${t[theme + '-text']}`}>Sign up</div>
            <span>Email</span>
            <div><SuperInputText value={email} onChangeText={setEmail} eye/></div>
            <span>Password</span>
            <div><SuperInputText value={password} onChangeText={setPassword} eye/></div>
            <span>Confirm password</span>
            <div><SuperInputText value={password2} onChangeText={setPassword2} eye/></div>
            <div className={s.buttons}>
                <SuperButton disabled={isLoading} onClick={onCancelClick}>Cancel</SuperButton>
                <SuperButton disabled={isLoading} onClick={signUp}>Register</SuperButton>
            </div>
            <div className={`${s.error} ${t[theme + '-text']}`}>{error}</div>
        </div>
    )
}