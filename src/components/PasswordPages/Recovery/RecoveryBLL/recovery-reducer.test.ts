import {recoveryActions, RecoveryInitialStateType, recoveryReducer} from './recovery-reducer';

let recoveryStartState: RecoveryInitialStateType

beforeEach(() => {
    recoveryStartState = {
        error: '',
        isLoading: false,
        check: false,
        toLogIn: false,
    }
})

test('correct error message should be set', () => {
    const endState = recoveryReducer(recoveryStartState, recoveryActions.setRecoveryError('Some error occurred'))

    expect(endState.error).toBe('Some error occurred')
})

test('correct isLoading value should be set', () => {
    const endState = recoveryReducer(recoveryStartState, recoveryActions.setRecoveryIsLoading(true))

    expect(endState.isLoading).toBe(true)
})

test('correct check value should be set', () => {
    const endState = recoveryReducer(recoveryStartState, recoveryActions.getCheckEmail(true))

    expect(endState.check).toBe(true)
})

test('correct toLogin value should be set', () => {
    const endState = recoveryReducer(recoveryStartState, recoveryActions.toLogIn(true))

    expect(endState.toLogIn).toBe(true)
})