import {KeyboardEvent, memo, useCallback, useState} from 'react';
import s from './SearchField.module.css';
import {SuperInputText}
    from '../../common/super-components/c1-SuperInputText/SuperInputText';
import {SuperButton} from '../../common/super-components/c2-SuperButton/SuperButton';

type SearchFieldPropsType = {
    onChangeWithDebounce: (title: string) => void
    value: string
}

export const SearchField = memo(({onChangeWithDebounce, value}: SearchFieldPropsType) => {
    const [title, setTitle] = useState<string>(value)
    const [timerId, setTimerId] = useState<number>(0)

    const onChangeText = useCallback((title: string) => {
        setTitle(title)
        clearTimeout(timerId)
        const id: number = +setTimeout(onChangeWithDebounce, 700, title)
        setTimerId(id)
    }, [onChangeWithDebounce, timerId])

    const deleteTextForSearch = useCallback(() => {
        setTitle('')
    }, [])

    const onKeyStartSearching = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onChangeWithDebounce(title)
        }
    }, [onChangeWithDebounce])

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
})
