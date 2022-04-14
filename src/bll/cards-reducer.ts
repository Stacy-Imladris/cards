import {cardsAPI, CardType, NewCardType, UpdateCardPayload} from '../api/cards-api'
import {AppThunk, InferActionTypes} from './store';
import axios from 'axios';
import {packsActions} from "./packs-reducer";

const cardsInitialState = {
    cards: [] as CardType[],
    errorCards: '',
    isLoading: false,
    params: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 5,
        sortCards: '0grade',
        page: 1,
        pageCount: 10,
    } as CardsParamsType,
    cardsTotalCount: 0,
    packName: '',
    statusCard: '' as RequestStatusCardType
}

export const cardsReducer = (state: CardsInitialStateType = cardsInitialState, action: CardsActionTypes): CardsInitialStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS':
        case 'CARDS/SET_CARDS_ERROR':
        case 'CARDS/SET_CARDS_IS_LOADING':
        case 'CARDS/SET_CARDS_TOTAL_COUNT':
        case 'CARDS/SET_STATUS':
        case 'CARDS/SET_PACK_NAME':
            return {...state, ...action.payload}
        case 'CARDS/SET_CURRENT_PAGE':
        case 'CARDS/SET_ANSWER_FOR_SEARCH':
        case 'CARDS/SET_QUESTION_FOR_SEARCH':
        case 'CARDS/SET_SORT_PARAMETERS':
        case 'CARDS/SET_PACK_ID':
        case 'CARDS/SET_CARDS_PAGE_COUNT':
            return {...state, params: {...state.params, ...action.payload}}
        default:
            return state
    }
}

export const cardsActions = {
    setCards: (cards: CardType[]) => ({type: 'CARDS/SET_CARDS', payload: {cards}} as const),
    setCardsError: (errorCards: string) => ({type: 'CARDS/SET_CARDS_ERROR', payload: {errorCards}} as const),
    setCardsIsLoading: (isLoading: boolean) => ({type: 'CARDS/SET_CARDS_IS_LOADING', payload: {isLoading}} as const),
    setCardsTotalCount: (cardsTotalCount: number) =>
        ({type: 'CARDS/SET_CARDS_TOTAL_COUNT', payload: {cardsTotalCount}} as const),
    setCurrentPage: (page: number) => ({type: 'CARDS/SET_CURRENT_PAGE', payload: {page}} as const),
    setAnswerForSearch: (cardAnswer: string) => ({type: 'CARDS/SET_ANSWER_FOR_SEARCH', payload: {cardAnswer}} as const),
    setQuestionForSearch: (cardQuestion: string) => ({type: 'CARDS/SET_QUESTION_FOR_SEARCH', payload: {cardQuestion}} as const),
    setSortParameters: (sortCards: string) => ({type: 'CARDS/SET_SORT_PARAMETERS', payload: {sortCards}} as const),
    setPackId: (cardsPack_id: string) => ({type: 'CARDS/SET_PACK_ID', payload: {cardsPack_id}} as const),
    setPackName: (packName: string) => ({type: 'CARDS/SET_PACK_NAME', payload: {packName}} as const),
    setCardsPageCount: (pageCount: number) => ({type: 'CARDS/SET_CARDS_PAGE_COUNT', payload: {pageCount}} as const),
    setStatus: (statusCard: RequestStatusCardType)=> ({type: 'CARDS/SET_STATUS', payload: {statusCard}} as const),
}

//thunks
export const getCards = (): AppThunk => async (dispatch, getState) => {
    const params = getState().cards.params
    dispatch(cardsActions.setCardsIsLoading(true))
    try {
        const data = await cardsAPI.getCards(params)
        dispatch(cardsActions.setCardsError(''))
        dispatch(cardsActions.setCardsTotalCount(data.cardsTotalCount))
        dispatch(cardsActions.setCards(data.cards))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(cardsActions.setCardsError(e.response ? e.response.data.error : e.message))
        } else {
            dispatch(cardsActions.setCardsError('Some error occurred'))
        }
    } finally {
        dispatch(cardsActions.setCardsIsLoading(false))
    }
}

export const addCard = (card: NewCardType): AppThunk => async (dispatch) => {
    dispatch(packsActions.setPacksIsLoading(true))
    try {
        await cardsAPI.addCard(card)
        dispatch(cardsActions.setStatus("successfully added"))
        dispatch(cardsActions.setCurrentPage(1))
        dispatch(getCards())
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(packsActions.setPacksError(e.response ? e.response.data.error : e.message))
        } else {
            dispatch(packsActions.setPacksError('Some error occurred'))
        }
    } finally {
        dispatch(packsActions.setPacksIsLoading(false))
        setTimeout(()=> {
            dispatch(cardsActions.setStatus(''))
        }, 3000)
    }
}

export const deleteCard = (id: string): AppThunk => async (dispatch) => {
    dispatch(packsActions.setPacksIsLoading(true))
    try {
        await cardsAPI.deleteCard(id)
        dispatch(cardsActions.setStatus("deleted successfully"))
        dispatch(getCards())
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(packsActions.setPacksError(e.response ? e.response.data.error : e.message))
        } else {
            dispatch(packsActions.setPacksError('Some error occurred'))
        }
    } finally {
        dispatch(packsActions.setPacksIsLoading(false))
        setTimeout(()=> {
            dispatch(cardsActions.setStatus(""))
        }, 3000)
    }
}

export const updateCard = (updatingCard: UpdateCardPayload): AppThunk => async (dispatch) => {
    dispatch(packsActions.setPacksIsLoading(true))
    try {
        await cardsAPI.updateCard(updatingCard)
        dispatch(cardsActions.setCardsError(''))
        dispatch(getCards())
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(packsActions.setPacksError(e.response ? e.response.data.error : e.message))
        } else {
            dispatch(packsActions.setPacksError('Some error occurred'))
        }
    } finally {
        dispatch(packsActions.setPacksIsLoading(false))
    }
}

//types
export type CardsInitialStateType = typeof cardsInitialState
export type CardsActionTypes = InferActionTypes<typeof cardsActions>
export type CardsParamsType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number,
    max: number,
    sortCards: string
    page: number
    pageCount: number
}
export type RequestStatusCardType = 'deleted successfully'
    | 'successfully added'
    | 'add error'
    | 'deletion error' |''
export type CardsSortFieldsType = 'answer' | 'question' | 'updated' | 'grade'