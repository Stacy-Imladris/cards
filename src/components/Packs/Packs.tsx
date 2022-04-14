import {PacksTable} from './PacksTable/PacksTable';
import t from '../../common/styles/Themes.module.css';
import c from '../../common/styles/Container.module.css'
import {useAppSelector} from '../../bll/store';
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton';
import {useCallback, useState} from 'react';
import {AlternativeSuperDoubleRange} from '../../common/super-components/c8-SuperDoubleRange/AlternativeSuperDoubleRange';
import {SearchField} from '../SearchField/SearchField';
import {SuperRadio} from '../../common/super-components/c6-SuperRadio/SuperRadio';
import {useDispatch} from 'react-redux';
import {addPack, packsActions} from '../../bll/packs-reducer';
import {
    selectIsLoggedIn, selectLoginError,
    selectMaxCardsCount,
    selectMinCardsCount,
    selectPackNameForSearch,
    selectTheme,
    selectUser_id,
} from '../../selectors/selectors';
import {Navigate} from "react-router-dom";
import {PATH} from "../../app/AllRoutes";
import {AddNewCardType} from '../../api/packs-api';

const arr = ['All', 'My']

export const Packs = () => {
    const theme = useAppSelector(selectTheme)
    const user_id = useAppSelector(selectUser_id)
    const packName = useAppSelector(selectPackNameForSearch)
    const minCardsCount = useAppSelector(selectMinCardsCount)
    const maxCardsCount = useAppSelector(selectMaxCardsCount)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const status = useAppSelector(state => state.packs.status)
    const error = useAppSelector(selectLoginError)
    const errorPacks = useAppSelector(state => state.packs.errorPacks)

    const dispatch = useDispatch()

    const [valueFromArray, setValueFromArray] = useState(arr[0])
    const [value1Range, setValue1] = useState(minCardsCount)
    const [value2Range, setValue2] = useState(maxCardsCount)
    const [timerId, setTimerId] = useState<number>(0)

    const onChangeOption = useCallback((value: string) => {
        setValueFromArray(value)
        if (value === 'All') {
            dispatch(packsActions.setPacksForUser(''))
        } else {
            dispatch(packsActions.setPacksForUser(user_id))
        }
    }, [dispatch, user_id])

    const changeTwoValue = useCallback((value: [number, number] | number[]) => {
        setValue1(value[0])
        setValue2(value[1])
        clearTimeout(timerId)
        const id = +setTimeout(() => {
            dispatch(packsActions.setPacksMin(value[0]))
            dispatch(packsActions.setPacksMax(value[1]))
        }, 500)
        setTimerId(id)
    }, [timerId])

    const onChangeDebounceRequest = useCallback((title: string) => {
        dispatch(packsActions.setCurrentPage(1))
        dispatch(packsActions.setTitleForSearch(title))

    }, [dispatch])

    const addNewPack = () => {
        dispatch(addPack({} as AddNewCardType))
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }


    return (
        <div className={c.mainContainer}>
            <div className={`${c.container} ${t[theme + '-text']}`}>
                <div className={c.settings}>
                    <div className={c.text}>Show packs cards</div>
                    <SuperRadio name={'radio'} options={arr}
                                value={valueFromArray} onChangeOption={onChangeOption}
                    />
                    <div className={c.text}>Number of cards</div>
                    <div className={c.doubleRange}>
                        <div className={c.num}>{value1Range}</div>
                        <AlternativeSuperDoubleRange value={[value1Range, value2Range]}
                                                     onChangeRange={changeTwoValue}
                                                     min={minCardsCount}
                                                     max={maxCardsCount}/>
                        <div className={c.num}>{value2Range}</div>
                    </div>
                </div>
                <div className={c.performance}>
                    <div className={c.title}>Packs list</div>
                    <div className={c.rowElements}>
                        <SearchField onChangeWithDebounce={onChangeDebounceRequest}
                                     value={packName} wide
                                     placeholder={'Enter pack\'s title for search'}/>
                        <SuperButton className={c.addItem} onClick={addNewPack}>Add pack</SuperButton>
                    </div>
                    <div className={c.table}><PacksTable/></div>
                    <div>{status}</div>
                    <div>{errorPacks}</div>
                    <div>{error}</div>
                </div>
            </div>
        </div>
    )
}