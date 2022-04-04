import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {NewPassword} from './NewPassword';
import {changePassword} from '../NewPasswordBLL/new-password-reducer';
import {useParams} from 'react-router-dom';

export const NewPasswordContainer = () => {
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')

    const dispatch = useDispatch()

    let {resetPasswordToken} = useParams<'resetPasswordToken'>()
    console.log(resetPasswordToken)
    const toChangePassword = () => {
        if (resetPasswordToken) {
            dispatch(changePassword({password, password2, resetPasswordToken}))
        }
    }

    return <NewPassword changePassword={toChangePassword} password={password} password2={password2}
                        setPassword={setPassword} setPassword2={setPassword2}/>
}