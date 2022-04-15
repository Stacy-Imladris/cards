import {cardsActions, CardsInitialStateType, CardsParamsType, cardsReducer} from './cards-reducer'
import {CardType} from '../../api/cards-api'

let state: CardsInitialStateType

beforeEach(() => {
        state = {
            cards: [
                {
                    answer: 'Bobby',
                    question: 'Who is who',
                    cardsPack_id: '5',
                    grade: 4.987525071790364,
                    shots: 1,
                    user_id: '5_5',
                    created: new Date('2020-05-13T11:05:44.867Z'),
                    updated: new Date('2020-05-13T11:05:44.867Z'),
                    _id: '5_5_5'
                }
            ] as CardType[],
            errorCards: '',
            isLoading: false,
            params: {
                cardAnswer: '',
                cardQuestion: '',
                cardsPack_id: '',
                min: 0,
                max: 5,
                sortCards: '0grade',
                page: 1,
                pageCount: 7
            } as CardsParamsType,
            cardsTotalCount: 0,
            packName: '',
            statusCard: '',
        }
    }
)

test('set cards data to state', () => {

    const cards: CardType[] = [
        {
            answer: 'Network',
            question: 'Who',
            cardsPack_id: '1',
            grade: 4.987525071790364,
            shots: 1,
            user_id: '1_1',
            created: new Date('2020-05-13T11:05:44.867Z'),
            updated: new Date('2020-05-13T11:05:44.867Z'),
            _id: '1_1_1'
        },
        {
            answer: 'Tom',
            question: 'What',
            cardsPack_id: '1',
            grade: 4.987525071790364,
            shots: 1,
            user_id: '1_1',
            created: new Date('2020-05-13T11:05:44.867Z'),
            updated: new Date('2020-05-13T11:05:44.867Z'),
            _id: '2_2_2'
        }
    ]


    const endState = cardsReducer(state, cardsActions.setCards(cards))

    expect(endState.cards.length).toBe(2)
    expect(endState.cards[0].answer).toBe('Network')
})

test('set card error', () => {

    const endState = cardsReducer(state, cardsActions.setCardsError('Error'))

    expect(endState.errorCards).toBe('Error')
})

test('set isLoading status of process', () => {

    const endState = cardsReducer(state, cardsActions.setCardsIsLoading(true))

    expect(endState.isLoading).toBe(true)
})

test('set total count of cards', () => {

    const endState = cardsReducer(state, cardsActions.setCardsTotalCount(7))

    expect(endState.cardsTotalCount).toBe(7)
})

test('set current page', () => {

    const endState = cardsReducer(state, cardsActions.setCurrentPage(3))

    expect(endState.params.page).toBe(3)
})

test('set current title of answer', () => {

    const endState = cardsReducer(state, cardsActions.setAnswerForSearch('yo'))

    expect(endState.params.cardAnswer).toBe('yo')
})

test('set current title of question', () => {

    const endState = cardsReducer(state, cardsActions.setQuestionForSearch('Go'))

    expect(endState.params.cardQuestion).toBe('Go')
})

test('set sorting parameter', () => {

    const endState = cardsReducer(state, cardsActions.setSortParameters('0answer'))

    expect(endState.params.sortCards).toBe('0answer')
})

test('set pack id', () => {

    const endState = cardsReducer(state, cardsActions.setPackId('6_6'))

    expect(endState.params.cardsPack_id).toBe('6_6')
})

test('set pack name', () => {

    const endState = cardsReducer(state, cardsActions.setPackName('PackName'))

    expect(endState.packName).toBe('PackName')
})

test('set cards page count', () => {

    const endState = cardsReducer(state, cardsActions.setCardsPageCount(3))

    expect(endState.params.pageCount).toBe(3)
})

test('set status', () => {

    const endState = cardsReducer(state, cardsActions.setStatus('successfully added'))

    expect(endState.statusCard).toBe('successfully added')
})