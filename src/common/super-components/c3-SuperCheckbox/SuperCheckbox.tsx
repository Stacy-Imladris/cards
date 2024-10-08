import {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, memo} from 'react'
import s from './SuperCheckbox.module.css'

// тип пропсов обычного инпута
type DefaultInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type Props = DefaultInputProps & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

export const SuperCheckbox = memo((
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        className, spanClassName,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC
        ...restProps// все остальные пропсы попадут в объект restProps
    }: Props
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)

        onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }

    const finalInputClassName = `${s.checkbox} ${className ? className : ''}`

    return (
        <label>
            <div className={s.checkboxContainer}>
                <div>
                    <input
                        type={'checkbox'}
                        onChange={onChangeCallback}
                        className={finalInputClassName}
                        {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
                    />
                </div>
                <span className={s.spanClassName}>{children && children}</span>
            </div>
        </label> // благодаря label нажатие на спан передастся в инпут
    )
})