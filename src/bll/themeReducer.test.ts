import {themeActions, ThemeInitialStateType, themeReducer} from './themeReducer';

let themeStartState: ThemeInitialStateType

beforeEach(() => {
    themeStartState = {
        theme: 'day'
    }
})

test('correct error message should be set', () => {
    const endState = themeReducer(themeStartState, themeActions.changeTheme('night'))

    expect(endState.theme).toBe('night')
})