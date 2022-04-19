import {memo} from 'react';
import s from '../../../../common/styles/Forms.module.css'
import t from '../../../../common/styles/Themes.module.css';
import {Preloader} from '../../../../common/preloader/Preloader';
import {SuperButton} from '../../../../common/super-components/c2-SuperButton/SuperButton';
import {SuperInputText} from '../../../../common/super-components/c1-SuperInputText/SuperInputText';
import {Logo} from '../../../../common/logo/Logo';

type NewPasswordPropsType = {
    password: string
    password2: string
    setPassword: (value: string) => void
    setPassword2: (value: string) => void
    changePassword: () => void
    isLoading: boolean
    error: string
    theme: string
}

export const NewPassword = memo(({password, password2, setPassword, setPassword2, changePassword,
                                     isLoading, error, theme}: NewPasswordPropsType) => {
    return (
        <div className={`${s.container} ${t[theme + '-text']}`}>
            <Logo/>
            <div className={s.preloader}>{isLoading && <Preloader/>}</div>
            <div className={s.mainText}>Create new password</div>
            <span>Password</span>
            <div><SuperInputText value={password} onChangeText={setPassword}
                                 onEnter={changePassword} eye/></div>
            <span>Confirm password</span>
            <div><SuperInputText value={password2} onChangeText={setPassword2}
                                 onEnter={changePassword}eye/></div>
            <span>Create new password</span>
            <div className={s.buttons}>
                <SuperButton disabled={isLoading} onClick={changePassword}>
                    Create new password
                </SuperButton>
            </div>
            <div className={s.error}>{error}</div>
        </div>
    )
})