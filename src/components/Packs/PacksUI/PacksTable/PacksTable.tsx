import {PacksList} from './PacksList/PacksList'
import {getPacks, packsActions} from '../../PacksBLL/packs-reducer'
import {useDispatch} from 'react-redux'
import {useCallback, useEffect} from 'react'
import t from '../../../../common/styles/Table.module.css'
import {
    selectCardPacksTotalCount,
    selectMaxForCards,
    selectMinForCards,
    selectPackNameForSearch,
    selectPacks,
    selectPackUserId,
    selectPageCountForPacks,
    selectPageForPacks,
    selectSortForPacks,
} from '../../../../store/selectors';
import {Paginator} from '../../../Features/Paginator/Paginator';
import {PacksTableHeader} from './PacksTableHeader/PacksTableHeader';
import {useAppSelector} from '../../../../store/store';

export const PacksTable = () => {
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

    const onPageChanged = useCallback((page: number) => {
        dispatch(packsActions.setCurrentPage(page))
        dispatch(getPacks())
    }, [dispatch])

    const onChangeSetAmountOfPacks = useCallback((amountOfPacks: number) => {
        dispatch(packsActions.setPacksPageCount(amountOfPacks))
    }, [dispatch])

    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch, packName, user_id, sortPacks, min, max, pageCount])


    return <div className={t.tableContainer}>
        <table className={t.table}>
            <thead>
            <tr>
                <PacksTableHeader text={'Name'} param={'name'}/>
                <PacksTableHeader text={'Cards'} param={'cardsCount'}/>
                <PacksTableHeader text={'Updated'} param={'updated'}/>
                <PacksTableHeader text={'Creator'} param={'user_name'}/>
                <th className={t.actions}>
                    Actions
                </th>
            </tr>
            </thead>
            <tbody>
            <PacksList cardPacks={packs}/>
            <tr>
                <td colSpan={5} className={t.pagination}>
                    <div>
                        <Paginator onChangeSetAmountOfItems={onChangeSetAmountOfPacks}
                                   onPageChanged={onPageChanged}
                                   itemsTotalCount={cardPacksTotalCount}
                                   pageCount={pageCount} page={page}/>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
}