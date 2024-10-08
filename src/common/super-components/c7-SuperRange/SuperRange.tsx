import {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, memo} from 'react'
import s from './SuperRange.module.css'

// тип пропсов обычного инпута
type DefaultInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputProps)
type Props = Omit<DefaultInputProps, 'type'> & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeRange?: (value: number) => void
};

export const SuperRange = memo((
    {
        //type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeRange,
        className,

        ...restProps// все остальные пропсы попадут в объект restProps
    }: Props
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e) // сохраняем старую функциональность

        onChangeRange && onChangeRange(+e.currentTarget.value)
    }

    const finalRangeClassName = `${s.range} ${className ? className : ''}`

    return (
        <>
            <input
                type={'range'}
                onChange={onChangeCallback}
                className={finalRangeClassName}

                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
        </>
    )
})