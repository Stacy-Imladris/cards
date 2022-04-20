import {AppThunk, InferActionTypes} from './store'
import {cardsAPI, CardType} from '../components/Cards/CardsAPI/cards-api'
import {chooseCard, getCard} from '../utils/clever-card-choice'
import {handleServerNetworkError} from '../utils/handleServerNetworkError';
import {appActions} from './appReducer';

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
export const learnCard = (packId: string): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppIsLoading(true))
    try {
        const response = await cardsAPI.getCards({cardsPack_id: packId})
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
        await cardsAPI.rate({grade, card_id})
    } catch (e) {
        handleServerNetworkError(dispatch, e as Error)
    } finally {
        dispatch(appActions.setAppIsLoading(false))
    }
}

export const setRandomCard = (): AppThunk => async (dispatch, getState) => {
    const cards = getState().learn.cards
    const randomCard = chooseCard(cards)
    dispatch(learnActions.setRandomCard(randomCard))
}

export const cleanLearnState = (): AppThunk => async (dispatch) => {
    dispatch(learnActions.setRandomCard({} as CardType))
    dispatch(learnActions.setCards([]))
}

//types
export type InitialStateType = typeof InitialState
export type LearnActionTypes = InferActionTypes<typeof learnActions>

