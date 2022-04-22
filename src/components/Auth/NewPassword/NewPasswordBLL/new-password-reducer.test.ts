import {
    newPasswordActions,
    NewPasswordInitialStateType,
    newPasswordReducer
} from './new-password-reducer';

let newPasswordStartState: NewPasswordInitialStateType

describe('new password reducer tests', () => {
    beforeEach(() => {
        newPasswordStartState = {
            error: '',
            isLoading: false,
            toLogIn: false,
        }
    })

    test('correct error message should be set', () => {
        const endState = newPasswordReducer(newPasswordStartState, newPasswordActions.setNewPasswordError('Some error occurred'))

        expect(endState.error).toBe('Some error occurred')
    })

    test('correct isLoading value should be set', () => {
        const endState = newPasswordReducer(newPasswordStartState, newPasswordActions.setNewPasswordIsLoading(true))

        expect(endState.isLoading).toBe(true)
    })

    test('correct toLogin value should be set', () => {
        const endState = newPasswordReducer(newPasswordStartState, newPasswordActions.toLogIn(true))

        expect(endState.toLogIn).toBe(true)
    })
})