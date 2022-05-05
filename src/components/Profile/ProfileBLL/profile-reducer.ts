import {profileAPI, UserType} from '../ProfileAPI/profile-api'
import {loginActions} from '../../Auth/Login/LoginBLL/loginReducer';
import {handleServerNetworkError} from '../../../utils/handleServerNetworkError';
import {AppThunk, InferActionTypes} from '../../../store/store';
import {appActions} from '../../../app/appReducer';

const profileInitialState = {
    user: {} as UserType,
    editMode: false,
    isFetching: false,
    isInitialized: false,
}

export const profileReducer = (state: ProfileStateType = profileInitialState, action: ProfileActionTypes): ProfileStateType => {
    switch (action.type) {
        case 'profile/SET_USER_DATA':
        case 'profile/SET_EDIT_MODE':
        case 'profile/SET_IS_FETCHING':
        case 'profile/SET_IS_INITIALIZED':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export const profileActions = {
    setEditMode: (editMode: boolean) => ({type: 'profile/SET_EDIT_MODE', payload: {editMode}} as const),
    setIsFetching: (isFetching: boolean) => ({type: 'profile/SET_IS_FETCHING', payload: {isFetching}} as const),
    setUserData: (user: UserType) => ({type: 'profile/SET_USER_DATA', payload: {user}} as const),
    setIsInitialized: (isInitialized: boolean) => ({type: 'profile/SET_IS_INITIALIZED', payload: {isInitialized}} as const)
}

//thunks:
export const updateProfile = (name: string, avatar: string): AppThunk => async dispatch => {
    dispatch(profileActions.setIsFetching(true))
    try {
        const response = await profileAPI.update(name, avatar)
        dispatch(appActions.setAppStatus('Profile successfully edited'))
        dispatch(profileActions.setUserData(response.data.updatedUser))
        dispatch(profileActions.setEditMode(false))
    } catch (e) {
        handleServerNetworkError(dispatch, e as Error)
    } finally {
        dispatch(profileActions.setIsFetching(false))
    }
}

export const auth = (): AppThunk => async dispatch => {
    dispatch(profileActions.setIsFetching(true))
    try {
        const response = await profileAPI.me()
        dispatch(profileActions.setUserData(response.data))
        dispatch(loginActions.setIsLoggedIn(true))
    } catch (e) {
    } finally {
        dispatch(profileActions.setIsFetching(false))
        dispatch(profileActions.setIsInitialized(true))
    }
}

//types:
export type ProfileStateType = typeof profileInitialState
export type ProfileActionTypes = InferActionTypes<typeof profileActions>