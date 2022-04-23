import {useDispatch, useSelector} from 'react-redux'
import {useCallback, useState} from 'react'
import {getPacks, packsActions} from '../../Packs/PacksBLL/packs-reducer'
import s from './DoubleRange.module.css'
import {AppRootStateType, useAppSelector} from '../../../store/store'
import {SuperDoubleRange} from '../../../common/super-components/c8-SuperDoubleRange/SuperDoubleRange'
import {selectMaxCardsCount, selectMinCardsCount} from '../../../store/selectors'

export const DoubleRange = () => {

    const minParam = useSelector<AppRootStateType, number>(state => state.packs.params.min)
    const maxParam = useSelector<AppRootStateType, number>(state => state.packs.params.max)
    const min = useAppSelector(selectMinCardsCount)
    const max = useAppSelector(selectMaxCardsCount)

    const dispatch = useDispatch()

    const [range, setRange] = useState<[number, number]>([minParam, maxParam]);

    const [timerId, setTimerId] = useState<number>(0)

    const changeTwoValue = useCallback((value: number[]) => {
            setRange(value as [number, number])
            clearTimeout(timerId)
            const id = +setTimeout(() => {
                dispatch(packsActions.setPacksMin(range[0]))
                dispatch(packsActions.setPacksMax(range[1]))
                dispatch(getPacks())
            }, 1000)
            setTimerId(id)
        }, [dispatch, timerId, range])


    return <div>
        <div className={s.text}>Number of cards</div>
        <div className={s.doubleRange}>
            <div className={s.num}>{range[0]}</div>
            <SuperDoubleRange value={range}
                              onChangeRange={changeTwoValue}
                              min={min}
                              max={max}/>
            <div className={s.num}>{range[1]}</div>
        </div>
    </div>
}