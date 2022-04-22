import {useDispatch, useSelector} from 'react-redux'
import {useCallback, useState} from 'react'
import {packsActions} from '../../Packs/PacksBLL/packs-reducer'
import s from './DoubleRange.module.css'
import {AppRootStateType} from '../../../store/store'
import {SuperDoubleRange} from '../../../common/super-components/c8-SuperDoubleRange/SuperDoubleRange'

export const DoubleRange = () => {

    const minCardsCount = useSelector<AppRootStateType, number>(state => state.packs.params.min)
    const maxCardsCount = useSelector<AppRootStateType, number>(state => state.packs.params.max)

    const dispatch = useDispatch()

    const [range, setRange] = useState<number[]>([minCardsCount, maxCardsCount]);

    const [timerId, setTimerId] = useState<number>(0)

    const changeTwoValue = useCallback((value: number[]) => {
            setRange(value as number[])
            clearTimeout(timerId)
            const id = +setTimeout(() => {
                dispatch(packsActions.setPacksMin(range[0]))
                dispatch(packsActions.setPacksMax(range[1]))
            }, 500)
            setTimerId(id)
        }, [dispatch, timerId, range])


    return <div>
        <div className={s.text}>Number of cards</div>
        <div className={s.doubleRange}>
            <div className={s.num}>{range[0]}</div>
            <SuperDoubleRange value={range}
                              onChangeRange={changeTwoValue}
                              min={minCardsCount}
                              max={maxCardsCount}/>
            <div className={s.num}>{range[1]}</div>
        </div>
    </div>
}