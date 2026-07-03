import type {AxiosResponse} from 'axios'
import {instance} from '../../../api/instance';

export const profileAPI = {
    me() {
        return instance.post<any, AxiosResponse<User>, {}>('auth/me', {})
    },
    update(name: string, avatar: string) {
        return instance.put<any, AxiosResponse<ResponseUpdate>, {name: string, avatar?: string}>('auth/me', {name})
    },
}

//types
type ResponseUpdate = {
    updatedUser: User
}

export type User = {
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
