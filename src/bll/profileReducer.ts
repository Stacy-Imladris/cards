import {AppRootStateType, InferActionTypes} from './store'
import {cardsApi, UserType} from '../api/api'
import {ThunkAction} from 'redux-thunk'

const initialState = {
    user: {
        _id: '',
        email: 'mail@mail.com',
        name: 'Barbaris',
        avatar: '',
        publicCardPacksCount: 0,
        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: ''
    },
    error: '' as string | undefined,
    editMode: false
}

export const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileActionTypes): ProfileInitialStateType => {
    switch (action.type) {
        case 'profile/SET-USER-DATA':
            return {...state, user: {...state.user, ...action.user}}
        case 'profile/SET_EDIT_MODE_PROFILE':
            return {
                ...state,
                editMode: action.editMode
            }
        case 'profile/UPDATE_PROFILE':
            return {
                ...state,
                user: {...state.user, ...action.user},
                error: action.error
            }
        default:
            return state
    }
}

export const profileActions = {
    setProfileAC: (user: UserType, error?: string) => ({type: 'profile/UPDATE_PROFILE', user, error} as const),
    setEditModeProfileAC: (editMode: boolean) => ({type: 'profile/SET_EDIT_MODE_PROFILE', editMode} as const),
    setUserData: (user: UserType) => ({type: 'profile/SET-USER-DATA', user} as const),
}

//thunks:
export const updateProfile = (name: string, avatar: string): ThunkType => async (dispatch) => {
    const response = await cardsApi.update(name, avatar)
    debugger
    console.log(response)
    dispatch(profileActions.setProfileAC(response.data.updatedUser))
}

//types:
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ProfileActionTypes>

export type ProfileInitialStateType = typeof initialState
export type ProfileActionTypes = InferActionTypes<typeof profileActions>