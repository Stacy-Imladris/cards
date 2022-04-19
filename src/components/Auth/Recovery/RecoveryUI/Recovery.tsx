import s from '../../../../common/styles/Forms.module.css'
import t from '../../../../common/styles/Themes.module.css';
import {Link} from 'react-router-dom';
import {memo} from 'react';
import {Preloader} from '../../../../common/preloader/Preloader';
import {SuperButton} from '../../../../common/super-components/c2-SuperButton/SuperButton';
import {SuperInputText} from '../../../../common/super-components/c1-SuperInputText/SuperInputText';
import {Logo} from '../../../../common/logo/Logo';

type RecoveryPropsType = {
    email: string
    setEmail: (value: string) => void
    toSendInstructions: () => void
    isLoading: boolean
    error: string
    check: boolean
    theme: string
}

export const Recovery = memo(({
                                  setEmail,
                                  email,
                                  toSendInstructions,
                                  isLoading,
                                  error,
                                  check,
                                  theme
                              }: RecoveryPropsType) => {
    return check
        ? <div className={`${s.container} ${t[theme + '-text']}`}>
            <Logo/>
            <div className={s.mainText}>Check Email</div>
            <span>We've sent an Email with instructions to {email}</span>
        </div>
        : <div className={`${s.container} ${t[theme + '-text']}`}>
            <Logo/>
            <div className={s.preloader}>{isLoading && <Preloader/>}</div>
            <div className={s.mainText}>Forgot your password?</div>
            <span>Email</span>
            <div>
                <SuperInputText value={email} onChangeText={setEmail}
                                onEnter={toSendInstructions}/>
            </div>
            <span>Enter your email address and we will send you further instructions</span>
            <div className={s.buttons}>
                <SuperButton disabled={isLoading} onClick={toSendInstructions}>
                    Send instructions
                </SuperButton>
            </div>
            <span>Did you remember your password?</span>
            <div className={s.error}>{error}</div>
            <div>
                <Link to="/login" className={`${s.link} ${t[theme + '-text']}`}>
                    Try logging in
                </Link>
            </div>
        </div>
})