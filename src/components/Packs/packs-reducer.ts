import {AppThunk, InferActionTypes} from '../../bll/store';
import axios from 'axios';
import {AddNewCardType, packsAPI, PackType, UpdatePackType} from '../../api/packs-api'
import {appActions} from '../../bll/appReducer';
import {handleServerNetworkError} from '../../utils/error-handler';

export const packsInitialState = {
    packs: [] as PackType[],
    minCardsCount: 0,
    maxCardsCount: 103,
    params: {
        packName: '',
        min: 0,
        max: 103,
        sortPacks: '0updated',
        page: 1,
        pageCount: 10,
        user_id: '',
    } as PacksParamsType,
    cardPacksTotalCount: 0,
}

export const packsReducer = (state: PacksInitialStateType = packsInitialState, action: PacksActionTypes): PacksInitialStateType => {
    switch (action.type) {
        case 'PACKS/SET_PACKS':
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
        case 'PACKS/SET_PACKS_PAGE_COUNT':
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
    setCardPacksTotalCount: (cardPacksTotalCount: number) =>
        ({type: 'PACKS/SET_CARD_PACKS_TOTAL_COUNT', payload: {cardPacksTotalCount}} as const),
    setCurrentPage: (page: number) => ({type: 'PACKS/SET_CURRENT_PAGE', payload: {page}} as const),
    setTitleForSearch: (packName: string) => ({type: 'PACKS/SET_TITLE_FOR_SEARCH', payload: {packName}} as const),
    setSortParameters: (sortPacks: string) => ({type: 'PACKS/SET_SORT_PARAMETERS', payload: {sortPacks}} as const),
    setMinCardsCount: (minCardsCount: number)=> ({type: 'PACKS/SET_PACKS_MIN_CARDS_COUNT', payload: {minCardsCount}} as const),
    setMaxCardsCount: (maxCardsCount: number)=> ({type: 'PACKS/SET_PACKS_MAX_CARDS_COUNT', payload: {maxCardsCount}} as const),
    setPacksPageCount: (pageCount: number)=> ({type: 'PACKS/SET_PACKS_PAGE_COUNT', payload: {pageCount}} as const),
}

//thunks
export const getPacks = (): AppThunk => async (dispatch, getState) => {
    const params = getState().packs.params
    dispatch(appActions.setAppIsLoading(true))
    try {
        const data = await packsAPI.getPacks(params)
        dispatch(packsActions.setCardPacksTotalCount(data.cardPacksTotalCount))
        dispatch(packsActions.setPacks(data.cardPacks))
        dispatch(packsActions.setMaxCardsCount(data.maxCardsCount))
        dispatch(packsActions.setMinCardsCount(data.minCardsCount))
    } catch (e) {
        handleServerNetworkError(dispatch, e as Error)
    } finally {
        dispatch(appActions.setAppIsLoading(false))
    }
}

export const deletePack = (packId: string): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppIsLoading(true))
    try {
        await packsAPI.deletePack(packId)
        dispatch(appActions.setAppStatus("Pack successfully deleted"))
        dispatch(getPacks())
    } catch (e) {
        handleServerNetworkError(dispatch, e as Error)
    } finally {
        dispatch(appActions.setAppIsLoading(false))
    }
}

export const addPack = (cardsPack: AddNewCardType): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppIsLoading(true))
    try {
        await packsAPI.addPack(cardsPack)
        dispatch(appActions.setAppStatus("New pack successfully added"))
        dispatch(packsActions.setCurrentPage(1))
        dispatch(getPacks())
    } catch (e) {
        handleServerNetworkError(dispatch, e as Error)
    } finally {
        dispatch(appActions.setAppIsLoading(false))
    }
}

export const updatePack = (editingPack: UpdatePackType): AppThunk => async (dispatch) => {
    dispatch(appActions.setAppIsLoading(true))
    try {
        await packsAPI.updatePack(editingPack)
        dispatch(appActions.setAppStatus("Card successfully edited"))
        dispatch(getPacks())
    } catch (e) {
        handleServerNetworkError(dispatch, e as Error)
    } finally {
        dispatch(appActions.setAppIsLoading(false))
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
export type PacksSortFieldsType = 'name' | 'cardsCount' | 'updated' | 'user_name'
export type SortOrderType = '0' | '1'