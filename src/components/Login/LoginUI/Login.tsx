import {useCallback, useEffect, useState} from 'react';
import k from './Login.module.css';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../bll/store';
import {Link, Navigate} from 'react-router-dom';
import {SuperInputText} from '../../../common/super-components/c1-SuperInputText/SuperInputText';
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton';
import {PATH} from '../../../app/AllRoutes';
import s from '../../../common/styles/Forms.module.css'
import t from '../../../common/styles/Themes.module.css'
import {Logo} from '../../../common/logo/Logo';
import {Preloader} from "../../../common/preloader/Preloader";
import {SuperCheckbox} from "../../../common/super-components/c3-SuperCheckbox/SuperCheckbox";
import {selectIsLoggedIn, selectLoginError, selectLoginIsLoading, selectTheme
} from '../../../selectors/selectors';
import {login, loginActions} from '../LoginBLL/loginReducer';

export const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
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
            <div className={s.password}><SuperInputText
                value={password}
                onChangeText={setPassword}
                onEnter={onClickLogin}
                className={s.password}
                eye
            />
            </div>
            <span><SuperCheckbox checked={rememberMe}
                                 onChangeChecked={setRememberMe}>
                <span className={t[theme + '-text']}>Remember me</span>
            </SuperCheckbox></span>
            <div className={s.error}>{error}</div>
            <div><Link to="/password-recovery" className={`${k.forgotPassword} ${t[theme + '-text']}`}>Forgot
                Password</Link></div>
            <SuperButton onClick={onClickLogin} className={s.login}>Login</SuperButton>
            <div><Link to="/registration" className={`${k.dontHaveAccount} ${t[theme + '-text']}`}>Don't have an
                account?</Link></div>
            <div><Link to="/registration" className={`${s.SignUp} ${t[theme + '-text']}`}>Sign Up</Link></div>
        </div>
    )
}