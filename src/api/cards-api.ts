import {instance} from './instance';
import {CardsParamsType} from '../components/Cards/cards-reducer';
import {AxiosResponse} from 'axios';

export const cardsAPI = {
    getCards(params: CardsParamsType) {
        return instance.get<any, AxiosResponse<CardsResponseType>, CardsParamsType>('cards/card', {params}).then(res => res.data)
    },
    addCard(card: NewCardType) {
        return instance.post<any, AxiosResponse<AdditionalCardResponse & Pick<CardResponses, 'newCard'>>, NewCardType>('cards/card', card)
    },
    deleteCard(cardId: string) {
        return instance.delete<any, AxiosResponse<AdditionalCardResponse & Pick<CardResponses, 'deletedCard'>>>(`cards/card?id=${cardId}`)
    },
    updateCard(card: UpdateCardPayload) {
        return instance.put<any, AxiosResponse<AdditionalCardResponse & Pick<CardResponses, 'updatedCard'>>, UpdateCardPayload>(`cards/card`, card)
    }
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
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: Date
    updated: Date
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