import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true
})

export const cardsApi = {
    login(data: LoginType) {
        return instance.post('auth/login', data)
    },
    me() {
        return instance.post<ResponseType>('auth/me', {})
    },
    update(data: profileData) {
        return instance.put<ResponseUpdateType>('auth/me', data)
    },
}


//types
export type LoginType = {
    email: string,
    password: string
}

type profileData = {
    name: string
    avatar: string
}

type ResponseType = UserType

type ResponseUpdateType = {
    updatedUser: UserType
    error?: string
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
    error?: string
}