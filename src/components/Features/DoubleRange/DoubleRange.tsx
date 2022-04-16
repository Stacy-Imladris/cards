import {useAppSelector} from '../../../bll/store';
import {selectMaxCardsCount, selectMinCardsCount} from '../../../selectors/selectors';
import {useDispatch} from 'react-redux';
import {useCallback, useState} from 'react';
import {packsActions} from '../../Packs/packs-reducer';
import s from './DoubleRange.module.css';
import {AlternativeSuperDoubleRange} from '../../../common/super-components/c8-SuperDoubleRange/AlternativeSuperDoubleRange';

export const DoubleRange = () => {
    const minCardsCount = useAppSelector(selectMinCardsCount)
    const maxCardsCount = useAppSelector(selectMaxCardsCount)

    const dispatch = useDispatch()

    const [value1Range, setValue1] = useState(minCardsCount)
    const [value2Range, setValue2] = useState(maxCardsCount)
    const [timerId, setTimerId] = useState<number>(0)

    const changeTwoValue = useCallback((value: [number, number] | number[]) => {
        setValue1(value[0])
        setValue2(value[1])
        clearTimeout(timerId)
        const id = +setTimeout(() => {
            dispatch(packsActions.setPacksMin(value[0]))
            dispatch(packsActions.setPacksMax(value[1]))
        }, 500)
        setTimerId(id)
    }, [dispatch, timerId])

    return <div>
        <div className={s.text}>Number of cards</div>
        <div className={s.doubleRange}>
            <div className={s.num}>{value1Range}</div>
            <AlternativeSuperDoubleRange value={[value1Range, value2Range]}
                                         onChangeRange={changeTwoValue}
                                         min={minCardsCount}
                                         max={maxCardsCount}/>
            <div className={s.num}>{value2Range}</div>
        </div>
    </div>
}