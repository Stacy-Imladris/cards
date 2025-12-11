import {instance} from '../../../api/instance';
import {CardsParams} from '../CardsBLL/cards-reducer';
import {AxiosResponse} from 'axios';

export const cardsAPI = {
    getCards(params: Partial<CardsParams>) {
        return instance.get<any, AxiosResponse<CardsResponse>, Partial<CardsParams>>('cards/card', {params}).then(res => res.data)
    },
    addCard(card: NewCard) {
        return instance.post<any, AxiosResponse<AdditionalCardResponse & Pick<CardResponses, 'newCard'>>, NewCard>('cards/card', card)
    },
    deleteCard(cardId: string) {
        return instance.delete<any, AxiosResponse<AdditionalCardResponse & Pick<CardResponses, 'deletedCard'>>>(`cards/card?id=${cardId}`)
    },
    updateCard(card: UpdateCardPayload) {
        return instance.put<any, AxiosResponse<AdditionalCardResponse & Pick<CardResponses, 'updatedCard'>>, UpdateCardPayload>(`cards/card`, card)
    },
    rate(payload: Rate) {
        return instance.put<any, AxiosResponse<RateResponse>, Rate>(`cards/grade`, payload)
            .then(res => res.data.updatedGrade.grade)
    },
}

export type CardsResponse = {
    cards: CardItem[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type CardItem = {
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

export type NewCard = {
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
    newCard: CardItem
    deletedCard: CardItem
    updatedCard: CardItem
}

export type AdditionalCardResponse = {
    token: string
    tokenDeathTime: number
}

type Rate = {
    grade: number
    card_id: string
}

export type RateResponse = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}