import {PacksTable} from './PacksTable/PacksTable';
import t from '../../common/styles/Themes.module.css';
import s from './Packs.module.css'
import c from '../../common/styles/Container.module.css'
import {useAppSelector} from '../../bll/store';
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton';
import {useCallback, useEffect, useState} from 'react';
import {AlternativeSuperDoubleRange} from '../../common/super-components/c8-SuperDoubleRange/AlternativeSuperDoubleRange';
import {Paginator} from '../Paginator/Paginator';
import {SearchField} from '../SearchField/SearchField';
import {SuperRadio} from '../../common/super-components/c6-SuperRadio/SuperRadio';
import {useDispatch} from 'react-redux';
import {addPack, getPacks, packsActions} from '../../bll/packs-reducer';
import {
    selectCardPacksTotalCount, selectPackNameForSearch, selectUser_id,
    selectPageCountForPacks, selectPageForPacks, selectTheme, selectIsLoggedIn, selectLoginError,
} from '../../selectors/selectors';
import {Navigate} from "react-router-dom";
import {PATH} from "../../app/AllRoutes";
import {loginActions} from "../Login/LoginBLL/loginReducer";

const arr = ['All', 'My']

export const Packs = () => {
    const theme = useAppSelector(selectTheme)
    const user_id = useAppSelector(selectUser_id)
    const cardPacksTotalCount = useAppSelector(selectCardPacksTotalCount)
    const page = useAppSelector(selectPageForPacks)
    const pageCount = useAppSelector(selectPageCountForPacks)
    const packName = useAppSelector(selectPackNameForSearch)
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const status = useAppSelector(state => state.packs.status)
    const dispatch = useDispatch()

    const [valueFromArray, setValueFromArray] = useState(arr[0])
    const [value1Range, setValue1] = useState(minCardsCount)
    const [value2Range, setValue2] = useState(maxCardsCount)

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
        dispatch(packsActions.setPacksMin(value[0]))
        setValue2(value[1])
        dispatch(packsActions.setPacksMax(value[1]))
    }, [])

    const onPageChanged = useCallback((page: number) => {
        dispatch(packsActions.setCurrentPage(page))
        dispatch(getPacks())
    }, [dispatch])

    const onChangeDebounceRequest = useCallback((title: string) => {
        dispatch(packsActions.setCurrentPage(1))
        dispatch(packsActions.setTitleForSearch(title))
    }, [dispatch])

    const cardsPack = {
        name: "no Name",
        deckCover: "url or base64",
        private: true
    }
    const addNewPack = () => {
        dispatch(addPack(cardsPack))
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
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
                                                 min={minCardsCount} max={maxCardsCount}/>
                    <span className={s.num}>{value2Range}</span>
                </div>
            </div>
            <div className={c.performance}>
                <div className={c.title}>Packs list</div>
                <div className={s.rowElements}>
                    <SearchField onChangeWithDebounce={onChangeDebounceRequest}
                                 value={packName}/>
                    <SuperButton onClick={addNewPack}>Add new pack</SuperButton>
                </div>
                <div className={c.table}><PacksTable/></div>
                <div>{status}</div>
                <div className={c.pagination}>
                    <Paginator onPageChanged={onPageChanged}
                               itemsTotalCount={cardPacksTotalCount}
                               pageCount={pageCount} page={page}/>
                </div>
            </div>
        </div>
    )
}