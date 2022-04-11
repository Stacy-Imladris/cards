import {PacksTable} from '../PacksTable/PacksTable';
import t from '../../common/styles/Themes.module.css';
import s from './PackLiastAll.module.css'
import c from '../../common/styles/Container.module.css'
import {useAppSelector} from '../../bll/store';
import SuperButton from '../../common/super-components/c2-SuperButton/SuperButton';
import React, {useEffect, useState} from 'react';
import {AlternativeSuperDoubleRange} from '../../common/super-components/c8-SuperDoubleRange/AlternativeSuperDoubleRange';
import {Paginator} from '../Paginator/Paginator';
import {SearchField} from '../SearchField/SearchField';
import SuperRadio from '../../common/super-components/c6-SuperRadio/SuperRadio';
import {useDispatch} from 'react-redux';
import {packsActions} from '../../bll/packs-reducer';


export const PackListAll = () => {
    const theme = useAppSelector(state => state.theme.theme)
    const user_id = useAppSelector(state => state.profile.user._id)

    const arr = ['All', 'My']
    const [valueFromArray, setValueFromArray] = useState(arr[0])

    const onChangeOption = (value: string) => {
        setValueFromArray(value)
        if (value === 'All') {
            dispatch(packsActions.setPacksForUser(''))
        } else {
            dispatch(packsActions.setPacksForUser(user_id))
        }
    }
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

    const dispatch = useDispatch()
    const [value1Range, setValue1] = useState(minCardsCount)
    const [value2Range, setValue2] = useState(maxCardsCount)

    const changeTwoValue = (value: [number, number] | number[]) => {
        setValue1(value[0])
        dispatch(packsActions.setPacksMin(value[0]))
        setValue2(value[1])
        dispatch(packsActions.setPacksMax(value[1]))
    }


    return (
        <div className={`${c.container} ${t[theme + '-text']}`}>
            <div className={c.settings}>
                <div className={c.text}>Show packs cards</div>
                <SuperRadio name={'radio'} options={arr}
                            value={valueFromArray} onChangeOption={onChangeOption}
                            className={s.superRadio}
                />
                <div className={c.text}>Number of cards</div>
                <div>
                    <span className={s.num}>{value1Range}</span>
                    <AlternativeSuperDoubleRange value={[value1Range, value2Range]}
                                                 onChangeRange={changeTwoValue}
                                                 min={minCardsCount} max={maxCardsCount}
                    />
                    <span className={s.num}>{value2Range}</span>
                </div>
            </div>
            <div className={c.performance}>
                <div className={c.title}>Packs list</div>
                <div className={s.rowElements}>
                    <SearchField/>
                    <SuperButton>Add new pack</SuperButton>
                </div>
                <div className={c.table}><PacksTable/></div>
                <div className={c.pagination}><Paginator/></div>
            </div>
        </div>
    )
}