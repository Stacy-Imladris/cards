import {AxiosResponse} from 'axios';
import {instance} from '../../../../api/instance';

export const registrationAPI = {
    signUp(data: Omit<RegDataType, 'password2'>) {
        return instance.post<ResponseType, AxiosResponse<ResponseType>, Omit<RegDataType, 'password2'>>('auth/register', data)
            .then(res => res.data)
    },
}

export type RegDataType = {
    email: string
    password: string
    password2: string
}
export type ResponseType = {
    error?: string
}