import {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent, memo, FC} from 'react'
import s from './SuperSelect.module.css'

type DefaultSelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type Props = DefaultSelectProps & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

export const SuperSelect: FC<Props> = memo(({options, onChange, onChangeOption, ...restProps}) => {
    const mappedOptions: any[] = options ? options.map((o, i) => (
        <option value={o} key={i} className={s.option}>{o}</option>
    )) : []

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    return (
        <div className={s.select}>
            <select onChange={onChangeCallback} {...restProps}>
                {mappedOptions}
            </select>
        </div>
    )
})