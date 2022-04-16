import {AxiosResponse} from 'axios'
import {instance} from '../../../api/instance';

export const profileAPI = {
    me() {
        return instance.post<any, AxiosResponse<ResponseType>, {}>('auth/me', {})
    },
    update(name: string, avatar: string) {
        return instance.put<any, AxiosResponse<ResponseUpdateType>, {name: string, avatar?: string}>('auth/me', {name})
    },
}

//types
export type LoginType = {
    email: string,
    password: string
}

type ResponseType = UserType

type ResponseUpdateType = {
    updatedUser: UserType
}

export type UserType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
}
