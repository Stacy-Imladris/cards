import {AxiosResponse} from 'axios'
import {UserType} from "../../Profile/profile-api";
import {instance} from '../../../api/instance';

<<<<<<< HEAD:src/components/Login/LoginAPI/api.ts

const instance = axios.create({
    // baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})


export const cardsApi = {
=======
export const loginAPI = {
>>>>>>> master:src/components/Login/LoginAPI/login-api.ts
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

