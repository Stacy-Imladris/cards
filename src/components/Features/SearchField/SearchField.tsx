import {memo, useCallback, useState} from 'react';
import s from './SearchField.module.css';
import {SuperInputText}
    from '../../../common/super-components/c1-SuperInputText/SuperInputText';
import {SuperButton} from '../../../common/super-components/c2-SuperButton/SuperButton';

type SearchFieldPropsType = {
    onChangeWithDebounce: (title: string) => void
    value: string
    wide?: boolean
    placeholder?: string
}

export const SearchField = memo(({onChangeWithDebounce, value, wide, placeholder}: SearchFieldPropsType) => {
    const [title, setTitle] = useState<string>(value)
    const [timerId, setTimerId] = useState<number>(0)

    const onChangeText = useCallback((title: string) => {
        setTitle(title)
        clearTimeout(timerId)
        const id: number = +setTimeout(onChangeWithDebounce, 500, title)
        setTimerId(id)
    }, [onChangeWithDebounce, timerId])

    const searchFieldClassName = `${s.searchField} ${wide ? s.wideSearchField : s.narrowSearchField}`

    return (
        <div className={s.searchBlock}>
            <div>🔍︎</div>
            <SuperInputText value={title} onChangeText={onChangeText}
                            placeholder={placeholder}
                            className={searchFieldClassName}/>
            <SuperButton className={s.deleteIcon} onClick={() => onChangeText('')}>
                ✘
            </SuperButton>
        </div>
    )
})
