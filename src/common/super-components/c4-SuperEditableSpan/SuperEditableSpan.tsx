import {
    DetailedHTMLProps,
    InputHTMLAttributes,
    HTMLAttributes,
    useState,
    memo
} from 'react'
import s from './SuperEditableSpan.module.css'
import {SuperInputText} from '../c1-SuperInputText/SuperInputText';

// тип пропсов обычного инпута
type DefaultInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
// тип пропсов обычного спана
type DefaultSpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputProps)
type Props = DefaultInputProps & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string

    spanProps?: DefaultSpanProps // пропсы для спана
}

export const SuperEditableSpan = memo((
    {
        autoFocus, // игнорировать изменение этого пропса
        onBlur,
        onEnter,
        spanProps,

        ...restProps// все остальные пропсы попадут в объект restProps
    }: Props
) => {
    const [editMode, setEditMode] = useState(false)
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}

    const onEnterCallback = () => {
        setEditMode(false) // выключить editMode при нажатии Enter

        onEnter && onEnter()
    }
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false) // выключить editMode при нажатии за пределами инпута

        onBlur && onBlur(e)
    }
    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true) // включить editMode при двойном клике

        onDoubleClick && onDoubleClick(e)
    }

    const spanClassName = `${s.editableSpan} ${className}`

    return (
        <>
            {editMode
                ? (
                    <SuperInputText
                        autoFocus // пропсу с булевым значением не обязательно указывать true
                        onBlur={onBlurCallback}
                        onEnter={onEnterCallback}

                        {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                    />
                ) : (
                    <span
                        onDoubleClick={onDoubleClickCallBack}
                        className={spanClassName}

                        {...restSpanProps}
                    >
                        {/*если нет захардкодженного текста для спана, то значение инпута*/}
                        ✎ {children || restProps.value}
                    </span>
                )
            }
        </>
    )
})