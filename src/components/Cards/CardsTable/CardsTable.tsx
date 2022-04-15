import {useDispatch} from 'react-redux';
import React, {useCallback, useEffect} from 'react';
import {CardsList} from './CardsList/CardsList';
import s from './CardsTable.module.css'
import {useAppSelector} from '../../../bll/store';
import {cardsActions, getCards} from '../cards-reducer';
import {
    selectCards,
    selectCardsAnswer,
    selectCardsQuestion,
    selectCardsTotalCount, selectPackUserId,
    selectPageCountForCards,
    selectPageForCards, selectSortCards, selectUser_id
} from '../../../selectors/selectors';
import {Paginator} from '../../Paginator/Paginator';
import {CardsTableHeader} from './CardsTableHeader/CardsTableHeader';

export const CardsTable = () => {
    const cards = useAppSelector(selectCards)
    const cardQuestion = useAppSelector(selectCardsQuestion)
    const cardAnswer = useAppSelector(selectCardsAnswer)
    const cardsTotalCount = useAppSelector(selectCardsTotalCount)
    const page = useAppSelector(selectPageForCards)
    const pageCount = useAppSelector(selectPageCountForCards)
    const sortCards = useAppSelector(selectSortCards)
    const userId = useAppSelector(selectUser_id)
    const packUserId = useAppSelector(selectPackUserId)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCards())
    }, [dispatch, cardQuestion, cardAnswer, pageCount, sortCards])

    const onPageChanged = useCallback((page: number) => {
        dispatch(cardsActions.setCurrentPage(page))
        dispatch(getCards())
    }, [dispatch])

    const onChangeSetAmountOfCards = useCallback((amountOfPacks: number) => {
        dispatch(cardsActions.setCardsPageCount(amountOfPacks))
    }, [dispatch])

    return <div className={s.cardsTableContainer}>
        <table className={s.table}>
            <thead>
            <tr className={s.headers}>
                <CardsTableHeader text={'Question'} param={'question'}/>
                <CardsTableHeader text={'Answer'} param={'answer'}/>
                <CardsTableHeader text={'Updated'} param={'updated'}/>
                <CardsTableHeader text={'Grade'} param={'grade'}/>
                {userId === packUserId && <th>
                    <span>
                        Actions
                    </span>
                </th>}
            </tr>
            </thead>
            <tbody>
            <CardsList cards={cards}/>
            </tbody>
        </table>
        <div className={s.pagination}>
            <Paginator onChangeSetAmountOfItems={onChangeSetAmountOfCards}
                       onPageChanged={onPageChanged}
                       itemsTotalCount={cardsTotalCount}
                       pageCount={pageCount} page={page}/>
        </div>
    </div>
}