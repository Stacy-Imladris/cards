import React from 'react';
import s from '../../../../common/styles/Forms.module.css'
import t from '../../../../common/styles/Themes.module.css';
import {Preloader} from '../../../../common/preloader/Preloader';
import SuperInputText from '../../../../common/super-components/c1-SuperInputText/SuperInputText';
import SuperButton from '../../../../common/super-components/c2-SuperButton/SuperButton';
import {useAppSelector} from '../../../../bll/store';
import {useDispatch} from 'react-redux';
import {recoveryActions} from '../RecoveryBLL/recovery-reducer';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../../../app/AllRoutes';

type RecoveryPropsType = {
    email: string
    setEmail: (value: string) => void
    toSendInstructions: () => void
}

export const Recovery = ({setEmail, email, toSendInstructions}: RecoveryPropsType) => {
    const isLoading = useAppSelector(state => state.recovery.isLoading)
    const error = useAppSelector(state => state.recovery.error)
    const toLogin = useAppSelector(state => state.recovery.toLogIn)
    const check = useAppSelector(state => state.recovery.check)
    const theme = useAppSelector(state => state.theme.theme)
    const dispatch = useDispatch()

    if (toLogin) {
        return <Navigate to={PATH.LOGIN}/>
    }

    const toLogIn = () => {
        dispatch(recoveryActions.toLogIn(true))
    }

    return check
        ? <div>
            <div className={`${s.mainText} ${t[theme + '-text']}`}>Check Email</div>
            <span>We've sent an Email with instructions to {email}</span>
        </div>
        : <div className={`${s.container} ${t[theme + '-text']}`}>
            <div className={s.preloader}>{isLoading && <Preloader/>}</div>
            <div className={`${s.mainText} ${t[theme + '-text']}`}>Forgot your password?</div>
            <span>Email</span>
            <div><SuperInputText value={email} onChangeText={setEmail}/></div>
            <span>Enter your email address and we will send you further instructions</span>
            <div className={s.buttons}>
                <SuperButton disabled={isLoading} onClick={toSendInstructions}>Send instructions</SuperButton>
            </div>
            <span>Did you remember your password?</span>
            <div className={`${s.error} ${t[theme + '-text']}`}>{error}</div>
            <div onClick={toLogIn}>Try logging in</div>
        </div>
}