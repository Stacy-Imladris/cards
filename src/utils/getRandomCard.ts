import {CardType} from '../components/Cards/CardsAPI/cards-api'
import {getRandom} from './getRandom';

export const getRandomCard = (cards: CardType[]) => {
    const probabilities = cards.map(({grade}) => (6 - grade) ** 2)
    const randomNumber = getRandom(0, probabilities.reduce((acc, r) => acc + r))
    let res = 0, ind = 0
    probabilities.some((s, i) => {
        res += s
        if (res >= randomNumber) {
            ind = i
            return true
        }
        return false
    })
    /*probabilities.some((s, i) => {
        res += s
        if (res >= randomNumber) ind = i
        return res >= randomNumber
    })*/
    return cards[ind]
}

