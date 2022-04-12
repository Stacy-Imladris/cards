import {AppThunk, InferActionTypes} from './store';
import axios from 'axios';
import {packsAPI, PackType} from '../api/packs-api';

const packsInitialState = {
    packs: [] as PackType[],
    error: '',
    isLoading: false,
    params: {
        packName: '',
        min: 3,
        max: 9,
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
            return {...state, ...action.payload}
        case 'PACKS/SET_CURRENT_PAGE':
        case 'PACKS/SET_TITLE_FOR_SEARCH':
        case 'PACKS/SET_PACKS_FOR_USER':
            return {...state, params: {...state.params, user_id: action.payload.user_id}}
        case 'PACKS/UPDATE_PACK':
            return {
                ...state,
                packs: state.packs.map(pack => pack.user_id === action.userId ? {...pack, ...action.pack} : pack)
            }
        case 'PACKS/SET_SORT_PARAMETERS':
            return {...state, params: {...state.params, ...action.payload}}
        default:
            return state
    }
}

export const packsActions = {
    setPacks: (packs: PackType[]) => ({type: 'PACKS/SET_PACKS', payload: {packs}} as const),
    setPacksForUser: (user_id: string) => ({type: 'PACKS/SET_PACKS_FOR_USER', payload: {user_id}} as const),
    setPacksError: (error: string) => ({type: 'PACKS/SET_PACKS_ERROR', payload: {error}} as const),
    setPacksIsLoading: (isLoading: boolean) => ({type: 'PACKS/SET_PACKS_IS_LOADING', payload: {isLoading}} as const),
    setCardPacksTotalCount: (cardPacksTotalCount: number) =>
        ({type: 'PACKS/SET_CARD_PACKS_TOTAL_COUNT', payload: {cardPacksTotalCount}} as const),
    setCurrentPage: (page: number) => ({type: 'PACKS/SET_CURRENT_PAGE', payload: {page}} as const),
    setTitleForSearch: (packName: string) => ({type: 'PACKS/SET_TITLE_FOR_SEARCH', payload: {packName}} as const),
    setSortParameters: (sortPacks: string) => ({type: 'PACKS/SET_SORT_PARAMETERS', payload: {sortPacks}} as const),
    updatePackName: (pack: PackType, userId: string) => ({type: 'PACKS/UPDATE_PACK', pack, userId} as const)
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

export const updatePack = (updateData: UpdatePackType): AppThunk => async (dispatch) => {
    dispatch(packsActions.setPacksIsLoading(true))
    try {
        const data = await packAPI.updatePack(updateData)
        dispatch(packsActions.setPacksError(''))
        // dispatch(packsActions.setCardPacksTotalCount(data.cardPacksTotalCount))
        dispatch(packsActions.updatePackName(data.data, updateData._id))
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