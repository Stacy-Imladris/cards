import React, {ChangeEvent, useEffect, useState} from 'react';
import k from './Login.module.css';
import {LoginType} from '../../../api/api';
import {loginTC, setLoginAC, setLoginErrorAC} from '../LoginBLL/loginReducer';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../bll/store';
import {Link, Navigate} from 'react-router-dom';
import SuperInputText from '../../../common/super-components/c1-SuperInputText/SuperInputText';
import SuperButton from '../../../common/super-components/c2-SuperButton/SuperButton';
import {PATH} from '../../../app/AllRoutes';
import s from '../../../common/styles/Forms.module.css'
import t from '../../../common/styles/Themes.module.css'
import {Logo} from '../../../common/logo/Logo';
import {Preloader} from "../../../common/preloader/Preloader";

export const Login = () => {
    let [email, setEmail] = useState<string>("")
    let [password, setPassword] = useState<string>("")

    const error = useAppSelector(state => state.login.error)
    const theme = useAppSelector(state => state.theme.theme)
    const dispatch = useDispatch()
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const isLogin = useAppSelector(state=> state.login.isLogin)

    useEffect(() => {
        return () => {
            dispatch(setLoginErrorAC(''))
        }
    }, [])

    useEffect(() => {
        return () => {
            dispatch(setLoginAC(false))
        }
    }, [])

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
            <Logo/>
            <div className={s.preloader}>{isLogin && <Preloader/>}</div>
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
            <div><Link to="/password-recovery" className={`${k.forgotPassword} ${t[theme + '-text']}`}>Forgot
                Password</Link></div>
            <SuperButton onClick={onClickLogin} className={s.login}>Login</SuperButton>
            <div><Link to="/registration" className={`${k.dontHaveAccount} ${t[theme + '-text']}`}>Don't have an account?</Link></div>
            <div><Link to="/registration" className={`${s.SignUp} ${t[theme + '-text']}`}>Sign Up</Link></div>
        </div>
    )
}