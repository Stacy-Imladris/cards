import React, {ChangeEvent, useState} from 'react';
import s from './Login.module.css';


export const Login = () => {

    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")

    const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const login = {
        email: email,
        password: password
    }

    const onClickLogin = () => {
        alert(JSON.stringify(login))
    }


    return (
        <div className={s.loginForm}>
            <h2>it-incubator</h2>
            <h3>Sign In</h3>

            <div className={s.emailAll}>
                <label className={s.emailLabel}>Email</label>
                <input
                    name="email"
                    value={email}
                    type={"email"}
                    onChange={onChangeEmail}
                    className={s.email}
                />
            </div>
            <div className={s.passwordAll}>
                <label className={s.passwordLabel}>Password</label>
                <input
                    value={password}
                    type={"password"}
                    onChange={onChangePassword}
                    className={s.password}
                />
            </div>


            <div className={s.forgotPassword}>Forgot Password</div>
            <button onClick={onClickLogin} className={s.login}>Login</button>
            <div className={s.dontHaveAccount}>Don't have an account?</div>
            <div className={s.SignUp}>Sign Up</div>
        </div>
    )
}