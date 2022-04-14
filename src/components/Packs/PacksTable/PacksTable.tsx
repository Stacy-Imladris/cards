import {PacksList} from './PacksList/PacksList'
import {getPacks, packsActions} from '../../../bll/packs-reducer'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../../../bll/store'
import {useCallback, useEffect} from 'react'
import s from './PacksTable.module.css'
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
} from '../../../selectors/selectors';
import {Paginator} from '../../Paginator/Paginator';
import {PacksTableHeader} from './PacksTableHeader/PacksTableHeader';

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

    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch, packName, user_id, sortPacks, min, max, pageCount])

    useEffect(() => {
        dispatch(packsActions.setPacksForUser(""))
    }, [])

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
            <tr className={s.headers}>
                <PacksTableHeader text={'Name'} param={'name'}/>
                <PacksTableHeader text={'Cards'} param={'cardsCount'}/>
                <PacksTableHeader text={'Updated'} param={'updated'}/>
                <PacksTableHeader text={'Creator'} param={'user_name'}/>
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