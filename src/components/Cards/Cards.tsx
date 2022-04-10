import {CardsTable} from './CardsTable/CardsTable';
import t from '../../common/styles/Themes.module.css';
import s from './Cards.module.css'
import c from '../../common/styles/Container.module.css'
import {useAppSelector} from '../../bll/store';
import React from 'react';
import {Paginator} from '../Paginator/Paginator';
import {SearchField} from '../SearchField/SearchField';

export const Cards = () => {
    const theme = useAppSelector(state => state.theme.theme)

    return (
        <div className={`${c.performance} ${t[theme + '-text']}`}>
            <div className={c.title}>← Pack Name</div>
            <div className={s.rowElements}>
                <SearchField/>
            </div>
            <div className={c.table}><CardsTable/></div>
            <div className={c.pagination}><Paginator/></div>
        </div>
    )
}