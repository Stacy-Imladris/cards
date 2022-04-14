import {
    ChangeEvent,
    DetailedHTMLProps, FC,
    InputHTMLAttributes,
    KeyboardEvent,
    memo,
    useState
} from 'react'
import s from './SuperInputText.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & { // и + ещё пропсы которых нет в стандартном инпуте
    eye?: boolean //указывает, должен ли быть глаз возле инпута, переключающий типы text/password
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}

export const SuperInputText: FC<SuperInputTextPropsType> = memo((
    {
        //type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName, eye = false,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const [typeText, setTypeText] = useState<boolean>(!eye)

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }

    const switchInputType = () => {
        setTypeText(!typeText)
    }

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${s.errorInput} ${className ? className : ''}`

    return (
        <>
            <div className={s.superInput}>
                <div className={s.eye}></div>
                <div>
                    <input
                        type={typeText ? 'text' : 'password'}
                        onChange={onChangeCallback}
                        onKeyPress={onKeyPressCallback}
                        className={finalInputClassName}

                        {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                    />
                </div>
                <div className={s.eye}>
                    {eye && <span onClick={switchInputType}>👁</span>}
                </div>
            </div>
            <div className={finalSpanClassName}>
                {error && <span>{error}</span>}
            </div>
        </>
    )
})