import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {packsActions, PacksSortFields, SortOrder,} from 'components/Packs/PacksBLL/packs-reducer';
import c from 'common/styles/TableHeader.module.css';

type Props = {
    text: string
    param: PacksSortFields
}

export const PacksTableHeader = ({text, param}: Props) => {
    const [sortOrder, setSortOrder] = useState<SortOrder>('0')
    const [sortField, setSortField] = useState<PacksSortFields>('updated')

    const dispatch = useDispatch()

    const changeSortField = (fieldToSort: PacksSortFields) => {
        setSortField(fieldToSort)
        dispatch(packsActions.setSortParameters(sortOrder + fieldToSort))
    }

    const changeSortOrder = (order: SortOrder) => {
        setSortOrder(order)
        dispatch(packsActions.setSortParameters(order + sortField))
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