import {instance} from '../../../api/instance';
import {CardsParamsType} from '../CardsBLL/cards-reducer';
import {AxiosResponse} from 'axios';

export const cardsAPI = {
    getCards(params: Partial<CardsParamsType>) {
        return instance.get<any, AxiosResponse<CardsResponseType>, Partial<CardsParamsType>>('cards/card', {params}).then(res => res.data)
    },
    addCard(card: NewCardType) {
        return instance.post<any, AxiosResponse<AdditionalCardResponse & Pick<CardResponses, 'newCard'>>, NewCardType>('cards/card', card)
    },
    deleteCard(cardId: string) {
        return instance.delete<any, AxiosResponse<AdditionalCardResponse & Pick<CardResponses, 'deletedCard'>>>(`cards/card?id=${cardId}`)
    },
    updateCard(card: UpdateCardPayload) {
        return instance.put<any, AxiosResponse<AdditionalCardResponse & Pick<CardResponses, 'updatedCard'>>, UpdateCardPayload>(`cards/card`, card)
    },
    rate(payload: RateType) {
        return instance.put<any, AxiosResponse<RateResponseType>, RateType>(`cards/grade`, payload)
            .then(res => res.data.updatedGrade.grade)
    },
}

//types
export type CardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type CardType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: Date
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: Date
    user_id: string
    __v: number
    _id: string
}
export type NewCardType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
    }
}
export type UpdateCardPayload = {
    card: {
        _id: string
        answer?: string
        question?: string
        cardsPack_id?: string
        grade?: number
        shots?: number
        user_id?: string
        created?: Date
        updated?: Date
    }
}
export type CardResponses = {
    newCard: CardType
    deletedCard: CardType
    updatedCard: CardType
}
export type AdditionalCardResponse = {
    token: string
    tokenDeathTime: number
}
export type RateType = {
    grade: number
    card_id: string
}
export type RateResponseType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}