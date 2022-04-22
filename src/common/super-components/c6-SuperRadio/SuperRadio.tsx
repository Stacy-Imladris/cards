import {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, memo} from 'react'
import s from './SuperRadio.module.css'
import t from '../../styles/Themes.module.css'
import {selectTheme} from '../../../store/selectors';
import {useAppSelector} from '../../../store/store';

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

export const SuperRadio: FC<SuperRadioPropsType> = memo((
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const theme = useAppSelector(selectTheme)

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    const mappedOptions: any[] = options ? options.map((o, i) => (
        <label key={name + '-' + i} className={`${s.form_control} ${t[theme + '-text']}`}>
            <input
                type={'radio'}
                name={name}
                checked={o === value}
                value={o}
                onChange={onChangeCallback}
                {...restProps}
            />
            <span className={s.text}>{o}</span>
        </label>
    )) : []

    return (
        <div className={s.container}>
            {mappedOptions}
        </div>
    )
})