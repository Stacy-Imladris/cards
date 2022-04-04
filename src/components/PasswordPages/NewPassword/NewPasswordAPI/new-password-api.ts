import axios, {AxiosResponse} from 'axios';
import {ResponseType} from '../../../Registration/RegistrationAPI/registration-api';

const instance = axios.create({
    //baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const newPasswordAPI = {
    changePassword(data: Omit<NewPasswordDataType, 'password2'>) {
        return instance.post<any, AxiosResponse<ResponseType>, Omit<NewPasswordDataType, 'password2'>>('auth/set-new-password', data).then(res => res.data)
    },
}

export type NewPasswordDataType = {
    password: string
    password2: string
    token: string
}