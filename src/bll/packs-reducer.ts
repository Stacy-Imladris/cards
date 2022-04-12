import {AppThunk, InferActionTypes} from './store';
import axios from 'axios';
import {packsAPI, PackType} from '../api/packs-api';

const packsInitialState = {
    packs: [] as PackType[],
    error: '',
    isLoading: false,
    minCardsCount: 0,
    maxCardsCount: 103,
    params: {
        packName: '',
        min: 0,
        max: 103,
        sortPacks: '0updated',
        page: 1,
        pageCount: 7,
        user_id: '',
    } as PacksParamsType,
    cardPacksTotalCount: 0,
}

export const packsReducer = (state: PacksInitialStateType = packsInitialState, action: PacksActionTypes): PacksInitialStateType => {
    switch (action.type) {
        case 'PACKS/SET_PACKS':
        case 'PACKS/SET_PACKS_ERROR':
        case 'PACKS/SET_PACKS_IS_LOADING':
        case 'PACKS/SET_CARD_PACKS_TOTAL_COUNT':
        case 'PACKS/SET_PACKS_MIN_CARDS_COUNT':
        case 'PACKS/SET_PACKS_MAX_CARDS_COUNT':
            return {...state, ...action.payload}
        case 'PACKS/SET_CURRENT_PAGE':
        case 'PACKS/SET_TITLE_FOR_SEARCH':
        case 'PACKS/SET_PACKS_FOR_USER':
        case 'PACKS/SET_SORT_PARAMETERS':
        case 'PACKS/SET_PACKS_MIN':
        case 'PACKS/SET_PACKS_MAX':
            return {...state, params: {...state.params, ...action.payload}}
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
    setCardPacksTotalCount: (cardPacksTotalCount: number) =>
        ({type: 'PACKS/SET_CARD_PACKS_TOTAL_COUNT', payload: {cardPacksTotalCount}} as const),
    setCurrentPage: (page: number) => ({type: 'PACKS/SET_CURRENT_PAGE', payload: {page}} as const),
    setTitleForSearch: (packName: string) => ({type: 'PACKS/SET_TITLE_FOR_SEARCH', payload: {packName}} as const),
    setSortParameters: (sortPacks: string) => ({type: 'PACKS/SET_SORT_PARAMETERS', payload: {sortPacks}} as const),
    setMinCardsCount: (minCardsCount: number)=> ({type: 'PACKS/SET_PACKS_MIN_CARDS_COUNT', payload: {minCardsCount}} as const),
    setMaxCardsCount: (maxCardsCount: number)=> ({type: 'PACKS/SET_PACKS_MAX_CARDS_COUNT', payload: {maxCardsCount}} as const),
}

//thunk
export const getPacks = (): AppThunk => async (dispatch, getState) => {
    const params = getState().packs.params
    dispatch(packsActions.setPacksIsLoading(true))
    try {
        const data = await packsAPI.getPacks(params)
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
export type PacksParamsType = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
}
export type SortValuesType = 'name' | 'cardsCount' | 'updated' | 'user_name'
export type SortOrderType = '0' | '1'