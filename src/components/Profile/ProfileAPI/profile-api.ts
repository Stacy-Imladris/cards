import type {AxiosResponse} from 'axios'
import {instance} from '../../../api/instance';

export const profileAPI = {
    me() {
        return instance.post<any, AxiosResponse<User>, {}>('auth/me', {})
    },
    update(name: string, avatar: string) {
        return instance.put<any, AxiosResponse<{updatedUser: User}>, {name: string, avatar?: string}>('auth/me', {name})
    },
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
