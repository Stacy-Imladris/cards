import {InferActionTypes} from './store'
import {CardsResponseType, CardType} from '../api/cards-api'

const InitialState = {
    cards: [
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
            return {...state, params: {...state.params, cardAnswer: action.payload.question}}
        case 'CARDS/ADD-CARD':
            return {...state, cards: [{...action.payload.card}, ...state.cards]}
        case 'CARDS/DELETE-CARD':
            return {...state, cards: state.cards.filter(card => card._id !== action.payload.cardId)}
        case 'CARDS/UPDATE_CARD':
            return {
                ...state, cards: state.cards.map(card => {
                    return card._id === action.payload.cardId ? {...card, ...action.payload.card} : card
                })
            }
        default:
            return state
    }
}

export const cardsActions = {
    setCards: (cardsData: CardsResponseType) => ({type: 'CARDS/SET_CARDS', payload: {cardsData}} as const),
    setCurrentPage: (currentPage: number) => ({type: 'CARDS/SET_CURRENT_PAGE', payload: {currentPage}} as const),
    setCardsError: (error: string) => ({type: 'CARDS/SET_CARDS_ERROR', payload: {error}} as const),
    setCardsIsLoading: (isLoading: boolean) => ({type: 'CARDS/SET_CARDS_IS_LOADING', payload: {isLoading}} as const),
    setCardsTotalCount: (cardTotalCount: number) =>
        ({type: 'CARDS/SET_CARDS_TOTAL_COUNT', payload: {cardTotalCount}} as const),
    setAnswerTitleForSearch: (answer: string) =>
        ({type: 'CARDS/SET_ANSWER_TITLE_FOR_SEARCH', payload: {answer}} as const),
    setQuestionTitleForSearch: (question: string) =>
        ({type: 'CARDS/SET_QUESTION_TITLE_FOR_SEARCH', payload: {question}} as const),
    addCard: (card: CardType) => ({type: 'CARDS/ADD-CARD', payload: {card}} as const),
    deleteCard: (cardId: string) => ({type: 'CARDS/DELETE-CARD', payload: {cardId}} as const),
    updateCard: (cardId: string, card: CardType) =>
        ({type: 'CARDS/UPDATE_CARD', payload: {cardId, card}} as const)
}

//thunk


//types
type CardsStateType = typeof InitialState
export type CardsActionTypes = InferActionTypes<typeof cardsActions>

