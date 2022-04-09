import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    //baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const packAPI = {
    getPacks() {
        return instance.get('cards/pack').then(res => res.data)
    },
    addPack() {
        return instance.post('cards/pack')
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
}