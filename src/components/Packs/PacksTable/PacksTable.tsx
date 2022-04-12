import {PacksList} from './PacksList'
import {getPacks, SortOrderType, SortValuesType} from '../../../bll/packs-reducer'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../../../bll/store'
import {useEffect, useState} from 'react'
import s from './PacksTable.module.css'
import {setSortValuesToStore} from '../../../utils/sort-helper';
import {
    selectPackNameForSearch,
    selectPacks,
    selectPackUserId, selectSortForPacks,
} from '../../../selectors/selectors';

export const PacksTable = () => {
    const [sortField, setSortField] = useState<SortValuesType>('updated')
    const [sortValue, setSortValue] = useState<SortOrderType>('1')

    const packs = useAppSelector(selectPacks)
    const packName = useAppSelector(selectPackNameForSearch)
    const user_id = useAppSelector(selectPackUserId)
    const sortPacks = useAppSelector(selectSortForPacks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch, packName, user_id, sortPacks])

    const changeSortField = (fieldToSort: SortValuesType) => {
        setSortField(fieldToSort)
        setSortValuesToStore(dispatch, sortValue, fieldToSort)
    }

    const changeSortOrder = () => {
        const sort = sortValue === '0' ? '1' : '0'
        setSortValue(sort)
        setSortValuesToStore(dispatch, sort, sortField)
    }

    const triangle = sortValue === '0' ? '▼' : '▲'

    return <>
        <table className={s.table}>
            <thead className={s.headers}>
            <tr>
                <th className={s.name}>
                    <span onClick={() => changeSortField('name')}>
                        Name <span className={s.triangle}>{sortField === 'name' && <span onClick={changeSortOrder}>{triangle}</span>}</span>
                    </span>
                </th>
                <th className={s.cards}>
                    <span onClick={() => changeSortField('cardsCount')}>
                        Cards <span className={s.triangle}>{sortField === 'cardsCount' && <span onClick={changeSortOrder}>{triangle}</span>}</span>
                    </span>
                </th>
                <th className={s.updated}>
                    <span onClick={() => changeSortField('updated')}>
                        Updated <span className={s.triangle}>{sortField === 'updated' && <span onClick={changeSortOrder}>{triangle}</span>}</span>
                    </span>
                </th>
                <th className={s.creator}>
                    <span onClick={() => changeSortField('user_name')}>
                        Creator <span className={s.triangle}>{sortField === 'user_name' && <span onClick={changeSortOrder}>{triangle}</span>}</span>
                    </span>
                </th>
                <th className={s.actions}>
                    <span>Actions</span>
                </th>
            </tr>
            </thead>
            <tbody>
            <PacksList cardPacks={packs}/>
            </tbody>
        </table>
    </>
}