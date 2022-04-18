import {AppThunk, InferActionTypes} from './store'
import {cardsAPI, CardType} from '../components/Cards/CardsAPI/cards-api'
import {chooseCard, getCard} from '../utils/clever-card-choice'
import {appActions} from './appReducer'
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
        case 'LEARN/SET_RANDOM_CARD':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const learnActions = {
    setRandomCard: (randomCard: CardType) => ({type: 'LEARN/SET_RANDOM_CARD', payload: {randomCard}} as const),
    setLearnIsLoading: (isLearnLoading: boolean) => ({type: 'LEARN/SET_IS_LOADING', payload: {isLearnLoading}} as const),
    setAppError: (error: string) => ({type: 'APP/SET_ERROR', payload: {error}} as const),
}


//thunks
export const learnCard = (packId: string): AppThunk => async (dispatch, getState) => {
    dispatch(learnActions.setLearnIsLoading(true))
    dispatch(cardsActions.setPackId(packId))
    try {
        await dispatch(getCards())
        const cards = getState().cards.cards
        const randomCard: CardType = chooseCard(cards)
        dispatch(learnActions.setRandomCard(randomCard))
    } catch (e) {
        handleServerNetworkError(dispatch, e as Error)
    } finally {
        dispatch(learnActions.setLearnIsLoading(false))
    }
}

//types
export type InitialStateType = typeof InitialState
export type LearnActionTypes = InferActionTypes<typeof learnActions>

