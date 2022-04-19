import {PacksTable} from './PacksTable/PacksTable'
import t from '../../../common/styles/Themes.module.css'
import c from '../../../common/styles/Container.module.css'
import {useAppSelector} from '../../../bll/store';
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton';
import {SearchField} from '../../Features/SearchField/SearchField';
import {SuperRadio} from '../../../common/super-components/c6-SuperRadio/SuperRadio';
import {useDispatch} from 'react-redux';
import {packsActions} from '../PacksBLL/packs-reducer';
import {DoubleRange} from '../../Features/DoubleRange/DoubleRange';
import {selectPackNameForSearch,
    //selectPackUserId,
    selectTheme,
    selectUser_id
} from '../../../selectors/selectors';
import {useCallback, useState} from 'react';
import {AddPackForm} from '../../Modals/AddPackForm/AddPackForm';

const arr = ['All', 'My']

export const Packs = () => {
    const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false)

    const theme = useAppSelector(selectTheme)
    const user_id = useAppSelector(selectUser_id)
    const packName = useAppSelector(selectPackNameForSearch)
    //const packUserId = useAppSelector(selectPackUserId)
    const type = useAppSelector(state=> state.packs.packsType)

    const dispatch = useDispatch()

    {type === "All" ? dispatch(packsActions.setPacksForUser(""))
        : dispatch(packsActions.setPacksForUser(user_id))}

    //const [valueFromArray, setValueFromArray] = useState(packUserId ? 'My' : 'All')

    const [valueFromArray, setValueFromArray] = useState(arr[0])

    const onChangeOption = useCallback((value: string) => {
        setValueFromArray(value)
        dispatch(packsActions.setPacksType(value))
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

    const addPackOff = useCallback(() => {
        setIsAddingOpen(false)
    }, [])

    const addPackOn = useCallback(() => {
        setIsAddingOpen(true)
    }, [])

    return (
        <div className={c.mainContainer}>
            <AddPackForm onClickNotOpen={addPackOff} isOpen={isAddingOpen}/>
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
                                     placeholder={'Enter search title'}/>
                        <SuperButton className={c.addItem} onClick={addPackOn}>
                            Add pack
                        </SuperButton>
                    </div>
                    <div className={c.table}><PacksTable/></div>
                </div>
            </div>
        </div>
    )
}