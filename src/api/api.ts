import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    //baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true
})


export const cardsApi = {
    login(data: LoginType) {
        return instance.post("auth/login", data)
    },
    logout() {
        return instance.delete("auth/me")
    },
}


//types
export type LoginType = {
    email: string,
    password: string
}
