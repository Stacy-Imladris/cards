import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    //baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const cardsAPI = {
    getCards(data: ParamsGetCardsType) {
        return instance.get<CardsResponseType>('/cards/card', {data}).then(res => res.data)
    },
    addCards(data: ParamsAddCardsType) {
        return instance.post('/cards/card',{data})
    },
    deleteCards(cardsPackId: string) {
        return instance.delete(`/cards/card?id=${cardsPackId}`)
    },
    putCards(data: ParamsPutCardsType) {
        return instance.put(`/cards/card`, {data})
    }
}

export type ParamsGetCardsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: number
    min?: number
    max?: number
    sortCards?:number
    page?:number
    pageCount?:number
}

export type ParamsAddCardsType = {
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

export type ParamsPutCardsType = {
    _id: string
    question?: string
    comments?: string
}

export type CardsResponseType = {
    cardPacks: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}
