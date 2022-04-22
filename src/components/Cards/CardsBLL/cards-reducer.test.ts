import {cardsActions, CardsInitialStateType, cardsReducer} from './cards-reducer'
import {CardType} from '../CardsAPI/cards-api'

let state: CardsInitialStateType
let date: Date

describe('cards reducer tests', () => {
    beforeEach(() => {
            state = {
                cards: [
                    {
                        answer: 'Redux',
                        cardsPack_id: '625f4c4a9be28e0004531b14',
                        comments: '',
                        created: date,
                        grade: 1.6666666666666667,
                        more_id: '6249dcb9331e2c0004462c45',
                        question: 'React',
                        rating: 0,
                        shots: 3,
                        type: 'card',
                        updated: date,
                        user_id: '6249dcb9331e2c0004462c45',
                        __v: 0,
                        _id: '625f4c779be28e0004531b16',
                    }
                ],
                params: {
                    cardAnswer: '',
                    cardQuestion: '',
                    cardsPack_id: '',
                    min: 0,
                    max: 5,
                    sortCards: '0grade',
                    page: 1,
                    pageCount: 7
                },
                cardsTotalCount: 0,
                packName: '',
            }
        }
    )

    test('set cards data to state', () => {
        const cards: CardType[] = [
            {
                answer: "TS",
                cardsPack_id: "625f4c4a9be28e0004531b14",
                comments: "",
                created: date,
                grade: 2.875,
                more_id: "6249dcb9331e2c0004462c45",
                question: "JS",
                rating: 0,
                shots: 8,
                type: "card",
                updated: date,
                user_id: "6249dcb9331e2c0004462c45",
                __v: 0,
                _id: "625f4c609be28e0004531b15",
            },
        ]

        const endState = cardsReducer(state, cardsActions.setCards(cards))

        expect(endState.cards.length).toBe(1)
        expect(endState.cards[0].answer).toBe('TS')
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
})