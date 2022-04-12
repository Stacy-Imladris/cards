import {packsActions, PacksInitialStateType, packsReducer, ParamsType} from "./packs-reducer";
import {PackType} from "../api/packs-api";
import {
    registrationActions,
    registrationReducer
} from "../components/Registration/RegistrationBLL/registration-reducer";

let startState: PacksInitialStateType

beforeEach(() => {
    startState = {
        packs: [] as PackType[],
        error: '',
        isLoading: false,
        isPacksSet: false,
        minCardsCount: 0,
        maxCardsCount: 103,
        params: {
            packName: '',
            min: 3,
            max: 9,
            sortPacks: '0updated',
            page: 1,
            pageCount: 7,
            user_id: '',
        } as ParamsType,
        cardPacksTotalCount: 0,
    }
})

test('setCurrentPage should be changed', () => {

    const action = packsActions.setCurrentPage(10);

    const endState = packsReducer(startState, action)
    expect(endState.params.page).toBe(10);
})

test('correct error message should be set', () => {

    const action = packsActions.setPacksError('Some error occurred');
    const endState = packsReducer(startState, action)

    expect(endState.error).toBe('Some error occurred')
})

test('correct quantity should be displayed maxCardsCount', () => {

    const action = packsActions.setMaxCardsCount(150);
    const endState = packsReducer(startState, action)

    expect(endState.maxCardsCount).toBe(150)
})

test('correct quantity should be displayed minCardsCount', () => {

    const action = packsActions.setMinCardsCount(11);
    const endState = packsReducer(startState, action)

    expect(endState.minCardsCount).toBe(11)
})

test('correct quantity should be displayed min cards', () => {

    const action = packsActions.setPacksMin(8);
    const endState = packsReducer(startState, action)

    expect(endState.params.min).toBe(8)
})








