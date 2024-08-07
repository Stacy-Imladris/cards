import {ButtonHTMLAttributes, DetailedHTMLProps, FC, memo} from 'react'
import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type Props = DefaultButtonPropsType & {
    red?: boolean
}

export const SuperButton: FC<Props> = memo(({red, className, ...restProps}) => {
    const finalClassName = `${red ? s.red : s.default} ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
})