import {ButtonHTMLAttributes, DetailedHTMLProps, FC, memo} from 'react'
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type Props = DefaultButtonProps & {
    red?: boolean
}

export const SuperButton = memo(({red, className, ...restProps}: Props) => {
    const finalClassName = `${red ? s.red : s.default} ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
})