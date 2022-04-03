import {InitialStateType, loginReducer, setIsLoggedInAC, setLoginError} from "./loginReducer";


let startState: InitialStateType

beforeEach(() => {
    startState = {
        isLoggedIn: false,
        error: ""
    }
})

test('isLoggedIn should be meaning', () => {

    const action = setIsLoggedInAC(true);

    const endState = loginReducer(startState, action)
    expect(endState.isLoggedIn).toBe(true);
})


test('error should be meaning', () => {

    const action = setLoginError("Some error");

    const endState = loginReducer(startState, action)
    expect(endState.error).toBe("Some error");
})
