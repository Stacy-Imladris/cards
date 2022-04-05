import {profileActions, profileReducer, ProfileStateType} from './profile-reducer'

let state: ProfileStateType

beforeEach(() => {
    state = {
        user: {
            _id: '1',
            email: 'pupik@mail.com',
            name: 'Barbaris',
            avatar: '',
            publicCardPacksCount: 0,
            created: new Date(),
            updated: new Date(),
            isAdmin: false,
            verified: false,
            rememberMe: false,
        },
        error: '',
        editMode: false,
        isFetching: false,
        isInitialized: false,
    }
})

test('set authorizing user data', () => {

    const userData = {
        _id: '2',
        email: 'user@mail.com',
        name: 'User',
        avatar: '',
        publicCardPacksCount: 1,
        created: new Date(),
        updated: new Date(),
        isAdmin: false,
        verified: false,
        rememberMe: false,
    }

    const endState = profileReducer(state, profileActions.setUserData(userData))

    expect(endState.user._id).toBe('2')
    expect(endState.user.name).toBe('User')
})

test('set editMode for changing profile', () => {

    const endState = profileReducer(state, profileActions.setEditModeProfileAC(true))
    const endState2 = profileReducer(endState, profileActions.setEditModeProfileAC(false))

    expect(endState.editMode).toBe(true)
    expect(endState2.editMode).toBe(false)
})

test('set isFetching to show Preloader or not', () => {

    const endState = profileReducer(state, profileActions.setIsFetchingProfileAC(true))
    const endState2 = profileReducer(endState, profileActions.setIsFetchingProfileAC(false))

    expect(endState.isFetching).toBe(true)
    expect(endState2.isFetching).toBe(false)
})

test('set profile error', () => {

    const endState = profileReducer(state, profileActions.setProfileError('error'))

    expect(endState.error).toBe('error')
})

test('set isInitialized value', () => {

    const endState = profileReducer(state, profileActions.setIsInitialized(true))

    expect(endState.isInitialized).toBe(true)
})