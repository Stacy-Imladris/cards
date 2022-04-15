import {PacksTable} from './PacksTable/PacksTable'
import t from '../../common/styles/Themes.module.css'
import c from '../../common/styles/Container.module.css'
import {useAppSelector} from '../../bll/store';
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton';
import {SearchField} from '../SearchField/SearchField';
import {SuperRadio} from '../../common/super-components/c6-SuperRadio/SuperRadio';
import {useDispatch} from 'react-redux';
import {addPack, packsActions} from './packs-reducer';
import {AddNewCardType} from '../../api/packs-api';
import {DoubleRange} from '../DoubleRange/DoubleRange';
import {
    selectLoginError,
    selectPackNameForSearch,
    selectTheme,
    selectUser_id
} from '../../selectors/selectors';
import {useCallback, useEffect, useState} from 'react';
import {Notification} from "../../common/notification/Notification";

const arr = ['All', 'My']

export const Packs = () => {
    const theme = useAppSelector(selectTheme)
    const user_id = useAppSelector(selectUser_id)
    const packName = useAppSelector(selectPackNameForSearch)
    const error = useAppSelector(selectLoginError)

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(packsActions.setPacksForUser(""))
    }, [user_id])

    const [valueFromArray, setValueFromArray] = useState(arr[0])

    const onChangeOption = useCallback((value: string) => {
        setValueFromArray(value)
        if (value === 'All') {
            dispatch(packsActions.setPacksForUser(''))
        } else {
            dispatch(packsActions.setPacksForUser(user_id))
        }
    }, [dispatch, user_id])

    const onChangeDebounceRequest = useCallback((title: string) => {
        dispatch(packsActions.setCurrentPage(1))
        dispatch(packsActions.setTitleForSearch(title))
    }, [dispatch])

    const addNewPack = () => {
        dispatch(addPack({} as AddNewCardType))
    }

    return (
        <div className={c.mainContainer}>
            <div className={`${c.container} ${t[theme + '-text']}`}>
                <div className={c.settings}>
                    <div className={c.text}>Show packs cards</div>
                    <SuperRadio name={'radio'} options={arr}
                                value={valueFromArray} onChangeOption={onChangeOption}
                    />
                    <DoubleRange/>
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
                    {error && <Notification text={error}/>}
                </div>
            </div>
        </div>
    )
}