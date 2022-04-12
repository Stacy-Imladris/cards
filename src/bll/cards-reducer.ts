import {AppThunk, InferActionTypes} from './store'
import axios from 'axios'
import {cardsAPI, CardsResponseType, CardType, ParamsGetCardsType, UpdateCardType} from '../api/cards-api'

const InitialState = {
    cardPacks: [
        {
            answer: '',
            question: '',
            cardsPack_id: '',
            grade: 4.987525071790364,
            shots: 1,
            user_id: '',
            created: '2020-05-13T11:05:44.867Z',
            updated: '2020-05-13T11:05:44.867Z',
            _id: ''
        }
    ] as CardType[],
    cardsTotalCount: 3,
    maxGrade: 4.987525071790364,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 4,
    packUserId: '',

    params: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 1,
        max: 10,
        sortCards: '0updated',
        page: 1,
        pageCount: 10
    },

    error: '',
    isLoading: false
}

export const cardsReducer = (state: CardsStateType = InitialState, action: CardsActionTypes): CardsStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS':
        case 'CARDS/SET_CURRENT_PAGE':
        case 'CARDS/SET_CARDS_ERROR':
        case 'CARDS/SET_CARDS_IS_LOADING':
        case 'CARDS/SET_CARDS_TOTAL_COUNT':
            return {...state, ...action.payload}
        case 'CARDS/SET_ANSWER_TITLE_FOR_SEARCH':
            return {...state, params: {...state.params, cardAnswer: action.payload.answer}}
        case 'CARDS/SET_QUESTION_TITLE_FOR_SEARCH':
            return {...state, params: {...state.params, cardQuestion: action.payload.question}}
        case 'CARDS/ADD-CARD':
            return {...state, cardPacks: [{...action.payload.card}, ...state.cardPacks]}
        case 'CARDS/DELETE-CARD':
            return {...state, cardPacks: state.cardPacks.filter(card => card._id !== action.payload.cardId)}
        case 'CARDS/UPDATE_CARD':
            return {
                ...state, cardPacks: state.cardPacks.map(card => {
                    return card._id === action.payload.cardId ? {...card, ...action.payload.card} : card
                })
            }
        default:
            return state
    }
}

export const cardsActions = {
    setCards: (cardsData: CardsResponseType) => ({type: 'CARDS/SET_CARDS', payload: cardsData} as const),
    setCurrentPage: (page: number) => ({type: 'CARDS/SET_CURRENT_PAGE', payload: {page}} as const),
    setCardsError: (error: string) => ({type: 'CARDS/SET_CARDS_ERROR', payload: {error}} as const),
    setCardsIsLoading: (isLoading: boolean) => ({type: 'CARDS/SET_CARDS_IS_LOADING', payload: {isLoading}} as const),
    setCardsTotalCount: (cardsTotalCount: number) =>
        ({type: 'CARDS/SET_CARDS_TOTAL_COUNT', payload: {cardsTotalCount}} as const),
    setAnswerTitleForSearch: (answer: string) =>
        ({type: 'CARDS/SET_ANSWER_TITLE_FOR_SEARCH', payload: {answer}} as const),
    setQuestionTitleForSearch: (question: string) =>
        ({type: 'CARDS/SET_QUESTION_TITLE_FOR_SEARCH', payload: {question}} as const),
    addCard: (card: CardType) => ({type: 'CARDS/ADD-CARD', payload: {card}} as const),
    deleteCard: (cardId: string) => ({type: 'CARDS/DELETE-CARD', payload: {cardId}} as const),
    updateCard: (cardId: string, card: UpdateCardType) =>
        ({type: 'CARDS/UPDATE_CARD', payload: {cardId, card}} as const)
}

//thunk
export const getCards = (params: ParamsGetCardsType): AppThunk => async (dispatch) => {
    dispatch(cardsActions.setCardsIsLoading(true))
    try {
        const data = await cardsAPI.getCards(params)
        dispatch(cardsActions.setCardsError(''))
        dispatch(cardsActions.setCardsTotalCount(data.data.cardsTotalCount))
        dispatch(cardsActions.setCards(data.data))
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
export type CardsStateType = typeof InitialState
export type CardsActionTypes = InferActionTypes<typeof cardsActions>

