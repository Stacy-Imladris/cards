import axios, {AxiosResponse} from 'axios'
import {UserType} from "../../../api/api";


const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    //baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})


export const cardsApi = {
    login(data: LoginType) {
        return instance.post<any, AxiosResponse<UserType>, LoginType>('auth/login', data)
    },
    logout() {
        return instance.delete<any, AxiosResponse<ResponseDeleteType>>('auth/me')
    },
}


//types
export type LoginType = {
    email: string,
    password: string
}

type ResponseDeleteType = {
    info: string
    error?: string
}

