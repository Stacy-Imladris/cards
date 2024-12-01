import {useState} from 'react';
import {SortOrder} from 'components/Packs/PacksBLL/packs-reducer';
import {useDispatch} from 'react-redux';
import c from 'common/styles/TableHeader.module.css';
import {cardsActions, CardsSortFields} from 'components/Cards/CardsBLL/cards-reducer';

type Props = {
    text: string
    param: CardsSortFields
}

export const CardsTableHeader = ({text, param}: Props) => {
    const [sortOrder, setSortOrder] = useState<SortOrder>('0')
    const [sortField, setSortField] = useState<CardsSortFields>('updated')

    const dispatch = useDispatch()

    const changeSortField = (fieldToSort: CardsSortFields) => {
        setSortField(fieldToSort)
        dispatch(cardsActions.setSortParameters(sortOrder + fieldToSort))
    }

    const changeSortOrder = (order: SortOrder) => {
        setSortOrder(order)
        dispatch(cardsActions.setSortParameters(order + sortField))
    }

    return <th>
        <div className={c.container}>
            <div onClick={() => changeSortField(param)}>{text}</div>
            <div className={c.triangle}>
                <div onClick={() => changeSortOrder('0')}>▲</div>
                <div onClick={() => changeSortOrder('1')}>▼</div>
            </div>
        </div>
    </th>
}