import {memo} from 'react';
import styles from 'common/styles/Forms.module.css'
import t from 'common/styles/Themes.module.css';
import {Preloader} from 'common/preloader/Preloader';
import {SuperButton} from 'common/super-components/c2-SuperButton/SuperButton';
import {SuperInputText} from 'common/super-components/c1-SuperInputText/SuperInputText';
import {Logo} from 'common/logo/Logo';

type Props = {
  password: string
  password2: string
  setPassword: (value: string) => void
  setPassword2: (value: string) => void
  changePassword: () => void
  isLoading: boolean
  error: string
  theme: string
}

export const NewPassword = memo(({password, password2, setPassword, setPassword2, changePassword, isLoading, error, theme}: Props) => (
    <div className={`${styles.container} ${t[theme + '-text']}`}>
      <Logo/>
      <div className={styles.preloader}>{isLoading && <Preloader/>}</div>
      <div className={styles.mainText}>Create new password</div>
      <span>Password</span>
      <div><SuperInputText value={password} onChangeText={setPassword} onEnter={changePassword} eye/></div>
      <span>Confirm password</span>
      <div><SuperInputText value={password2} onChangeText={setPassword2} onEnter={changePassword} eye/></div>
      <span>Create new password</span>
      <div className={styles.buttons}>
        <SuperButton disabled={isLoading} onClick={changePassword}>Create new password</SuperButton>
      </div>
      <div className={styles.error}>{error}</div>
    </div>
)