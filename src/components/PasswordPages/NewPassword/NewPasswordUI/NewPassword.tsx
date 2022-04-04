import React from 'react';
import s from '../../../../common/styles/Forms.module.css'
import t from '../../../../common/styles/Themes.module.css';
import {Preloader} from '../../../../common/preloader/Preloader';
import SuperInputText from '../../../../common/super-components/c1-SuperInputText/SuperInputText';
import SuperButton from '../../../../common/super-components/c2-SuperButton/SuperButton';
import {useAppSelector} from '../../../../bll/store';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../../../app/AllRoutes';

type NewPasswordPropsType = {
    password: string
    password2: string
    setPassword: (value: string) => void
    setPassword2: (value: string) => void
    changePassword: () => void
}

export const NewPassword = ({password, password2, setPassword, setPassword2, changePassword}: NewPasswordPropsType) => {
    const isLoading = useAppSelector(state => state.newPassword.isLoading)
    const error = useAppSelector(state => state.newPassword.error)
    const toLogin = useAppSelector(state => state.newPassword.toLogIn)
    const theme = useAppSelector(state => state.theme.theme)

    if (toLogin) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={`${s.container} ${t[theme + '-text']}`}>
            <div className={s.preloader}>{isLoading && <Preloader/>}</div>
            <div className={`${s.mainText} ${t[theme + '-text']}`}>Create new password</div>
            <span>Password</span>
            <div><SuperInputText value={password} onChangeText={setPassword} eye/></div>
            <span>Confirm password</span>
            <div><SuperInputText value={password2} onChangeText={setPassword2} eye/></div>
            <span>Create new password</span>
            <div className={s.buttons}>
                <SuperButton disabled={isLoading} onClick={changePassword}>Create new password</SuperButton>
            </div>
            <div className={`${s.error} ${t[theme + '-text']}`}>{error}</div>
        </div>
    )
}