import {registrationActions, RegistrationInitialStateType, registrationReducer} from './registration-reducer';

let registrationStartState: RegistrationInitialStateType

beforeEach(() => {
    registrationStartState = {
        error: '',
        isLoading: false,
        redirect: false,
    }
})

test('correct error message should be set', () => {
    const endState = registrationReducer(registrationStartState, registrationActions.setRegistrationError('Some error occurred'))

    expect(endState.error).toBe('Some error occurred')
})

test('correct isLoading value should be set', () => {
    const endState = registrationReducer(registrationStartState, registrationActions.setRegistrationIsLoading(true))

    expect(endState.isLoading).toBe(true)
})

test('correct redirect value should be set', () => {
    const endState = registrationReducer(registrationStartState, registrationActions.getRedirect(true))

    expect(endState.redirect).toBe(true)
})