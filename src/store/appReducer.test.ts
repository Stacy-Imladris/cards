import {appActions, AppInitialStateType, appReducer} from './appReducer';

let state: AppInitialStateType

describe('app reducer tests', () => {
    beforeEach(() => {
        state = {
            status: '',
            error: '',
            isLoading: false,
        }
    })

    test('correct status message should be added', () => {
        const endState = appReducer(state, appActions.setAppStatus('success'))

        expect(endState.status).toBe('success')
    })

    test('correct error message should be added', () => {
        const endState = appReducer(state, appActions.setAppError('error'))

        expect(endState.error).toBe('error')
    })

    test('correct isLoading value should be set', () => {
        const endState = appReducer(state, appActions.setAppIsLoading(true))

        expect(endState.isLoading).toBe(true)
    })
})