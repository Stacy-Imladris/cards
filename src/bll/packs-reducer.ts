import {AppThunk, InferActionTypes} from './store';
import axios from 'axios';
import {packAPI, PackType} from '../api/packs-api';

const packsInitialState = {
    packs: [] as PackType[],
    error: '',
    isLoading: false,
    isPacksSet: false,
    params: {
        packName: '',
        min: 3,
        max: 9,
        sortPacks: '0updated',
        page: 1,
        pageCount: 3,
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
        case 'PACKS/SET_SORT_PARAMETERS':
            return {...state, params: {...state.params, sortPacks: action.payload.sortPacks}}
        default:
            return state
    }
}

export const packsActions = {
    setPacks: (packs: PackType[]) => ({type: 'PACKS/SET_PACKS', payload: {packs}} as const),
    setPacksForUser: (user_id: string) => ({type: 'PACKS/SET_PACKS_FOR_USER', payload: {user_id}} as const),
    setPacksError: (error: string) => ({type: 'PACKS/SET_PACKS_ERROR', payload: {error}} as const),
    setPacksIsLoading: (isLoading: boolean) => ({type: 'PACKS/SET_PACKS_IS_LOADING', payload: {isLoading}} as const),
    setIsPacksSet: (toLogIn: boolean) => ({type: 'PACKS/SET_IS_PACKS_SET', payload: {toLogIn}} as const),
    setCardPacksTotalCount: (cardPacksTotalCount: number) =>
        ({type: 'PACKS/SET_CARD_PACKS_TOTAL_COUNT', payload: {cardPacksTotalCount}} as const),
    setCurrentPage: (currentPage: number) => ({type: 'PACKS/SET_CURRENT_PAGE', payload: {currentPage}} as const),
    setTitleForSearch: (packName: string) => ({type: 'PACKS/SET_TITLE_FOR_SEARCH', payload: {packName}} as const),
    setSortParameters: (sortPacks: string) => ({type: 'PACKS/SET_SORT_PARAMETERS', payload: {sortPacks}} as const),
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
export type SortValuesType = 'name' | 'cardsCount' | 'updated' | 'user_name'
export type SortOrderType = '0' | '1'