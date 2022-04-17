import {CardType} from '../components/Cards/CardsAPI/cards-api'

export const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
    const rand = Math.random() * sum
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1})
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1]
}

export const chooseCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade), 0)
    const rand = Math.round(Math.random() * sum)
    const indexesCardsArr = [] as Array<number>

    for (let i = 0; i < cards.length; i++) {
        const probability = 6 - cards[i].grade
        let j = 0
        while (probability > j) {
            indexesCardsArr.push(i)
            j++
        }
    }
    const mostProbableIndex: number = indexesCardsArr[rand]

    return cards[mostProbableIndex]
}

