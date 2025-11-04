import {memo} from 'react';
import styles from 'common/styles/Forms.module.css'
import extraStyles from 'common/styles/Themes.module.css';
import {Link} from 'react-router-dom';
import {Preloader} from 'common/preloader/Preloader';
import {SuperButton} from 'common/super-components/c2-SuperButton/SuperButton';
import {SuperInputText} from 'common/super-components/c1-SuperInputText/SuperInputText';
import {Logo} from 'common/logo/Logo';

type Props = {
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
                              }: Props) => {
  return (
      <div className={`${styles.container} ${extraStyles[theme + '-text']}`}>
        <Logo/>
        {check
            ? <>
              <div className={styles.mainText}>Check Email</div>
              <span>We've sent an Email with instructions to {email}</span>
            </>
            : <>
              <div className={styles.preloader}>{isLoading && <Preloader/>}</div>
              <div className={styles.mainText}>Forgot your password?</div>
              <span>Email</span>
              <div>
                <SuperInputText value={email} onChangeText={setEmail}
                                onEnter={toSendInstructions}/>
              </div>
              <span>Enter your email address and we will send you further instructions</span>
              <div className={styles.buttons}>
                <SuperButton disabled={isLoading} onClick={toSendInstructions}>
                  Send instructions
                </SuperButton>
              </div>
              <span>Did you remember your password?</span>
              <div className={styles.error}>{error}</div>
              <div>
                <Link to="/login" className={`${styles.link} ${extraStyles[theme + '-text']}`}>
                  Try logging in
                </Link>
              </div>
            </>}
      </div>
  )
})