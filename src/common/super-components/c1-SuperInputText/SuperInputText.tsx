import {
    type ChangeEvent,
    type DetailedHTMLProps,
    type InputHTMLAttributes,
    type KeyboardEvent,
    memo,
    useState
} from 'react'
import styles from './SuperInputText.module.css'

type DefaultInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type Props = Omit<DefaultInputProps, 'type'> & {
    eye?: boolean
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}

export const SuperInputText = memo((
    {
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName, eye = false,
        ...restProps
    }: Props
) => {
    const [typeText, setTypeText] = useState(!eye)

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress?.(e);
        e.key === 'Enter' && onEnter?.()
    }

    const switchInputType = () => setTypeText(!typeText)

    return (
        <>
            <div className={styles.superInput}>
                <div className={styles.eye}/>
                <div>
                    <input
                        type={typeText ? 'text' : 'password'}
                        onChange={onChangeCallback}
                        onKeyPress={onKeyPressCallback}
                        className={`${styles.errorInput} ${className ? className : ''}`}
                        {...restProps}
                    />
                </div>
                <div className={styles.eye}>
                    {eye && <span onClick={switchInputType}>👁</span>}
                </div>
            </div>
            <div className={`${styles.error} ${spanClassName ? spanClassName : ''}`}>
                {error && <span>{error}</span>}
            </div>
        </>
    )
})