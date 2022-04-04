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
    editMode: false
}

export const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileActionTypes): ProfileInitialStateType => {
    switch (action.type) {
        case 'APP/SET_EDIT_MODE_PROFILE':
            return {
                ...state,
                editMode: action.editMode
            }
        case 'APP/UPDATE_PROFILE':
            return {
                ...state,
                user: {...state.user, ...action.user}
            }
        default:
            return state
    }
}

export const profileActions = {
    setProfileAC: (user: UserType) => ({type: 'APP/UPDATE_PROFILE', user} as const),
    setEditModeProfileAC: (editMode: boolean) => ({type: 'APP/SET_EDIT_MODE_PROFILE', editMode} as const)
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