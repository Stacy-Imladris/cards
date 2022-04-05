import {InitialStateType, loginReducer, setIsLoggedInAC, setLoginErrorAC} from "./loginReducer";

let startState: InitialStateType

// type  InitialStateType = {
//     isLoggedIn: boolean,
//     error: null | string,
//     isLogin: boolean
// }

beforeEach(() => {
    startState = {
        isLoggedIn: false,
        error: "",
        isLogin: false
    }
})

test('isLoggedIn should be meaning', () => {

    const action = setIsLoggedInAC(true);

    const endState = loginReducer(startState, action)
    expect(endState.isLoggedIn).toBe(true);
})


test('error should be meaning', () => {

    const action = setLoginErrorAC("Some error");

    const endState = loginReducer(startState, action)
    expect(endState.error).toBe("Some error");
})
