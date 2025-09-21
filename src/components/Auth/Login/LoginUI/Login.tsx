import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link, Navigate} from 'react-router-dom';
import {SuperInputText} from 'common/super-components/c1-SuperInputText/SuperInputText';
import {SuperButton} from 'common/super-components/c2-SuperButton/SuperButton';
import styles from 'common/styles/Forms.module.css'
import extraStyles from 'common/styles/Themes.module.css'
import {Logo} from 'common/logo/Logo';
import {Preloader} from 'common/preloader/Preloader';
import {SuperCheckbox} from 'common/super-components/c3-SuperCheckbox/SuperCheckbox';
import {
    selectIsLoggedIn, selectLoginError, selectLoginIsLoading, selectTheme
} from 'store/selectors';
import {login, loginActions} from '../LoginBLL/loginReducer';
import {PATH} from 'enums/paths';
import {useAppSelector} from 'store/store';

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    const error = useAppSelector(selectLoginError)
    const theme = useAppSelector(selectTheme)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const isLoading = useAppSelector(selectLoginIsLoading)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => dispatch(loginActions.setLoginError(''))
    }, [dispatch])

    const onClickLogin = useCallback(() => {
        dispatch(login({email, password, rememberMe}))
    }, [dispatch, email, password, rememberMe])

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <div className={`${styles.container} ${extraStyles[theme + '-text']}`}>
            <Logo/>
            <div className={styles.preloader}>{isLoading && <Preloader/>}</div>
            <h3 className={`${styles.mainText} ${extraStyles[theme + '-text']}`}>Sign In</h3>
            <span>Email</span>
            <SuperInputText
                name="email"
                value={email}
                onChangeText={setEmail}
                onEnter={onClickLogin}
                className={styles.email}
            />
            <span>Password</span>
            <div>
                <SuperInputText value={password}
                                onChangeText={setPassword}
                                onEnter={onClickLogin}
                                className={styles.password} eye/>
            </div>
            <div className={styles.checkbox}>
                <SuperCheckbox checked={rememberMe} onChangeChecked={setRememberMe}>
                    Remember me
                </SuperCheckbox>
            </div>
            <Link to="/password-recovery" className={`${styles.link} ${extraStyles[theme + '-text']}`}>
                Forgot Password
            </Link>
            <SuperButton onClick={onClickLogin} className={styles.login}>Login</SuperButton>
            <span>Don't have an account?</span>
            <Link to="/registration" className={`${styles.link} ${extraStyles[theme + '-text']}`}>
                Sign Up
            </Link>
            <div className={styles.error}>{error}</div>
        </div>
    )
}