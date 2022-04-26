import {AppThunk, InferActionTypes} from './store'
import {cardsAPI, CardType} from '../components/Cards/CardsAPI/cards-api'
import {handleServerNetworkError} from '../utils/handleServerNetworkError';
import {appActions} from '../app/appReducer';
import {getRandomCard} from '../utils/getRandomCard';

const learnInitialState = {
    cards: [] as CardType[],
    randomCard: {} as CardType,
}

export const learnReducer = (state: LearnInitialStateType = learnInitialState, action: LearnActionTypes): LearnInitialStateType => {
    switch (action.type) {
        case 'LEARN/SET_CARDS':
        case 'LEARN/SET_RANDOM_CARD':
            return {...state, ...action.payload}
        case 'LEARN/SET_GRADE':
            return {...state,
                cards: state.cards.map(card => card._id === action.payload.cardId
                    ? {...card, grade: action.payload.grade} : card)}
        default:
            return state
    }
}

export const learnActions = {
    setCards: (cards: CardType[]) => ({type: 'LEARN/SET_CARDS', payload: {cards}} as const),
    setRandomCard: (randomCard: CardType) => ({type: 'LEARN/SET_RANDOM_CARD', payload: {randomCard}} as const),
    setGrade: (cardId: string, grade: number) => ({type: 'LEARN/SET_GRADE', payload: {cardId, grade}} as const),
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

export const rate = (grade: number, card_id: string): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppIsLoading(true))
    try {
        const randomCardGrade = await cardsAPI.rate({grade, card_id})
        dispatch(appActions.setAppStatus('Card successfully rated'))
        dispatch(learnActions.setGrade(card_id, randomCardGrade))
    } catch (e) {
        handleServerNetworkError(dispatch, e as Error)
    } finally {
        dispatch(appActions.setAppIsLoading(false))
    }
}

//types
export type LearnInitialStateType = typeof learnInitialState
export type LearnActionTypes = InferActionTypes<typeof learnActions>