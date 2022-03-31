import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './SuperRadio.module.css'
import t from '../../styles/Themes.module.css'
import {useAppSelector} from '../../../bll/store';

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const theme = useAppSelector(state => state.theme.theme)

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
            {o}
        </label>
    )) : []

    return (
        <div className={s.container}>
            {mappedOptions}
        </div>
    )
}

export default SuperRadio
