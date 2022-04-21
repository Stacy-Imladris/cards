import {themeActions, ThemeInitialStateType, themeReducer} from './themeReducer';

let themeStartState: ThemeInitialStateType

beforeEach(() => {
    themeStartState = {
        theme: '☀',
    }
})

test('correct theme should be set', () => {
    const endState = themeReducer(themeStartState, themeActions.changeTheme('☽'))

    expect(endState.theme).toBe('☽')
})