import {AxiosResponse} from 'axios'
import {UserType} from "../../../Profile/ProfileAPI/profile-api";
import {instance} from '../../../../api/instance';

export const loginAPI = {
    login(login: LoginData) {
        return instance.post<any, AxiosResponse<UserType>, LoginData>('auth/login', login).then(res => res.data)
    },
    logout() {
        return instance.delete<any, AxiosResponse<LogoutResponse>>('auth/me')
    },
}

//types
export type LoginData = {
    email: string,
    password: string,
    rememberMe: boolean
}

type LogoutResponse = {
    info: string
    error?: string
}

