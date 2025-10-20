import {AxiosResponse} from 'axios';
import {instance} from '../../../../api/instance';
import {ResponseType} from '../../Registration/RegistrationAPI/registration-api';

export const recoveryAPI = {
    async toSendInstructions(email: string) {
        return instance.post<any, AxiosResponse<ResponseType>, RecoveryData>('auth/forgot', {
            email, from: '<ada.davis27@gmail.com>',
            message: `<div style="background-color: #d0eca1; padding: 20px; border-radius: 15px">BRAINSTORM: This is a password recovery link: <a href='https://stacy-imladris.github.io/cards#/new-password/$token$'>link</a></div>`
        }).then(res => res.data)
    },
}

export type RecoveryData = {
    email: string
    from: string
    message: string
}