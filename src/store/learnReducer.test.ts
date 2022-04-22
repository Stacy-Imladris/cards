import {learnActions, LearnInitialStateType, learnReducer} from './learnReducer';
import {CardType} from '../components/Cards/CardsAPI/cards-api';

let state: LearnInitialStateType
let date: Date

describe('app reducer tests', () => {
    beforeEach(() => {
        state = {
            cards: [
                {
                    answer: "Css",
                    cardsPack_id: "625f4c4a9be28e0004531b14",
                    comments: "",
                    created: date,
                    grade: 2.5,
                    more_id: "6249dcb9331e2c0004462c45",
                    question: "Html",
                    rating: 0,
                    shots: 4,
                    type: "card",
                    updated: date,
                    user_id: "6249dcb9331e2c0004462c45",
                    __v: 0,
                    _id: "625f4c859be28e0004531b17",
                },
                {
                    answer: 'TS',
                    cardsPack_id: '625f4c4a9be28e0004531b14',
                    comments: '',
                    created: date,
                    grade: 1.6666666666666667,
                    more_id: '6249dcb9331e2c0004462c45',
                    question: 'JS',
                    rating: 0,
                    shots: 3,
                    type: 'card',
                    updated: date,
                    user_id: '6249dcb9331e2c0004462c45',
                    __v: 0,
                    _id: '625f4c779be28e0004531b16',
                },
            ],
            randomCard: {} as CardType,
        }
    })

    test('correct cards should be set', () => {
        const newCards = [
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
            },
        ]

        const endState = learnReducer(state, learnActions.setCards(newCards))

        expect(endState.cards.length).toBe(1)
        expect(endState.cards[0].answer).toBe('Redux')
    })

    test('correct card should be set', () => {
        const randomCard = {
            answer: "Css",
            cardsPack_id: "625f4c4a9be28e0004531b14",
            comments: "",
            created: date,
            grade: 2.5,
            more_id: "6249dcb9331e2c0004462c45",
            question: "Html",
            rating: 0,
            shots: 4,
            type: "card",
            updated: date,
            user_id: "6249dcb9331e2c0004462c45",
            __v: 0,
            _id: "625f4c859be28e0004531b17",
        }

        const endState = learnReducer(state, learnActions.setRandomCard(randomCard))

        expect(endState.randomCard.question).toBe('Html')
    })

    test('correct card should change its grade', () => {
        const endState = learnReducer(state, learnActions.setGrade('625f4c779be28e0004531b16', 5))

        expect(endState.cards[0].grade).toBe(2.5)
        expect(endState.cards[1].grade).toBe(5)
    })
})
