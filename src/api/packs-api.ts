import {AxiosResponse} from 'axios';
import {PacksParamsType} from '../bll/packs-reducer';
import {instance} from './instance';

export const packsAPI = {
    getPacks(params: PacksParamsType) {
        return instance.get<any, AxiosResponse<PacksResponseType>, PacksParamsType>('cards/pack', {params}).then(res => res.data)
    },
    addPack(cardsPack: CardsPackAddType) {
        return instance.post<CardsPackAddType>('cards/pack', {cardsPack})
    },
    deletePack(_id: string) {
        return instance.delete(`cards/pack?id=${_id}`)
    },
    updatePack(cardsPack: UpdatePackType) {
        return instance.put<any, AxiosResponse<PackType>, UpdatePackType>(`cards/pack`, cardsPack )
    },
}

//types
export type PacksResponseType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
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
type UpdatePackType = {
    _id: string
    name: string
}

export type CardsPackAddType = {
    name: string,
    deckCover: string,
    private: boolean
}