import {cardsActions, cardsReducer, CardsStateType} from './cards-reducer'
import {CardType} from '../api/cards-api'

let state: CardsStateType

beforeEach(() => {
    state = {
        cardPacks: [
            {
                answer: 'Polar bear',
                question: 'The biggest predator',
                cardsPack_id: '',
                grade: 4.987525071790364,
                shots: 1,
                user_id: '',
                created: '2020-05-13T11:05:44.867Z',
                updated: '2020-05-13T11:05:44.867Z',
                _id: '5_5_5'
            }
        ] as CardType[],
        cardsTotalCount: 3,
        maxGrade: 4.987525071790364,
        minGrade: 2.0100984354076568,
        page: 1,
        pageCount: 4,
        packUserId: '',

        params: {
            cardAnswer: '',
            cardQuestion: '',
            cardsPack_id: '',
            min: 1,
            max: 10,
            sortCards: '0updated',
            page: 1,
            pageCount: 10
        },

        error: '',
        isLoading: false
    }
})

test('set cards data to state', () => {

    const cardsData = {
        cardPacks: [
            {
                answer: 'Network',
                question: 'Who',
                cardsPack_id: '1',
                grade: 4.987525071790364,
                shots: 1,
                user_id: '1_1',
                created: '2020-05-13T11:05:44.867Z',
                updated: '2020-05-13T11:05:44.867Z',
                _id: '1_1_1'
            },
            {
                answer: 'Bob',
                question: 'What',
                cardsPack_id: '1',
                grade: 4.987525071790364,
                shots: 1,
                user_id: '1_1',
                created: '2020-05-13T11:05:44.867Z',
                updated: '2020-05-13T11:05:44.867Z',
                _id: '2_2_2'
            }
        ],
        cardsTotalCount: 2,
        maxGrade: 5,
        minGrade: 1,
        page: 1,
        pageCount: 10,
        packUserId: '3_3_3'
    }

    const endState = cardsReducer(state, cardsActions.setCards(cardsData))

    expect(endState.cardPacks).not.toEqual(state.cardPacks)
    expect(endState.cardPacks.length).toBe(2)
    expect(endState.cardsTotalCount).toBe(2)
    expect(endState.params).toBeDefined()
})

test('set current page', () => {

    const endState = cardsReducer(state, cardsActions.setCurrentPage(3))

    expect(endState.page).toBe(3)
})

test('set card error', () => {

    const endState = cardsReducer(state, cardsActions.setCardsError('Error'))

    expect(endState.error).toBe('Error')
})

test('set isLoading status of process', () => {

    const endState = cardsReducer(state, cardsActions.setCardsIsLoading(true))

    expect(endState.isLoading).toBe(true)
})

test('set total count of cards', () => {

    const endState = cardsReducer(state, cardsActions.setCardsTotalCount(7))

    expect(endState.cardsTotalCount).toBe(7)
})

test('set current title of answer', () => {

    const endState = cardsReducer(state, cardsActions.setAnswerTitleForSearch('yo'))

    expect(endState.params.cardAnswer).toBe('yo')
})

test('set current title of question', () => {

    const endState = cardsReducer(state, cardsActions.setQuestionTitleForSearch('Go'))

    expect(endState.params.cardQuestion).toBe('Go')
})

test('add card', () => {

    const card = {
        answer: 'Russia',
        question: 'The biggest country',
        cardsPack_id: '3',
        grade: 4.987525071790364,
        shots: 1,
        user_id: '',
        created: '2020-05-13T11:05:44.867Z',
        updated: '2020-05-13T11:05:44.867Z',
        _id: '4_4_4'
    }

    const endState = cardsReducer(state, cardsActions.addCard(card))

    expect(endState.cardPacks[0].answer).toBe('Russia')
    expect(endState.cardPacks[1].answer).toBe('Polar bear')
    expect(endState.cardPacks.length).toBe(2)
})

test('delete card', () => {

    const endState = cardsReducer(state, cardsActions.deleteCard('5_5_5'))

    expect(endState.cardPacks.length).toBe(0)
    expect(endState.cardsTotalCount).toBeDefined()
    expect(endState.params).toBeDefined()
})

test('update card', () => {

    const editedCard = {
        // answer: 'Russia',
        question: 'The biggest country',
        // cardsPack_id: '3',
        // grade: 4.987525071790364,
        shots: 1,
        user_id: '',
        created: '2020-05-13T11:05:44.867Z',
        updated: '2020-05-13T11:05:44.867Z',
        // _id: '5_5_5'
    }

    const endState = cardsReducer(state, cardsActions.updateCard('5_5_5', editedCard))

    expect(endState.cardPacks.length).toBe(1)
    expect(endState.cardPacks[0].question).toBe('The biggest country')
    expect(endState.cardPacks[0].answer).toBe('Polar bear')

    expect(endState.cardsTotalCount).toBeDefined()
    expect(endState.params).toBeDefined()
})