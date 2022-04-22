import {
    packsActions,
    PacksInitialStateType,
    packsReducer,
} from './packs-reducer';
import {PackType} from '../PacksAPI/packs-api';

let startState: PacksInitialStateType
let data: Date

describe('packs reducer tests', () => {
    beforeEach(() => {
        startState = {
            packs: [],
            minCardsCount: 0,
            maxCardsCount: 103,
            packsType: 'All',
            params: {
                packName: '',
                min: 3,
                max: 9,
                sortPacks: '0updated',
                page: 1,
                pageCount: 7,
                user_id: '',
            },
            cardPacksTotalCount: 0,
        }
        data = new Date()
    })

    test('packs should be added', () => {
        const packs: PackType[] = [
            {
                cardsCount: 3,
                grade: 0,
                created: data,
                updated: data,
                more_id: '6249b622996fe2155c584ed9',
                name: 'tst',
                path: '/def',
                private: false,
                rating: 0,
                shots: 0,
                type: 'pack',
                user_id: '5eecf82a3ed8f700042f1186',
                user_name: 'Hello',
                __v: 0,
                _id: '61604c2e8832c210d81dffd4',
                deckCover: null
            }
        ]

        const action = packsActions.setPacks(packs);
        const endState = packsReducer(startState, action)

        expect(endState.packs).toBe(packs)
    })

    test('user id should be added', () => {
        const action = packsActions.setPacksForUser('5eb543f6bea3ad21480f1ee7');
        const endState = packsReducer(startState, action)

        expect(endState.params.user_id).toBe('5eb543f6bea3ad21480f1ee7')
    })

    test('correct min value should be added', () => {
        const action = packsActions.setPacksMin(0);
        const endState = packsReducer(startState, action)

        expect(endState.params.min).toBe(0)
    })

    test('correct max value should be added', () => {
        const action = packsActions.setPacksMax(10);
        const endState = packsReducer(startState, action)

        expect(endState.params.max).toBe(10)
    })

    test('packs total count should be change', () => {
        const action = packsActions.setCardPacksTotalCount(103);
        const endState = packsReducer(startState, action)

        expect(endState.cardPacksTotalCount).toBe(103)
    })

    test('setCurrentPage should be changed', () => {
        const action = packsActions.setCurrentPage(10);

        const endState = packsReducer(startState, action)
        expect(endState.params.page).toBe(10);
    })

    test('title for search must change', () => {
        const action = packsActions.setTitleForSearch('english');
        const endState = packsReducer(startState, action)

        expect(endState.params.packName).toBe('english')
    })

    test('should be sorted by value', () => {
        const action = packsActions.setSortParameters('name');
        const endState = packsReducer(startState, action)

        expect(endState.params.sortPacks).toBe('name')
    })

    test('correct quantity should be displayed minCardsCount', () => {
        const action = packsActions.setMinCardsCount(11);
        const endState = packsReducer(startState, action)

        expect(endState.minCardsCount).toBe(11)
    })

    test('correct quantity should be displayed maxCardsCount', () => {
        const action = packsActions.setMaxCardsCount(150);
        const endState = packsReducer(startState, action)

        expect(endState.maxCardsCount).toBe(150)
    })

    test('correct page count should be added', () => {
        const action = packsActions.setPacksPageCount(10);
        const endState = packsReducer(startState, action)

        expect(endState.params.pageCount).toBe(10)
    })

    test('correct page type should be added', () => {
        const action = packsActions.setPacksType('My');
        const endState = packsReducer(startState, action)

        expect(endState.packsType).toBe('My')
    })






})









