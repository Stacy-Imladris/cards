import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {NewPassword} from './NewPassword';
import {changePassword} from '../NewPasswordBLL/new-password-reducer';
import {useParams} from 'react-router-dom';

export const NewPasswordContainer = () => {
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')

    const dispatch = useDispatch()

    let {token} = useParams<'token'>()

    const toChangePassword = () => {
        if (token) {
            dispatch(changePassword({password, password2, token}))
        }
    }

    return <NewPassword changePassword={toChangePassword} password={password} password2={password2}
                        setPassword={setPassword} setPassword2={setPassword2}/>
}