import React, {ChangeEvent, useState} from 'react';
import k from './Login.module.css';
import {LoginType} from '../../api/api';
import {loginTC} from './loginReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, useAppSelector} from '../../bll/store';
import {Link, Navigate} from 'react-router-dom';
import SuperInputText from '../../common/super-components/c1-SuperInputText/SuperInputText';
import SuperButton from '../../common/super-components/c2-SuperButton/SuperButton';
import {PATH} from '../../app/AllRoutes';

import s from '../../common/styles/Forms.module.css'
import t from '../../common/styles/Themes.module.css'
import {registrationActions} from '../Registration/RegistrationBLL/registration-reducer';
import {recoveryActions} from '../PasswordPages/Recovery/RecoveryBLL/recovery-reducer';

export const Login = () => {
    let [email, setEmail] = useState<string>("")
    let [password, setPassword] = useState<string>("")

    const error = useAppSelector(state => state.login.error)
    const theme = useAppSelector(state => state.theme.theme)
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const login: LoginType = {
        email: email,
        password: password
    }

    const onClickLogin = () => {
        dispatch(loginTC(login))
    }

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }


    return (
        <div className={`${s.container} ${t[theme + '-text']}`}>
            <h2 className={`${s.mainText} ${t[theme + '-text']}`}>it-incubator</h2>
            <h3 className={`${s.mainText} ${t[theme + '-text']}`}>Sign In</h3>
            <span>Email</span>
            <SuperInputText
                name="email"
                value={email}
                onChange={onChangeEmail}
                className={s.email}
            />
            <span>Password</span>
            <div className={s.password}><SuperInputText
                value={password}
                onChange={onChangePassword}
                className={s.password}
                eye
            />
            </div>
            <div className={s.error}>{error}</div>
            <div><Link to="/password-recovery" className={k.forgotPassword}>Forgot
                Password</Link></div>
            <SuperButton onClick={onClickLogin} className={s.login}>Login</SuperButton>
            <div><Link to="/registration" className={k.dontHaveAccount}>Don't have an account?</Link></div>
            <div><Link to="/registration" className={k.SignUp}>Sign Up</Link></div>
        </div>
    )
}