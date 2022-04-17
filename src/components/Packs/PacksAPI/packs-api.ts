import {AxiosResponse} from 'axios';
import {PacksParamsType} from '../PacksBLL/packs-reducer';
import {instance} from '../../../api/instance';

export const packsAPI = {
    getPacks(params: PacksParamsType) {
        return instance.get<any, AxiosResponse<PacksResponseType>, PacksParamsType>('cards/pack', {params}).then(res => res.data)
    },
    addPack(cardsPack: Partial<AddNewCardType>) {
        return instance.post<any, AxiosResponse<AdditionalPackResponse & Pick<PackResponses, 'newCardsPack'>>, Partial<AddNewCardType>>('cards/pack', cardsPack)
    },
    deletePack(_id: string) {
        return instance.delete<any, AxiosResponse<AdditionalPackResponse & Pick<PackResponses, 'deletedCardsPack'>>>(`cards/pack?id=${_id}`)
    },
    updatePack(cardsPack: UpdatePackType) {
        return instance.put<any, AxiosResponse<AdditionalPackResponse & Pick<PackResponses, 'updatedCardsPack'>>, UpdatePackType>(`cards/pack`, cardsPack)
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
export type UpdatePackType = {
    cardsPack: {
        _id: string
        user_id?: string
        user_name?: string
        private?: boolean
        name?: string
        path?: string
        grade?: number
        shots?: number
        cardsCount?: number
        type?: string
        rating?: number
        created?: Date
        updated?: Date
        more_id?: string
        __v?: number
        deckCover?: null | string
    }
}
export type AddNewCardType = {
    cardsPack: {
        name: string,
        deckCover: string,
        private: boolean
    }
}
export type PackResponses = {
    newCardsPack: PackType
    deletedCardsPack: PackType
    updatedCardsPack: PackType
}
export type AdditionalPackResponse = {
    token: string
    tokenDeathTime: number
}