import {ParamsType} from '../bll/packs-reducer';
import {instance} from './instance';

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
    updatePack(cardsPack: UpdatePackType) {
        return instance.put<any, AxiosResponse<PackType>, UpdatePackType>(`cards/pack`, cardsPack )
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

type UpdatePackType = {
    _id: string
    name: string
}