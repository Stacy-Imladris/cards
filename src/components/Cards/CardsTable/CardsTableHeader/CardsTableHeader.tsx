import {useState} from 'react';
import {SortOrderType} from '../../../../bll/packs-reducer';
import {useDispatch} from 'react-redux';
import s from '../../../../common/styles/TableHeader.module.css';
import {cardsActions, CardsSortFieldsType} from '../../../../bll/cards-reducer';

type CardsTableHeaderPropsType = {
    text: string
    param: CardsSortFieldsType
}
export const CardsTableHeader = ({text, param}: CardsTableHeaderPropsType) => {
    const [sortOrder, setSortOrder] = useState<SortOrderType>('0')
    const [sortField, setSortField] = useState<CardsSortFieldsType>('updated')

    const dispatch = useDispatch()

    const changeSortField = (fieldToSort: CardsSortFieldsType) => {
        setSortField(fieldToSort)
        dispatch(cardsActions.setSortParameters(sortOrder + fieldToSort))
    }

    const changeSortOrder = (order: SortOrderType) => {
        setSortOrder(order)
        dispatch(cardsActions.setSortParameters(order + sortField))
    }

    return <th>
        <div className={s.container}>
            <div onClick={() => changeSortField(param)}>{text}</div>
            <div className={s.triangle}>
                <div onClick={() => changeSortOrder('1')}>▲</div>
                <div onClick={() => changeSortOrder('0')}>▼</div>
            </div>
        </div>
    </th>
}