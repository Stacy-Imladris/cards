import {AxiosResponse} from 'axios'
import {UserType} from "../../Profile/profile-api";
import {instance} from '../../../api/instance';

export const loginApi = {
    login(login: LoginType) {
        return instance.post<any, AxiosResponse<UserType>, LoginType>('auth/login', login)
    },
    logout() {
        return instance.delete<any, AxiosResponse<ResponseDeleteType>>('auth/me')
    },
}

//types
export type LoginType = {
    email: string,
    password: string,
    rememberMe: boolean
}

type ResponseDeleteType = {
    info: string
    error?: string
}
