import React, {ChangeEvent, useState} from 'react';
import s from './Login.module.css';
import {LoginType} from "../../api/api";
import {loginTC} from "./loginReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppSelector} from "../../bll/store";
import {Navigate, useNavigate} from "react-router-dom";
import SuperInputText from "../../common/super-components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/super-components/c2-SuperButton/SuperButton";
import {PATH} from "../../app/AllRoutes";


export const Login = () => {

    let [email, setEmail] = useState<string>("")
    let [password, setPassword] = useState<string>("")


    const error = useAppSelector(state => state.login.error)
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
        <div className={s.loginForm}>
            <h2 className={s.text}>it-incubator</h2>
            <h3 className={s.text}>Sign In</h3>
            <span className={s.emailLabel}>Email</span>
            <SuperInputText
                name="email"
                value={email}
                // type={"email"}
                onChange={onChangeEmail}
                className={s.email}
            />
            <div className={s.error}>{error}</div>
            <span className={s.passwordLabel}>Password</span>
            <SuperInputText
                value={password}
                // type={"password"}
                onChange={onChangePassword}
                className={s.password}


            />
            <div className={s.error}>{error}</div>
            <div className={s.forgotPassword}>Forgot Password</div>
            <SuperButton onClick={onClickLogin} className={s.login}>Login</SuperButton>
            <div className={s.dontHaveAccount}>Don't have an account?</div>
            <div className={s.SignUp}>Sign Up</div>
        </div>
    )
}