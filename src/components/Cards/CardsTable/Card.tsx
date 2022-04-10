import {FC} from 'react'
import {getLastUpdatedDate} from '../../../utils/date-helpers'

type CardPropsType = {
    card: CardType
}

export const Card: FC<CardPropsType> = ({card}) => {
    const lastUpdate = getLastUpdatedDate(card.updated)

    return <tr>
        <td>{card.question}</td>
        <td>{card.answer}</td>
        <td>{lastUpdate}</td>
        <td>{card.grade}</td>
    </tr>
}