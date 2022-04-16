import {PacksTable} from './PacksTable/PacksTable'
import t from '../../common/styles/Themes.module.css'
import c from '../../common/styles/Container.module.css'
import {useAppSelector} from '../../bll/store';
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton';
import {SearchField} from '../SearchField/SearchField';
import {SuperRadio} from '../../common/super-components/c6-SuperRadio/SuperRadio';
import {useDispatch} from 'react-redux';
import {packsActions} from './packs-reducer';
import {DoubleRange} from '../DoubleRange/DoubleRange';
import {
    selectLoginError,
    selectPackNameForSearch,
    selectPackUserId,
    selectTheme,
    selectUser_id
} from '../../selectors/selectors';
import {useCallback, useState} from 'react';
import {Notification} from '../../common/notification/Notification';
import {AddPackForm} from '../AddPackForm/AddPackForm';

const arr = ['All', 'My']

export const Packs = () => {
    const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false)

    const theme = useAppSelector(selectTheme)
    const user_id = useAppSelector(selectUser_id)
    const packName = useAppSelector(selectPackNameForSearch)
    const error = useAppSelector(selectLoginError)
    const packUserId = useAppSelector(selectPackUserId)

    const dispatch = useDispatch()

    const [valueFromArray, setValueFromArray] = useState(packUserId ? 'My' : 'All')

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

    const addPackOff = () => {
        setIsAddingOpen(false)
    }

    const addPackOn = () => {
        setIsAddingOpen(true)
    }

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
                                     placeholder={'Enter pack\'s title for search'}/>
                        <SuperButton className={c.addItem} onClick={addPackOn}>
                            Add pack
                        </SuperButton>
                    </div>
                    <div className={c.table}><PacksTable/></div>
                    {error && <Notification text={error}/>}
                </div>
            </div>
        </div>
    )
}