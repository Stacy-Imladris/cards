import {AppThunk, InferActionTypes} from '../../../bll/store'
import {profileAPI, UserType} from '../ProfileAPI/profile-api'
import {loginActions} from '../../Auth/Login/LoginBLL/loginReducer';
import {appActions} from '../../../bll/appReducer';
import {handleServerNetworkError} from '../../../utils/handleServerNetworkError';

const profileInitialState = {
    user: {} as UserType,
    editMode: false,
    isFetching: false,
    isInitialized: false,
}

export const profileReducer = (state: ProfileStateType = profileInitialState, action: ProfileActionTypes): ProfileStateType => {
    switch (action.type) {
        case 'profile/SET_USER_DATA':
        case 'profile/SET_EDIT_MODE_PROFILE':
        case 'profile/SET_IS_FETCHING_PROFILE':
        case 'profile/SET_IS_INITIALIZED':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const profileActions = {
    setEditModeProfile: (editMode: boolean) => ({type: 'profile/SET_EDIT_MODE_PROFILE', payload: {editMode}} as const),
    setIsFetchingProfile: (isFetching: boolean) => ({type: 'profile/SET_IS_FETCHING_PROFILE', payload: {isFetching}} as const),
    setUserData: (user: UserType) => ({type: 'profile/SET_USER_DATA', payload: {user}} as const),
    setIsInitialized: (isInitialized: boolean) => ({type: 'profile/SET_IS_INITIALIZED', payload: {isInitialized}} as const)
}

//thunks:
export const updateProfile = (name: string, avatar: string): AppThunk => async dispatch => {
    dispatch(profileActions.setIsFetchingProfile(true))
    try {
        const response = await profileAPI.update(name, avatar)
        dispatch(appActions.setAppStatus('Profile successfully edited'))
        dispatch(profileActions.setUserData(response.data.updatedUser))
        dispatch(profileActions.setEditModeProfile(false))
    } catch (e) {
        handleServerNetworkError(dispatch, e as Error)
    } finally {
        dispatch(profileActions.setIsFetchingProfile(false))
    }
}

export const auth = (): AppThunk => async dispatch => {
    dispatch(profileActions.setIsFetchingProfile(true))
    try {
        const response = await profileAPI.me()
        dispatch(profileActions.setUserData(response.data))
        dispatch(loginActions.setIsLoggedIn(true))
    } catch (e) {
        handleServerNetworkError(dispatch, e as Error)
    } finally {
        dispatch(profileActions.setIsFetchingProfile(false))
        dispatch(profileActions.setIsInitialized(true))
    }
}

//types:
export type ProfileStateType = typeof profileInitialState
export type ProfileActionTypes = InferActionTypes<typeof profileActions>