import {AppThunk, InferActionTypes} from './store'
import {cardsAPI, CardType} from '../components/Cards/CardsAPI/cards-api'
import {chooseCard} from '../utils/clever-card-choice'
import {handleServerNetworkError} from '../utils/error-handler'
import {cardsActions, getCards} from '../components/Cards/CardsBLL/cards-reducer'

const InitialState = {
    randomCard: {} as CardType,
    isLearnLoading: false
}

export const learnReducer = (state: InitialStateType = InitialState, action: LearnActionTypes): InitialStateType => {
    switch (action.type) {

        case 'LEARN/SET_IS_LOADING':
        case 'LEARN/SET_RANDOM_CARD':
        case 'LEARN/SET_GRAGE':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const learnActions = {
    setRandomCard: (randomCard: CardType) => ({type: 'LEARN/SET_RANDOM_CARD', payload: {randomCard}} as const),
    setLearnIsLoading: (isLearnLoading: boolean) => ({
        type: 'LEARN/SET_IS_LOADING',
        payload: {isLearnLoading}
    } as const),
    setGrade: (grade: number) => ({type: 'LEARN/SET_GRAGE', payload: {grade}} as const),
    setAppError: (error: string) => ({type: 'APP/SET_ERROR', payload: {error}} as const)
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

export const estimate = (grade: number): AppThunk => async (dispatch, getState) => {
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

