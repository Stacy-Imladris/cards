import {AxiosResponse} from 'axios'
import {UserType} from "../../../Profile/ProfileAPI/profile-api";
import {instance} from '../../../../api/instance';

export const loginAPI = {
    login(login: LoginType) {
        return instance.post<any, AxiosResponse<UserType>, LoginType>('auth/login', login)
            .then(res => res.data)
    },
    logout() {
        return instance.delete<any, AxiosResponse<LogoutResponseType>>('auth/me')
    },
}

//types
export type LoginType = {
    email: string,
    password: string,
    rememberMe: boolean
}

type LogoutResponseType = {
    info: string
    error?: string
}

