import {AppThunk, InferActionTypes} from './store'
import {cardsAPI, CardType} from '../components/Cards/CardsAPI/cards-api'
import {appActions} from './appReducer'
import {handleServerNetworkError} from '../utils/error-handler'
import {getCard} from '../utils/clever-card-choice'

const InitialState = {
    cards: [] as CardType[],
    randomCard: {} as CardType,
}

export const learnReducer = (state: InitialStateType = InitialState, action: LearnActionTypes): InitialStateType => {
    switch (action.type) {
        case 'LEARN/SET_CARDS':
        case 'LEARN/SET_RANDOM_CARD':
            return {...state, ...action.payload}
        case 'LEARN/SET_GRADE':
            return {...state,
                cards: state.cards.map(card => card._id === action.cardId ? {...card, grade: action.grade} : card)}
        default:
            return state
    }
}

export const learnActions = {
    setCards: (cards: CardType[]) => ({type: 'LEARN/SET_CARDS', payload: {cards}} as const),
    setRandomCard: (randomCard: CardType) => ({type: 'LEARN/SET_RANDOM_CARD', payload: {randomCard}} as const),
    setGrade: (cardId: string, grade: number) => ({type: 'LEARN/SET_GRADE', cardId, grade} as const),
}


//thunks
export const learnCard = (packId: string): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppIsLoading(true))
    try {
        const response = await cardsAPI.getCards({cardsPack_id: packId, pageCount: 103})
        dispatch(learnActions.setCards(response.cards))
        const randomCard = getCard(response.cards)
        dispatch(learnActions.setRandomCard(randomCard))
    } catch (e) {
        handleServerNetworkError(dispatch, e as Error)
    } finally {
        dispatch(appActions.setAppIsLoading(false))
    }
}

export const rate = (grade: number): AppThunk => async (dispatch, getState) => {
    dispatch(appActions.setAppIsLoading(true))
    const card_id = getState().learn.randomCard._id
    try {
        const randomCardGrade = await cardsAPI.rate({grade, card_id})
        dispatch(learnActions.setGrade(card_id, randomCardGrade))
    } catch (e) {
        handleServerNetworkError(dispatch, e as Error)
    } finally {
        dispatch(appActions.setAppIsLoading(false))
    }
}

export const setRandomCard = (): AppThunk => async (dispatch, getState) => {
    const cards = getState().learn.cards
    const randomCard = getCard(cards)
    dispatch(learnActions.setRandomCard(randomCard))
}

export const cleanLearnState = (): AppThunk => async (dispatch) => {
    dispatch(learnActions.setRandomCard({} as CardType))
    dispatch(learnActions.setCards([]))
}

//types
export type InitialStateType = typeof InitialState
export type LearnActionTypes = InferActionTypes<typeof learnActions>

