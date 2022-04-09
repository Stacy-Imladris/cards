import axios from 'axios';
import {ParamsType} from '../bll/packs-reducer';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    //baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const packAPI = {
    getPacks(params: ParamsType) {
        return instance.get('cards/pack', {params}).then(res => res.data)
    },
    addPack() {
        return instance.post('cards/pack')
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
}