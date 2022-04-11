import {instance} from './instance';
import {CardsParamsType} from '../bll/cards-reducer';
import {AxiosResponse} from 'axios';

export const cardsAPI = {
    getCards(params: CardsParamsType) {
        return instance.get<any, AxiosResponse<CardsResponseType>, CardsParamsType>('cards/card', {params}).then(res => res.data)
    },
    addCard(newCard: NewCardType) {
        return instance.post('cards/card', {newCard})
    },
    deleteCard(cardId: string) {
        return instance.delete(`cards/card?id=${cardId}`)
    },
    updateCard(payload: UpdateCardPayload) {
        return instance.put(`cards/card`, {payload})
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
    cardsPack_id: string
    question: string
    answer: string
    grade: number
    shots: number
    answerImg: string
    questionImg: string
    questionVideo: string
    answerVideo: string
}
export type UpdateCardPayload = {
    _id: string
}