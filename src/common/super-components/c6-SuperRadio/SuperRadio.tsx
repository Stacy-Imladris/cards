import {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, memo} from 'react'
import styles from './SuperRadio.module.css'
import t from 'common/styles/Themes.module.css'
import {selectTheme} from 'store/selectors';
import {useAppSelector} from 'store/store';

type DefaultRadioProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type Props = DefaultRadioProps & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

export const SuperRadio = memo((
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }: Props
) => {
    const theme = useAppSelector(selectTheme)

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    const mappedOptions: any[] = options ? options.map((o, i) => (
        <label key={name + '-' + i} className={`${styles.form_control} ${t[theme + '-text']}`}>
            <input
                type={'radio'}
                name={name}
                checked={o === value}
                value={o}
                onChange={onChangeCallback}
                {...restProps}
            />
            <span className={styles.text}>{o}</span>
        </label>
    )) : []

    return (
        <div className={styles.container}>
            {mappedOptions}
        </div>
    )
})