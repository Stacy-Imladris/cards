import SuperInputText from '../../../common/super-components/c1-SuperInputText/SuperInputText';
import SuperButton from '../../../common/super-components/c2-SuperButton/SuperButton';
import s from '../../../common/styles/Forms.module.css'
import t from '../../../common/styles/Themes.module.css'
import {Preloader} from '../../../common/preloader/Preloader';
import {NavigateFunction} from 'react-router-dom';
import {memo} from 'react';

type RegistrationPropsType = {
    signUp: () => void
    email: string
    password: string
    password2: string
    setEmail: (value: string) => void
    setPassword: (value: string) => void
    setPassword2: (value: string) => void
    error: string
    isLoading: boolean
    theme: string
    navigate: NavigateFunction
}

export const Registration = memo(({signUp, email, setEmail, password, setPassword, password2, setPassword2,
                                 error, isLoading, theme, navigate}: RegistrationPropsType) => {
    return (
        <div className={`${s.container} ${t[theme + '-text']}`}>
            <div className={s.preloader}>{isLoading && <Preloader/>}</div>
            <div className={s.mainText}>Sign up</div>
            <span>Email</span>
            <div><SuperInputText value={email} onChangeText={setEmail}/></div>
            <span>Password</span>
            <div><SuperInputText value={password} onChangeText={setPassword} eye/></div>
            <span>Confirm password</span>
            <div><SuperInputText value={password2} onChangeText={setPassword2} eye/></div>
            <div className={s.buttons}>
                <SuperButton disabled={isLoading} onClick={() => navigate('/login')}>Cancel</SuperButton>
                <SuperButton disabled={isLoading} onClick={signUp}>Register</SuperButton>
            </div>
            <div className={s.error}>{error}</div>
        </div>
    )
})