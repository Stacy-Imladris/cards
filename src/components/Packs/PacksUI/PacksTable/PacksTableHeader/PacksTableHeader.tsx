import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {packsActions, PacksSortFieldsType, SortOrderType,} from 'components/Packs/PacksBLL/packs-reducer';
import c from 'common/styles/TableHeader.module.css';

type Props = {
    text: string
    param: PacksSortFieldsType
}

export const PacksTableHeader = ({text, param}: Props) => {
    const [sortOrder, setSortOrder] = useState<SortOrderType>('0')
    const [sortField, setSortField] = useState<PacksSortFieldsType>('updated')

    const dispatch = useDispatch()

    const changeSortField = (fieldToSort: PacksSortFieldsType) => {
        setSortField(fieldToSort)
        dispatch(packsActions.setSortParameters(sortOrder + fieldToSort))
    }

    const changeSortOrder = (order: SortOrderType) => {
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