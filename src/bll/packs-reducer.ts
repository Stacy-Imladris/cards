import {AppThunk, InferActionTypes} from './store';
import axios from 'axios';
import {packAPI, PackType} from '../api/packs-api';

const packsInitialState = {
    packs: [] as PackType[],
    error: '',
    isLoading: false,
    isPacksSet: false,
    minCardsCount: 1,
    maxCardsCount: 100,
    params: {
        packName: '',
        min: 3,
        max: 9,
        sortPacks: '0updated',
        page: 1,
        pageCount: 7,
        user_id: '',
    } as ParamsType,
    cardPacksTotalCount: 0,
}

export const packsReducer = (state: PacksInitialStateType = packsInitialState, action: PacksActionTypes): PacksInitialStateType => {
    switch (action.type) {
        case 'PACKS/SET_PACKS':
        case 'PACKS/SET_PACKS_ERROR':
        case 'PACKS/SET_PACKS_IS_LOADING':
        case 'PACKS/SET_IS_PACKS_SET':

        case 'PACKS/SET_CARD_PACKS_TOTAL_COUNT':
            return {...state, ...action.payload}
        case 'PACKS/SET_CURRENT_PAGE':
            return {...state, params: {...state.params, page: action.payload.currentPage}}
        case 'PACKS/SET_TITLE_FOR_SEARCH':
            return {...state, params: {...state.params, packName: action.payload.packName}}
        case 'PACKS/SET_PACKS_FOR_USER':
            return {...state, params: {...state.params, user_id: action.payload.user_id}}
        case 'PACKS/SET_PACKS_MIN':
            return {...state, params: {...state.params, min: action.payload.min}}
        case 'PACKS/SET_PACKS_MAX':
            return {...state, params: {...state.params, max: action.payload.max}}
        case 'PACKS/SET_PACKS_MIN_CARDS_COUNT':
            return {...state, minCardsCount: action.value}
        case 'PACKS/SET_PACKS_MAX_CARDS_COUNT':
            return {...state, maxCardsCount: action.value}

        default:
            return state
    }
}

export const packsActions = {
    setPacks: (packs: PackType[]) => ({type: 'PACKS/SET_PACKS', payload: {packs}} as const),
    setPacksForUser: (user_id: string) => ({type: 'PACKS/SET_PACKS_FOR_USER', payload: {user_id}} as const),
    setPacksMin: (min: number) => ({type: 'PACKS/SET_PACKS_MIN', payload: {min}} as const),
    setPacksMax: (max: number) => ({type: 'PACKS/SET_PACKS_MAX', payload: {max}} as const),
    setPacksError: (error: string) => ({type: 'PACKS/SET_PACKS_ERROR', payload: {error}} as const),
    setPacksIsLoading: (isLoading: boolean) => ({type: 'PACKS/SET_PACKS_IS_LOADING', payload: {isLoading}} as const),
    setIsPacksSet: (toLogIn: boolean) => ({type: 'PACKS/SET_IS_PACKS_SET', payload: {toLogIn}} as const),
    setCardPacksTotalCount: (cardPacksTotalCount: number) =>
        ({type: 'PACKS/SET_CARD_PACKS_TOTAL_COUNT', payload: {cardPacksTotalCount}} as const),
    setCurrentPage: (currentPage: number) => ({type: 'PACKS/SET_CURRENT_PAGE', payload: {currentPage}} as const),
    setTitleForSearch: (packName: string) => ({type: 'PACKS/SET_TITLE_FOR_SEARCH', payload: {packName}} as const),
    setMinCardsCount: (value: number)=> ({type: 'PACKS/SET_PACKS_MIN_CARDS_COUNT', value} as const),
    setMaxCardsCount: (value: number)=> ({type: 'PACKS/SET_PACKS_MAX_CARDS_COUNT', value} as const),
}

//thunk
export const getPacks = (): AppThunk => async (dispatch, getState) => {
    const params = getState().packs.params
    dispatch(packsActions.setPacksIsLoading(true))
    try {
        const data = await packAPI.getPacks(params)
        dispatch(packsActions.setPacksError(''))
        dispatch(packsActions.setCardPacksTotalCount(data.cardPacksTotalCount))
        dispatch(packsActions.setPacks(data.cardPacks))
        dispatch(packsActions.setMaxCardsCount(data.maxCardsCount))
        dispatch(packsActions.setMinCardsCount(data.minCardsCount))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            dispatch(packsActions.setPacksError(e.response ? e.response.data.error : e.message))
        } else {
            dispatch(packsActions.setPacksError('Some error occurred'))
        }
    } finally {
        dispatch(packsActions.setPacksIsLoading(false))
    }
}

//types
export type PacksInitialStateType = typeof packsInitialState
export type PacksActionTypes = InferActionTypes<typeof packsActions>
export type ParamsType = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
}