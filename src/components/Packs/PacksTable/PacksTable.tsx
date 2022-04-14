import {PacksList} from './PacksList'
import {getPacks, packsActions, SortOrderType, SortValuesType} from '../../../bll/packs-reducer'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../../../bll/store'
import {useCallback, useEffect, useState} from 'react'
import s from './PacksTable.module.css'
import {setSortValuesToStore} from '../../../utils/sort-helper';
import {selectCardPacksTotalCount, selectMaxForCards, selectMinForCards, selectPackNameForSearch,
    selectPacks, selectPackUserId, selectPageCountForPacks, selectPageForPacks, selectSortForPacks,
} from '../../../selectors/selectors';
import {Paginator} from '../../Paginator/Paginator';
import {arr} from "../Packs";

export const PacksTable = () => {
    const [sortField, setSortField] = useState<SortValuesType>('updated')
    const [sortValue, setSortValue] = useState<SortOrderType>('1')

    const packs = useAppSelector(selectPacks)
    const packName = useAppSelector(selectPackNameForSearch)
    const user_id = useAppSelector(selectPackUserId)
    const sortPacks = useAppSelector(selectSortForPacks)
    const min = useAppSelector(selectMinForCards)
    const max = useAppSelector(selectMaxForCards)
    const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount)
    const page = useAppSelector(selectPageForPacks)
    const pageCount = useAppSelector(selectPageCountForPacks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch, packName, user_id, sortPacks, min, max, pageCount])

    useEffect(() => {
        debugger
        dispatch(packsActions.setPacksForUser(""))
    }, [])
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

    const onPageChanged = useCallback((page: number) => {
        dispatch(packsActions.setCurrentPage(page))
        dispatch(getPacks())
    }, [dispatch])

    const onChangeSetAmountOfPacks = useCallback((amountOfPacks: number) => {
        dispatch(packsActions.setPacksPageCount(amountOfPacks))
    }, [dispatch])

    return <div className={s.packsTableContainer}>
        <table className={s.table}>
            <thead>
            <tr>
                <th className={s.name}>
                    <span onClick={() => changeSortField('name')}>
                        Name <span className={s.triangle}>{sortField === 'name' &&
                    <span onClick={changeSortOrder}>{triangle}</span>}</span>
                    </span>
                </th>
                <th className={s.cards}>
                    <span onClick={() => changeSortField('cardsCount')}>
                        Cards <span className={s.triangle}>{sortField === 'cardsCount' &&
                    <span onClick={changeSortOrder}>{triangle}</span>}</span>
                    </span>
                </th>
                <th className={s.updated}>
                    <span onClick={() => changeSortField('updated')}>
                        Updated <span className={s.triangle}>{sortField === 'updated' &&
                    <span onClick={changeSortOrder}>{triangle}</span>}</span>
                    </span>
                </th>
                <th className={s.creator}>
                    <span onClick={() => changeSortField('user_name')}>
                        Creator <span className={s.triangle}>{sortField === 'user_name' &&
                    <span onClick={changeSortOrder}>{triangle}</span>}</span>
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
        <div className={s.pagination}>
            <Paginator onChangeSetAmountOfItems={onChangeSetAmountOfPacks}
                       onPageChanged={onPageChanged}
                       itemsTotalCount={cardPacksTotalCount}
                       pageCount={pageCount} page={page}/>
        </div>
    </div>
}