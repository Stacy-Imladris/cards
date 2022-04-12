import {cardsAPI, CardType} from '../api/cards-api';
import {AppThunk, InferActionTypes} from './store';
import axios from 'axios';

const cardsInitialState = {
    cards: [] as CardType[],
    error: '',
    isLoading: false,
    params: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 5,
        sortCards: '0grade',
        page: 1,
        pageCount: 7,
    } as CardsParamsType,
    cardsTotalCount: 0,
    packName: '',
}

export const cardsReducer = (state: CardsInitialStateType = cardsInitialState, action: CardsActionTypes): CardsInitialStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS':
        case 'CARDS/SET_CARDS_ERROR':
        case 'CARDS/SET_CARDS_IS_LOADING':
        case 'CARDS/SET_CARDS_TOTAL_COUNT':
        case 'CARDS/SET_PACK_NAME':
            return {...state, ...action.payload}
        case 'CARDS/SET_CURRENT_PAGE':
        case 'CARDS/SET_ANSWER_FOR_SEARCH':
        case 'CARDS/SET_QUESTION_FOR_SEARCH':
        case 'CARDS/SET_SORT_PARAMETERS':
        case 'CARDS/SET_PACK_ID':
            return {...state, params: {...state.params, ...action.payload}}
        default:
            return state
    }
}

export const cardsActions = {
    setCards: (cards: CardType[]) => ({type: 'CARDS/SET_CARDS', payload: {cards}} as const),
    setCardsError: (error: string) => ({type: 'CARDS/SET_CARDS_ERROR', payload: {error}} as const),
    setCardsIsLoading: (isLoading: boolean) => ({type: 'CARDS/SET_CARDS_IS_LOADING', payload: {isLoading}} as const),
    setCardsTotalCount: (cardsTotalCount: number) =>
        ({type: 'CARDS/SET_CARDS_TOTAL_COUNT', payload: {cardsTotalCount}} as const),
    setCurrentPage: (page: number) => ({type: 'CARDS/SET_CURRENT_PAGE', payload: {page}} as const),
    setAnswerForSearch: (cardAnswer: string) => ({type: 'CARDS/SET_ANSWER_FOR_SEARCH', payload: {cardAnswer}} as const),
    setQuestionForSearch: (cardQuestion: string) => ({type: 'CARDS/SET_QUESTION_FOR_SEARCH', payload: {cardQuestion}} as const),
    setSortParameters: (sortCards: string) => ({type: 'CARDS/SET_SORT_PARAMETERS', payload: {sortCards}} as const),
    setPackId: (cardsPack_id: string) => ({type: 'CARDS/SET_PACK_ID', payload: {cardsPack_id}} as const),
    setPackName: (packName: string) => ({type: 'CARDS/SET_PACK_NAME', payload: {packName}} as const),
}

//thunk
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
//export type SortValuesType = 'name' | 'cardsCount' | 'updated' | 'user_name'
//export type SortOrderType = '0' | '1'