import {CardsTable} from './CardsTable/CardsTable';
import t from '../../common/styles/Themes.module.css';
import s from './Cards.module.css'
import c from '../../common/styles/Container.module.css'
import {useAppSelector} from '../../bll/store';
import React from 'react';
import {Paginator} from '../Paginator/Paginator';
import {SearchField} from '../SearchField/SearchField';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../app/AllRoutes';
import SuperButton from '../../common/super-components/c2-SuperButton/SuperButton';
import {getPacks, packsActions} from '../../bll/packs-reducer';
import {useDispatch} from 'react-redux';
import {cardsActions, getCards} from '../../bll/cards-reducer';

export const Cards = () => {
    const theme = useAppSelector(state => state.theme.theme)
    const packName = useAppSelector(state => state.cards.packName)
    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
    const page = useAppSelector(state => state.cards.params.page)
    const pageCount = useAppSelector(state => state.cards.params.pageCount)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onPageChanged = (page: number) => {
        dispatch(cardsActions.setCurrentPage(page))
        dispatch(getCards())
    }

    return (
        <div className={`${c.container} ${t[theme + '-text']}`}>
            <div className={c.performance}>
                <div className={s.rowElements}>
                    <SuperButton className={s.backIcon} onClick={() => navigate(PATH.PACKS)}>
                        ←
                    </SuperButton>
                    <div className={c.title}>{packName}</div>
                </div>
                <div className={s.rowElements}>
                    <SearchField/>
                    <SearchField/>
                </div>
                <div className={c.table}><CardsTable/></div>
                <div className={c.pagination}>
                    <Paginator onPageChanged={onPageChanged}
                               itemsTotalCount={cardsTotalCount}
                               pageCount={pageCount} page={page}/>
                </div>
            </div>
        </div>
    )
}