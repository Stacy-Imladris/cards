import {InferActionTypes} from './store'
import {UserType} from '../api/api'

const appInitialState = {
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
    editMode: true,
}

export const profileReducer = (state: AppInitialStateType = appInitialState, action: AppActionTypes): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET_EDIT_MODE_PROFILE':
            return {
                ...state,
                editMode: action.editMode
            }
        case 'APP/UPDATE_PROFILE':
            return {
                ...state,
                user: {...state.user, email: action.email, name: action.name}
            }
        default:
            return state
    }
}

export const profileActions = {
    updateProfileAC: (name: string, email: string) => ({type: 'APP/UPDATE_PROFILE', name, email} as const),
    setEditModeProfileAC: (editMode: boolean) => ({type: 'APP/SET_EDIT_MODE_PROFILE', editMode} as const)
}

export type AppInitialStateType = typeof appInitialState
export type AppActionTypes = InferActionTypes<typeof profileActions>