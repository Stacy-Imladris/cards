import {FC, memo} from 'react'
import {getLastUpdatedDate} from '../../../../../utils/date-helpers'
import {CardType} from '../../../../../api/cards-api';
import c from '../../../../../common/styles/TableLine.module.css'

type CardPropsType = {
    card: CardType
}

export const Card: FC<CardPropsType> = memo(({card}) => {
    const lastUpdate = getLastUpdatedDate(card.updated)

    return <tr>
        <td className={c.mainColumn}>{card.question}</td>
        <td>{card.answer}</td>
        <td>{lastUpdate}</td>
        <td>{card.grade}</td>
    </tr>
})