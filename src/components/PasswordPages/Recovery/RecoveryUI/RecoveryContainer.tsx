import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Recovery} from './Recovery';
import {toSendInstructions} from '../RecoveryBLL/recovery-reducer';

export const RecoveryContainer = () => {
    const [email, setEmail] = useState<string>('')

    const dispatch = useDispatch()

    const toSendInstructionsOnEmail = () => {
        dispatch(toSendInstructions(email))
    }

    return <Recovery toSendInstructions={toSendInstructionsOnEmail} email={email} setEmail={setEmail}/>
}