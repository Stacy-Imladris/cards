import {AppThunk, InferActionTypes} from './store'
import {cardsAPI, CardType} from '../components/Cards/CardsAPI/cards-api'
import {handleServerNetworkError} from '../utils/handleServerNetworkError';
import {appActions} from './appReducer';
import {getRandomCard} from '../utils/getRandomCard';

const InitialState = {
    cards: [] as CardType[],
    randomCard: {} as CardType,
}

export const learnReducer = (state: InitialStateType = InitialState, action: LearnActionTypes): InitialStateType => {
    switch (action.type) {
        case 'LEARN/SET_CARDS':
        case 'LEARN/SET_RANDOM_CARD':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const learnActions = {
    setCards: (cards: CardType[]) => ({type: 'LEARN/SET_CARDS', payload: {cards}} as const),
    setRandomCard: (randomCard: CardType) => ({type: 'LEARN/SET_RANDOM_CARD', payload: {randomCard}} as const),
}


//thunks
export const learnCard = (cardsPack_id: string): AppThunk => async (dispatch, getState) => {
    dispatch(appActions.setAppIsLoading(true))
    try {
        const pageCount = getState().packs.maxCardsCount
        const response = await cardsAPI.getCards({cardsPack_id, pageCount})
        dispatch(learnActions.setCards(response.cards))
        dispatch(learnActions.setRandomCard(getRandomCard(response.cards)))
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
        await cardsAPI.rate({grade, card_id})
        dispatch(appActions.setAppStatus('Card successfully rated'))
    } catch (e) {
        handleServerNetworkError(dispatch, e as Error)
    } finally {
        dispatch(appActions.setAppIsLoading(false))
    }
}

//types
export type InitialStateType = typeof InitialState
export type LearnActionTypes = InferActionTypes<typeof learnActions>

