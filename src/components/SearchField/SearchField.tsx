import {KeyboardEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import s from './SearchField.module.css';
import SuperInputText
    from '../../common/super-components/c1-SuperInputText/SuperInputText';
import {debounce} from '../../utils/debounce-helper';
import SuperButton from '../../common/super-components/c2-SuperButton/SuperButton';

export const SearchField = () => {
    const [title, setTitle] = useState<string>('')
    const [timerId, setTimerId] = useState<number>(0)

    const dispatch = useDispatch()

    const onChangeText = (title: string) => {
        setTitle(title)
        clearTimeout(timerId)
        const id: number = +setTimeout(debounce, 700, dispatch, title)
        setTimerId(id)
    }

    const deleteTextForSearch = () => {
        setTitle('')
    }

    const onKeyStartSearching = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            debounce(dispatch, title)
        }
    }

    return (
        <div className={s.searchBlock}>
            <div className={s.loupe}>🔍︎</div>
            <SuperInputText value={title} onChangeText={onChangeText}
                            onKeyPress={onKeyStartSearching}
                            placeholder={'Enter title for search'}
                            className={s.searchField}/>
            <SuperButton className={s.deleteIcon} onClick={deleteTextForSearch}>
                ✘
            </SuperButton>
        </div>
    )
}
