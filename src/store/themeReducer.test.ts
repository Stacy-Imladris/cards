import {themeActions, ThemeInitialStateType, themeReducer} from './themeReducer';

let themeStartState: ThemeInitialStateType

describe('theme reducer tests', () => {
    beforeEach(() => {
        themeStartState = {
            theme: '☀',
        }
    })

    test('correct theme should be set', () => {
        const endState = themeReducer(themeStartState, themeActions.changeTheme('☽'))

        expect(endState.theme).toBe('☽')
    })
})