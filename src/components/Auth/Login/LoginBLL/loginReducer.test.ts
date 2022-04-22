import {loginActions, LoginInitialStateType, loginReducer} from './loginReducer';

let startState: LoginInitialStateType

describe('login reducer tests', () => {
    beforeEach(() => {
        startState = {
            isLoggedIn: false,
            error: "",
            isLoading: false
        }
    })

    test('correct isLoggedIn value should be set', () => {
        const endState = loginReducer(startState, loginActions.setIsLoggedIn(true))

        expect(endState.isLoggedIn).toBeTruthy()
    })


    test('correct error message should be set', () => {
        const endState = loginReducer(startState, loginActions.setLoginError("Some error"))

        expect(endState.error).toBe("Some error");
    })

    test('correct isLoading value should be set', () => {
        const endState = loginReducer(startState, loginActions.setIsLoading(true))

        expect(endState.isLoading).toBeTruthy()
    })
})