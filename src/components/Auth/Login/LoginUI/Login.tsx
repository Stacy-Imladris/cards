import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, Navigate} from 'react-router-dom';
import {SuperInputText} from '../../../../common/super-components/c1-SuperInputText/SuperInputText';
import {SuperButton} from '../../../../common/super-components/c2-SuperButton/SuperButton';
import s from '../../../../common/styles/Forms.module.css'
import t from '../../../../common/styles/Themes.module.css'
import {Logo} from '../../../../common/logo/Logo';
import {Preloader} from '../../../../common/preloader/Preloader';
import {SuperCheckbox} from '../../../../common/super-components/c3-SuperCheckbox/SuperCheckbox';
import {
    selectIsLoggedIn, selectLoginError, selectLoginIsLoading, selectTheme
} from '../../../../store/selectors';
import {login, loginActions} from '../LoginBLL/loginReducer';
import {PATH} from '../../../../enums/paths';
import {useAppSelector} from '../../../../store/store';

export const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const error = useAppSelector(selectLoginError)
    const theme = useAppSelector(selectTheme)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const isLoading = useAppSelector(selectLoginIsLoading)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(loginActions.setLoginError(''))
        }
    }, [dispatch])

    const onClickLogin = useCallback(() => {
        dispatch(login({email, password, rememberMe}))
    }, [dispatch, email, password, rememberMe])

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <div className={`${s.container} ${t[theme + '-text']}`}>
            <Logo/>
            <div className={s.preloader}>{isLoading && <Preloader/>}</div>
            <h3 className={`${s.mainText} ${t[theme + '-text']}`}>Sign In</h3>
            <span>Email</span>
            <SuperInputText
                name="email"
                value={email}
                onChangeText={setEmail}
                onEnter={onClickLogin}
                className={s.email}
            />
            <span>Password</span>
            <div>
                <SuperInputText value={password}
                                onChangeText={setPassword}
                                onEnter={onClickLogin}
                                className={s.password} eye/>
            </div>
            <div className={s.checkbox}>
                <SuperCheckbox checked={rememberMe} onChangeChecked={setRememberMe}>
                    Remember me
                </SuperCheckbox>
            </div>
            <Link to="/password-recovery" className={`${s.link} ${t[theme + '-text']}`}>
                Forgot Password
            </Link>
            <SuperButton onClick={onClickLogin} className={s.login}>Login</SuperButton>
            <span>Don't have an account?</span>
            <Link to="/registration" className={`${s.link} ${t[theme + '-text']}`}>
                Sign Up
            </Link>
            <div className={s.error}>{error}</div>
        </div>
    )
}