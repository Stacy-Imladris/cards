import {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import s from './SearchField.module.css';
import SuperInputText
    from '../../common/super-components/c1-SuperInputText/SuperInputText';
import {debounce} from '../../utils/debounce-helper';

export const SearchField = () => {
    const [title, setTitle] = useState<string>('')
    const [timerId, setTimerId] = useState<number>(0)

    const dispatch = useDispatch()

    const changeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
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
            <SuperInputText/>
            <input
                placeholder="Enter title for search"
                value={title}
                className={s.search}
                onChange={changeSearchTitle}
                onKeyPress={onKeyStartSearching}
            />
            {title && (
                <button type="button" className={s.deleteIcon}
                        onClick={deleteTextForSearch}>
                    ✘
                </button>
            )}
        </div>
    )
}
