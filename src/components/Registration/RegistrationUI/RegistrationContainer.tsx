import {useState} from 'react';
import {Registration} from './Registration';
import {useDispatch} from 'react-redux';
import {signUp} from '../RegistrationBLL/registration-reducer';

export const RegistrationContainer = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')

    const dispatch = useDispatch()

    const toSignUp = () => {
        dispatch(signUp({email, password, password2}))
    }

    return <Registration signUp={toSignUp} email={email} password={password} password2={password2}
        setEmail={setEmail} setPassword={setPassword} setPassword2={setPassword2}/>
}