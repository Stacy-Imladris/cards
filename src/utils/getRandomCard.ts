import {CardType} from '../components/Cards/CardsAPI/cards-api'

/*export const chooseCard = (cards: CardType[]) => {
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
}*/

const getRandom = (min: number, max: number) => Math.random() * (max - min) + min

export const getRandomCard = (cards: CardType[]) => {
    const probabilities = cards.map(({grade}) => (6 - grade) ** 2)
    const randomNumber = getRandom(0, probabilities.reduce((acc, r) => acc + r))
    let res = 0, ind = 0
    // probabilities.some((s, i) => {
    //     res += s
    //     if (res >= randomNumber) {
    //         ind = i
    //         return true
    //     }
    //     return false
    // })
    probabilities.some((s, i) => {
        res += s
        if (res >= randomNumber) ind = i
        return res >= randomNumber
    })
    return cards[ind]
}

