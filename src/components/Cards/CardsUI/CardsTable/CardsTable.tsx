import {useDispatch} from 'react-redux';
import React, {useCallback, useEffect} from 'react';
import {CardsList} from './CardsList/CardsList';
import t from '../../../../common/styles/Table.module.css'
import {cardsActions, getCards} from '../../CardsBLL/cards-reducer';
import {
    selectCards,
    selectCardsAnswer,
    selectCardsQuestion,
    selectCardsTotalCount,
    selectPageCountForCards,
    selectPageForCards,
    selectSortCards,
    selectUser_id
} from '../../../../store/selectors';
import {Paginator} from '../../../Features/Paginator/Paginator';
import {CardsTableHeader} from './CardsTableHeader/CardsTableHeader';
import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../../../store/store';

export const CardsTable = () => {
    const cards = useAppSelector(selectCards)
    const cardQuestion = useAppSelector(selectCardsQuestion)
    const cardAnswer = useAppSelector(selectCardsAnswer)
    const cardsTotalCount = useAppSelector(selectCardsTotalCount)
    const page = useAppSelector(selectPageForCards)
    const pageCount = useAppSelector(selectPageCountForCards)
    const sortCards = useAppSelector(selectSortCards)
    const userId = useAppSelector(selectUser_id)

    const dispatch = useDispatch()
    const {packUserId} = useParams<'packUserId'>()

    useEffect(() => {
        dispatch(getCards())
        return () => {
            dispatch(cardsActions.setCards([]))
        }
    }, [dispatch, cardQuestion, cardAnswer, pageCount, sortCards])

    const onPageChanged = useCallback((page: number) => {
        dispatch(cardsActions.setCurrentPage(page))
        dispatch(getCards())
    }, [dispatch])

    const onChangeSetAmountOfCards = useCallback((amountOfPacks: number) => {
        dispatch(cardsActions.setCardsPageCount(amountOfPacks))
    }, [dispatch])

    return <div className={t.tableContainer}>
        <table className={t.table}>
            <thead>
            <tr>
                <CardsTableHeader text={'Question'} param={'question'}/>
                <CardsTableHeader text={'Answer'} param={'answer'}/>
                <CardsTableHeader text={'Updated'} param={'updated'}/>
                <CardsTableHeader text={'Grade'} param={'grade'}/>
                {
                    userId === packUserId &&
                    <th className={t.actions}>
                      <span>Actions</span>
                    </th>
                }
            </tr>
            </thead>
            <tbody>
            <CardsList cards={cards}/>
            <tr>
                <td colSpan={5} className={t.pagination}>
                    <div>
                        <Paginator onChangeSetAmountOfItems={onChangeSetAmountOfCards}
                                   onPageChanged={onPageChanged}
                                   itemsTotalCount={cardsTotalCount}
                                   pageCount={pageCount} page={page}/>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
}