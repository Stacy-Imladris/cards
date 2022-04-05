import {AppRootStateType, InferActionTypes} from './store'
import {cardsApi, UserType} from '../api/api'
import {ThunkAction} from 'redux-thunk'
import axios from 'axios'
import {setIsLoggedInAC} from '../components/Login/loginReducer'

const initialState = {
    user: {} as UserType,
    error: '' as string | undefined,
    editMode: false,
    isFetching: false,
}

export const profileReducer = (state: ProfileStateType = initialState, action: ProfileActionTypes): ProfileStateType => {
    switch (action.type) {

        case 'profile/SET_USER_DATA':
            return {...state, user: {...state.user, ...action.user}}

        case 'profile/SET_EDIT_MODE_PROFILE':
            return {...state, editMode: action.editMode}

        case 'profile/SET_IS_FETCHING_PROFILE':
            return {...state, isFetching: action.isFetching}

        case 'profile/UPDATE_PROFILE':
            return {
                ...state,
                user: {...state.user, ...action.user},
                error: action.error
            }

        case 'profile/SET_PROFILE_ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const profileActions = {
    updateProfileAC: (user: UserType, error?: string) => ({type: 'profile/UPDATE_PROFILE', user, error} as const),
    setEditModeProfileAC: (editMode: boolean) => ({type: 'profile/SET_EDIT_MODE_PROFILE', editMode} as const),
    setIsFetchingProfileAC: (isFetching: boolean) => ({type: 'profile/SET_IS_FETCHING_PROFILE', isFetching} as const),
    setUserData: (user: UserType) => ({type: 'profile/SET_USER_DATA', user} as const),
    setProfileError: (error: string) => ({type: 'profile/SET_PROFILE_ERROR', error} as const)
}

//thunks:
export const updateProfile = (name: string, avatar: string): ThunkType => async (dispatch) => {
    dispatch(profileActions.setIsFetchingProfileAC(true))
    try {
        const response = await cardsApi.update(name, avatar)
        dispatch(profileActions.updateProfileAC(response.data.updatedUser))
        dispatch(profileActions.setEditModeProfileAC(false))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(profileActions.setProfileError(error))
        }
    } finally {
        dispatch(profileActions.setIsFetchingProfileAC(false))
    }
}

export const auth = (): ThunkType => async (dispatch) => {
    dispatch(profileActions.setIsFetchingProfileAC(true))
    try {
        const response = await cardsApi.me()
        dispatch(profileActions.setUserData(response.data))
        dispatch(setIsLoggedInAC(true))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const error = e.response ? e.response.data.error : (e.message + ', more details in the console')
            dispatch(profileActions.setProfileError(error))
        }
    } finally {
        dispatch(profileActions.setIsFetchingProfileAC(false))
    }
}

//types:
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ProfileActionTypes>

export type ProfileStateType = typeof initialState
export type ProfileActionTypes = InferActionTypes<typeof profileActions> | ReturnType<typeof setIsLoggedInAC>