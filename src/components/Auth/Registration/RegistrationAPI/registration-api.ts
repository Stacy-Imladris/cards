import {AxiosResponse} from 'axios';
import {instance} from '../../../../api/instance';

export const registrationAPI = {
    signUp(data: Omit<RegData, 'password2'>) {
        return instance.post<ResponseType, AxiosResponse<ResponseType>, Omit<RegData, 'password2'>>('auth/register', data)
            .then(res => res.data)
    },
}

export type RegData = {
    email: string
    password: string
    password2: string
}
export type ResponseType = {
    error?: string
}