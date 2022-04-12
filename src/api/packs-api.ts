import axios, {AxiosResponse} from 'axios'
import {ParamsType} from '../bll/packs-reducer';

const instance = axios.create({
    // baseURL: 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const packAPI = {
    getPacks(params: ParamsType) {
        return instance.get<PacksResponseType>('cards/pack', {params}).then(res => res.data)
    },
    addPack() {
        return instance.post('cards/pack')
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
    updatePack(updateData: UpdatePackType) {
        return instance.put<any, AxiosResponse<PackType>, UpdatePackType>(`cards/pack`, updateData )
    },
}

export type PacksResponseType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
export type PackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: Date
    updated: Date
    more_id: string
    __v: number
    deckCover: null | string
}

export type UpdatePackType = {
    _id: string
    name: string
}