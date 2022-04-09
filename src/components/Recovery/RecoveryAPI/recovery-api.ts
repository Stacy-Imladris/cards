import axios, {AxiosResponse} from 'axios';
import {ResponseType} from '../../Registration/RegistrationAPI/registration-api';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    //baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const recoveryAPI = {
    toSendInstructions(email: string) {
        return instance.post<any, AxiosResponse<ResponseType>, RecoveryDataType>('auth/forgot', {
            email, from: '<ada.davis27@gmail.com>',
            message: `<div style="background-color: #d0eca1; padding: 20px; border-radius: 15px">BRAINSTORM: This is a password recovery link: <a href='https://stacy-imladris.github.io/cards#/new-password/$token$'>link</a></div>`
        }).then(res => res.data)
    },
}

export type RecoveryDataType = {
    email: string
    from: string
    message: string
}