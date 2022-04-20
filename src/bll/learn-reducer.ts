import {AppThunk, InferActionTypes} from './store'
import {cardsAPI, CardType} from '../components/Cards/CardsAPI/cards-api'
import {chooseCard, getCard} from '../utils/clever-card-choice'
import {handleServerNetworkError} from '../utils/error-handler'
import {cardsActions, getCards} from '../components/Cards/CardsBLL/cards-reducer'

const InitialState = {
    cards: [] as CardType[],
    randomCard: {} as CardType,
    isLearnLoading: false
}

export const learnReducer = (state: InitialStateType = InitialState, action: LearnActionTypes): InitialStateType => {
    switch (action.type) {

        case 'LEARN/SET_IS_LOADING':
        case 'LEARN/SET_CARDS':
        case 'LEARN/SET_RANDOM_CARD':
            return {...state, ...action.payload}
        case 'LEARN/SET_GRADE':
            return {...state, randomCard: {...state.randomCard, grade: action.grade}}
        case 'LEARN/CLEAR_RANDOM_CARD':
            return {...state, randomCard: {} as CardType}
        default:
            return state
    }
}

export const learnActions = {
    setCards: (cards: CardType[]) => ({type: 'LEARN/SET_CARDS', payload: {cards}} as const),
    setRandomCard: (randomCard: CardType) => ({type: 'LEARN/SET_RANDOM_CARD', payload: {randomCard}} as const),
    setLearnIsLoading: (isLearnLoading: boolean) => ({
        type: 'LEARN/SET_IS_LOADING',
        payload: {isLearnLoading}
    } as const),
    setGrade: (grade: number) => ({type: 'LEARN/SET_GRADE', grade} as const),
    clearRandomCard: () => ({type: 'LEARN/CLEAR_RANDOM_CARD'} as const)
}


//thunks
export const learnCard = (packId: string): AppThunk => async (dispatch) => {
    dispatch(learnActions.setLearnIsLoading(true))
    try {
        const response = await cardsAPI.getCards({cardsPack_id: packId})
        dispatch(learnActions.setCards(response.cards))
        const randomCard = getCard(response.cards)
        dispatch(learnActions.setRandomCard(randomCard))
    } catch (e) {
        handleServerNetworkError(dispatch, e as Error)
    } finally {
        dispatch(learnActions.setLearnIsLoading(false))
    }
}

export const setRandomCard = (): AppThunk => async (dispatch, getState) => {
    dispatch(learnActions.setLearnIsLoading(true))
    const cards = getState().learn.cards
    const randomCard = getCard(cards)
    dispatch(learnActions.setRandomCard(randomCard))
    dispatch(learnActions.setLearnIsLoading(false))
}

export const rate = (grade: number): AppThunk => async (dispatch, getState) => {
    const card_id = getState().learn.randomCard._id
    dispatch(learnActions.setLearnIsLoading(true))
    try {
        const updatedGrade = await cardsAPI.rate({grade, card_id})
        dispatch(learnActions.setGrade(updatedGrade))
    } catch (e) {
        handleServerNetworkError(dispatch, e as Error)
    } finally {
        dispatch(learnActions.setLearnIsLoading(false))
    }
}

//types
export type InitialStateType = typeof InitialState
export type LearnActionTypes = InferActionTypes<typeof learnActions>

