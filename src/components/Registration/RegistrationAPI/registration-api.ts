import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    //baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const registrationAPI = {
    toSignUp(data: Omit<RegDataType, 'password2'>) {
        return instance.post<any, AxiosResponse<RegResponseType>, Omit<RegDataType, 'password2'>>('auth/register', data)
            .then(res => res.data)
    },
}

export type RegDataType = {
    email: string
    password: string
    password2: string
}
export type RegResponseType = {
    error?: string
}