import axios, {AxiosResponse} from 'axios'


const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    //baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})


export const cardsApi = {
    // login(data: LoginType) {
    //     return instance.post<any, AxiosResponse<UserType>, LoginType>('auth/login', data)
    // },
    me() {
        return instance.post<ResponseType>('auth/me', {})
    },
    update(name: string, avatar: string) {
        return instance.put<ResponseUpdateType>('auth/me', {name})
    },
    // logout() {
    //     return instance.delete<any, AxiosResponse<ResponseDeleteType>>('auth/me')
    // },
}


//types
export type LoginType = {
    email: string,
    password: string
}

type ResponseType = UserType

// type ResponseDeleteType = {
//     info: string
//     error?: string
// }

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
}
