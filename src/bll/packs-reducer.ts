import {AppThunk, InferActionTypes} from './store';
import axios from 'axios';
import {packAPI} from '../api/packs-api';

const packsInitialState = {
    packs: [] as PackType[],
    user_id: '',
    error: '',
    isLoading: false,
    isPacksSet: false,
    params: {
        packName: 'english',
        min: 3,
        max: 9,
        sortPacks: '0updated',
        page: 1,
        pageCount: 7,
        user_id: '',
    } as ParamsType,
}

export const packsReducer = (state: PacksInitialStateType = packsInitialState, action: PacksActionTypes): PacksInitialStateType => {
    switch (action.type) {
        case 'PACKS/SET_PACKS':
        case 'PACKS/SET_PACKS_FOR_USER':
        case 'PACKS/SET_PACKS_ERROR':
        case 'PACKS/SET_PACKS_IS_LOADING':
        case 'PACKS/SET_IS_PACKS_SET':
            return {...state, ...action.payload}
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
}

//thunk
export const getPacks = (): AppThunk => async (dispatch, getState) => {
    const params = getState().packs.params
    dispatch(packsActions.setPacksIsLoading(true))
    try {
        const data = await packAPI.getPacks(params)
        dispatch(packsActions.setPacksError(''))
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
export type PackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: Date
    updated: Date
    more_id: string
    __v: number
    deckCover: null | string
}
export type ParamsType = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
}